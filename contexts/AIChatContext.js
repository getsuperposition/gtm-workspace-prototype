'use client';

import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { getArtifactForMessage, getReasoningStepsForMessage } from '@/data/mockArtifacts';

/**
 * @typedef {'user' | 'assistant' | 'reasoning'} MessageRole
 * @typedef {'idle' | 'streaming' | 'error'} ChatStatus
 * @typedef {'meetingBrief' | 'emailDraft' | 'accountBrief' | 'table' | 'document'} ArtifactType
 *
 * @typedef {Object} ReasoningStep
 * @property {string} id
 * @property {string} title
 * @property {string} [detail]
 * @property {'pending' | 'active' | 'complete'} status
 *
 * @typedef {Object} Artifact
 * @property {string} id
 * @property {ArtifactType} type
 * @property {string} title
 * @property {number} version
 * @property {Object} content - Type-specific content
 * @property {number} createdAt
 *
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {MessageRole} role
 * @property {string} content
 * @property {number} timestamp
 * @property {Artifact[]} [artifacts]
 * @property {ReasoningStep[]} [reasoningSteps]
 *
 * @typedef {Object} AIChatThread
 * @property {string} id
 * @property {string} title
 * @property {ChatMessage[]} messages
 * @property {string} pageContext
 * @property {number} createdAt
 * @property {number} updatedAt
 */

