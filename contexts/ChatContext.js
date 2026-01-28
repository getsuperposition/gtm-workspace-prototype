'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { mockChatData } from '@/data/mockChatData';
import {
  generateChatTitle,
  generateChatId,
  generateMessageId,
  generateMockResponse
} from '@/utils/chatHelpers';
import { simulateLoading, LOADING_SPEEDS } from '@/utils/loadingDurations';
import { getLoadingConfig } from '@/components/LoadingStates/motionConfig';

// Get the fade-out duration from the loading config
const FADE_OUT_DURATION = getLoadingConfig('square').fadeOutDuration;

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(new Set());
  const [completingMessages, setCompletingMessages] = useState(new Set());

  // Initialize with mock chats on mount
  useEffect(() => {
    setChats(mockChatData);
    setIsLoading(false);
  }, []);

  /**
   * Create a new chat instance
   * @param {string} prompt - Initial user prompt
   * @param {object} source - Source information { type: 'search' | 'action-button', actionLabel: string | null }
   * @param {array} companies - Optional array of company objects
   * @returns {string} - New chat ID
   */
  const createChat = (prompt, source, companies = null) => {
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      console.error('Invalid prompt provided to createChat');
      return null;
    }

    const now = new Date();
    const chatId = generateChatId();
    const userMessageId = generateMessageId();
    const assistantMessageId = generateMessageId();

    // Generate title from prompt
    const title = generateChatTitle(prompt);

    // Create user message
    const userMessage = {
      id: userMessageId,
      role: 'user',
      content: prompt.trim(),
      timestamp: now
    };

    // Generate mock assistant response
    const assistantMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: generateMockResponse(prompt),
      timestamp: new Date(now.getTime() + 1000) // 1 second later
    };

    // Create new chat object
    const newChat = {
      id: chatId,
      title,
      createdAt: now,
      updatedAt: now,
      status: 'active',
      source: {
        type: source?.type || 'search',
        actionLabel: source?.actionLabel || null
      },
      companies: companies || null,
      companyCount: companies && companies.length > 1 ? companies.length : null,
      messages: [userMessage, assistantMessage],
      isUserCreated: true
    };

    // Add to state (prepend to show newest first)
    setChats(prevChats => [newChat, ...prevChats]);

    return chatId;
  };

  /**
   * Add a message to an existing chat
   * @param {string} chatId - Chat ID
   * @param {string} content - Message content
   * @param {string} role - Message role ('user' | 'assistant')
   * @returns {boolean} - Success status
   */
  const addMessage = async (chatId, content, role = 'user') => {
    if (!chatId || !content || typeof content !== 'string' || content.trim().length === 0) {
      console.error('Invalid parameters provided to addMessage');
      return false;
    }

    const now = new Date();
    const messageId = generateMessageId();

    const newMessage = {
      id: messageId,
      role,
      content: content.trim(),
      timestamp: now
    };

    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            updatedAt: now
          };
        }
        return chat;
      });
    });

    // If user message, show loading and generate mock assistant response
    if (role === 'user') {
      // Start loading
      setLoadingMessages(prev => new Set(prev).add(chatId));
      
      // Simulate loading with QUICK speed (300-1500ms)
      await simulateLoading(LOADING_SPEEDS.SLOW);
      
      // Move to completing state (triggers fade-out)
      setLoadingMessages(prev => {
        const next = new Set(prev);
        next.delete(chatId);
        return next;
      });
      setCompletingMessages(prev => new Set(prev).add(chatId));
      
      // Wait for fade-out animation to complete (500ms)
      await new Promise(resolve => setTimeout(resolve, FADE_OUT_DURATION));
      
      // Now add the assistant response after fade-out completes
      const assistantMessageId = generateMessageId();
      const assistantMessage = {
        id: assistantMessageId,
        role: 'assistant',
        content: generateMockResponse(content),
        timestamp: new Date()
      };

      setChats(prevChats => {
        return prevChats.map(chat => {
          if (chat.id === chatId) {
            return {
              ...chat,
              messages: [...chat.messages, assistantMessage],
              updatedAt: new Date()
            };
          }
          return chat;
        });
      });
      
      // Clear completing state
      setCompletingMessages(prev => {
        const next = new Set(prev);
        next.delete(chatId);
        return next;
      });
    }

    return true;
  };

  /**
   * Get chat by ID
   * @param {string} id - Chat ID
   * @returns {object|null} - Chat object or null if not found
   */
  const getChatById = (id) => {
    return chats.find(chat => chat.id === id) || null;
  };

  /**
   * Delete all user-created chats
   * @returns {number} - Number of chats deleted
   */
  const deleteUserChats = () => {
    const userChatsCount = chats.filter(chat => chat.isUserCreated).length;
    setChats(prevChats => prevChats.filter(chat => !chat.isUserCreated));
    return userChatsCount;
  };

  /**
   * Get all chats sorted by updatedAt (newest first)
   * @returns {array} - Array of chat objects
   */
  const getAllChats = () => {
    return [...chats].sort((a, b) => b.updatedAt - a.updatedAt);
  };

  /**
   * Update chat title
   * @param {string} chatId - Chat ID
   * @param {string} newTitle - New title
   * @returns {boolean} - Success status
   */
  const updateChatTitle = (chatId, newTitle) => {
    if (!chatId || !newTitle || typeof newTitle !== 'string') {
      return false;
    }

    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            title: newTitle.trim(),
            updatedAt: new Date()
          };
        }
        return chat;
      });
    });

    return true;
  };

  const value = {
    chats: getAllChats(),
    isLoading,
    loadingMessages,
    completingMessages,
    isMessageLoading: (chatId) => loadingMessages.has(chatId) || completingMessages.has(chatId),
    createChat,
    addMessage,
    getChatById,
    deleteUserChats,
    getAllChats,
    updateChatTitle
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  
  return context;
}
