'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessIcon from '@mui/icons-material/Business';
import MessageBubble from '@/components/MessageBubble/MessageBubble';
import LoadingMessageBubble from '@/components/MessageBubble/LoadingMessageBubble';
import ChatInput from '@/components/ChatInput/ChatInput';
import { useChatContext } from '@/contexts/ChatContext';
import { formatRelativeTime } from '@/utils/chatHelpers';
import styles from './ChatDetail.module.css';

const ChatDetail = ({ chat, onSendMessage }) => {
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const { loadingMessages, completingMessages } = useChatContext();
  
  // Check if this chat is currently loading or completing
  const isLoading = chat ? loadingMessages.has(chat.id) : false;
  const isCompleting = chat ? completingMessages.has(chat.id) : false;
  const showLoadingBubble = isLoading || isCompleting;

  // Auto-scroll to bottom when messages change or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages, showLoadingBubble]);

  if (!chat) {
    return (
      <div className={styles.errorContainer}>
        <h2>Chat not found</h2>
        <p>The chat you're looking for doesn't exist or has been deleted.</p>
        <button onClick={() => router.push('/chats')} className="btn btn-secondary">
          <ArrowBackIcon sx={{ fontSize: 20 }} />
          Back to Chats
        </button>
      </div>
    );
  }

  const handleBack = () => {
    router.push('/chats');
  };

  const handleSendMessage = (message) => {
    if (onSendMessage) {
      onSendMessage(message);
    }
  };

  // Get company display text
  const getCompanyDisplay = () => {
    if (!chat.companies || chat.companies.length === 0) {
      return null;
    }

    if (chat.companyCount && chat.companyCount > 1) {
      return `${chat.companyCount} companies`;
    }

    return chat.companies[0].name;
  };

  const companyDisplay = getCompanyDisplay();

  return (
    <div className={styles.chatDetailContainer}>
      {/* Header */}
      <div className={styles.chatHeader}>
        <button
          onClick={handleBack}
          className="btn btn-secondary"
          aria-label="Back to chats"
        >
          <ArrowBackIcon sx={{ fontSize: 20 }} />
          <span>Back to Chats</span>
        </button>
        
        <div className={styles.chatInfo}>
          <h1>{chat.title}</h1>
          <div className={styles.chatMeta}>
            {companyDisplay && (
              <>
                <div className={styles.companyInfo}>
                  <BusinessIcon sx={{ fontSize: 14 }} />
                  <span>{companyDisplay}</span>
                </div>
                <span className={styles.separator}>•</span>
              </>
            )}
            <span className={styles.timestamp}>
              Updated {formatRelativeTime(chat.updatedAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={styles.messagesContainer}>
        <div className={styles.messagesList}>
          {chat.messages.map((message) => (
            <MessageBubble
              key={message.id}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
          {showLoadingBubble && <LoadingMessageBubble isLoading={isLoading} />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className={styles.inputContainer}>
        <ChatInput
          onSubmit={handleSendMessage}
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
};

export default ChatDetail;