const AIChatContext = createContext();

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function AIChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [activeArtifact, setActiveArtifact] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    setActiveArtifact(null);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => {
      if (prev) setActiveArtifact(null);
      return !prev;
    });
  }, []);

  const toggleHistory = useCallback(() => {
    setShowHistory(prev => !prev);
  }, []);

  /**
   * Open an artifact in the canvas
   */
  const openArtifact = useCallback((artifact) => {
    setActiveArtifact(artifact);
  }, []);

  /**
   * Close the artifact canvas
   */
  const closeArtifact = useCallback(() => {
    setActiveArtifact(null);
  }, []);

  /**
   * Update an artifact's content (for inline editing)
   */
  const updateArtifact = useCallback((artifactId, contentUpdates) => {
    // Update in threads
    setThreads(prev => prev.map(thread => ({
      ...thread,
      messages: thread.messages.map(msg => {
        if (!msg.artifacts) return msg;
        return {
          ...msg,
          artifacts: msg.artifacts.map(artifact => {
            if (artifact.id === artifactId) {
              const updatedArtifact = {
                ...artifact,
                content: { ...artifact.content, ...contentUpdates },
                version: (artifact.version || 1) + 1,
                updatedAt: Date.now(),
              };
              // Also update activeArtifact if it's the same one
              if (activeArtifact?.id === artifactId) {
                setActiveArtifact(updatedArtifact);
              }
              return updatedArtifact;
            }
            return artifact;
          }),
        };
      }),
    })));
  }, [activeArtifact]);

  const createThread = useCallback((pageContext = 'Chat') => {
    const threadId = generateId();
    const now = Date.now();

    const newThread = {
      id: threadId,
      title: 'New Chat',
      messages: [],
      pageContext,
      createdAt: now,
      updatedAt: now,
    };

    setThreads(prev => [newThread, ...prev]);
    setActiveThreadId(threadId);
    setShowHistory(false);

    return threadId;
  }, []);

  const selectThread = useCallback((threadId) => {
    setActiveThreadId(threadId);
    setShowHistory(false);
    setActiveArtifact(null);
  }, []);

  const getActiveThread = useCallback(() => {
    if (!activeThreadId) return null;
    return threads.find(t => t.id === activeThreadId) || null;
  }, [activeThreadId, threads]);

  const addMessage = useCallback((threadId, role, content, extras = {}) => {
    const messageId = generateId();
    const now = Date.now();

    const newMessage = {
      id: messageId,
      role,
      content,
      timestamp: now,
      ...extras,
    };

    setThreads(prev => prev.map(thread => {
      if (thread.id === threadId) {
        const title = thread.title === 'New Chat' && role === 'user'
          ? content.slice(0, 50) + (content.length > 50 ? '…' : '')
          : thread.title;

        return {
          ...thread,
          title,
          messages: [...thread.messages, newMessage],
          updatedAt: now,
        };
      }
      return thread;
    }));

    return messageId;
  }, []);

  const updateMessage = useCallback((threadId, messageId, updates) => {
    setThreads(prev => prev.map(thread => {
      if (thread.id === threadId) {
        return {
          ...thread,
          messages: thread.messages.map(msg =>
            msg.id === messageId ? { ...msg, ...updates } : msg
          ),
          updatedAt: Date.now(),
        };
      }
      return thread;
    }));
  }, []);

  /**
   * Add an artifact to a message
   */
  const addArtifactToMessage = useCallback((threadId, messageId, artifact) => {
    setThreads(prev => prev.map(thread => {
      if (thread.id === threadId) {
        return {
          ...thread,
          messages: thread.messages.map(msg => {
            if (msg.id === messageId) {
              return {
                ...msg,
                artifacts: [...(msg.artifacts || []), artifact],
              };
            }
            return msg;
          }),
          updatedAt: Date.now(),
        };
      }
      return thread;
    }));

    // Auto-open the new artifact
    setActiveArtifact(artifact);
  }, []);

  /**
   * Send a message and get a response with potential artifacts
   */
  const sendMessage = useCallback(async (message, pageContext = {}) => {
    if (!message.trim()) return;

    let threadId = activeThreadId;
    if (!threadId) {
      threadId = createThread(pageContext.breadcrumb || 'Chat');
    }

    // Get mock reasoning steps and artifact for this message
    const reasoningSteps = getReasoningStepsForMessage(message);
    const artifact = getArtifactForMessage(message);

    addMessage(threadId, 'user', message.trim());

    const assistantMessageId = addMessage(threadId, 'assistant', '', {
      reasoningSteps: reasoningSteps.map(s => ({ ...s, status: 'pending' })),
      artifacts: [],
    });

    setStatus('streaming');
    setError(null);

    abortControllerRef.current = new AbortController();

    try {
      // Simulate reasoning steps
      if (reasoningSteps.length > 0) {
        for (let i = 0; i < reasoningSteps.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 400));
          const updatedSteps = reasoningSteps.map((step, idx) => ({
            ...step,
            status: idx < i ? 'complete' : idx === i ? 'active' : 'pending'
          }));
          updateMessage(threadId, assistantMessageId, { reasoningSteps: updatedSteps });
        }
        // Mark all complete
        await new Promise(resolve => setTimeout(resolve, 300));
        updateMessage(threadId, assistantMessageId, {
          reasoningSteps: reasoningSteps.map(s => ({ ...s, status: 'complete' }))
        });
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
          threadId,
          pageContext,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Chat request failed: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        fullContent += chunk;
        updateMessage(threadId, assistantMessageId, { content: fullContent });
      }

      // Add artifact if applicable
      if (artifact) {
        const artifactWithId = {
          ...artifact,
          id: `artifact-${generateId()}`,
          createdAt: Date.now(),
        };
        updateMessage(threadId, assistantMessageId, {
          artifacts: [artifactWithId],
        });
        // Auto-open the artifact
        setActiveArtifact(artifactWithId);
      }

      setStatus('idle');
    } catch (err) {
      if (err.name === 'AbortError') {
        setStatus('idle');
        return;
      }

      console.error('Chat error:', err);
      setError(err.message);
      setStatus('error');
      updateMessage(threadId, assistantMessageId, {
        content: 'Sorry, I encountered an error. Please try again.',
      });
    }
  }, [activeThreadId, createThread, addMessage, updateMessage]);

  const cancelStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStatus('idle');
  }, []);

  const deleteThread = useCallback((threadId) => {
    setThreads(prev => prev.filter(t => t.id !== threadId));
    if (activeThreadId === threadId) {
      setActiveThreadId(null);
      setShowHistory(true);
      setActiveArtifact(null);
    }
  }, [activeThreadId]);

  const clearAllThreads = useCallback(() => {
    setThreads([]);
    setActiveThreadId(null);
    setShowHistory(true);
    setActiveArtifact(null);
  }, []);

  const getThreadsByContext = useCallback((contextFilter) => {
    if (!contextFilter) return threads;
    return threads.filter(t => t.pageContext.includes(contextFilter));
  }, [threads]);

  const value = {
    // State
    isOpen,
    showHistory,
    threads,
    activeThreadId,
    activeArtifact,
    status,
    error,
    isStreaming: status === 'streaming',
    hasActiveArtifact: !!activeArtifact,

    // Actions
    openChat,
    closeChat,
    toggleChat,
    toggleHistory,
    openArtifact,
    closeArtifact,
    updateArtifact,
    createThread,
    selectThread,
    getActiveThread,
    addMessage,
    updateMessage,
    addArtifactToMessage,
    sendMessage,
    cancelStream,
    deleteThread,
    clearAllThreads,
    getThreadsByContext,
  };

  return (
    <AIChatContext.Provider value={value}>
      {children}
    </AIChatContext.Provider>
  );
}

export function useAIChat() {
  const context = useContext(AIChatContext);

  if (context === undefined) {
    throw new Error('useAIChat must be used within an AIChatProvider');
  }

  return context;
}
