'use client';

import { useRef, useEffect } from 'react';
import { useAIChat } from '@/contexts/AIChatContext';
import { usePageContext } from '@/contexts/PageContext';
import ChatMessage from './ChatMessage';
import SuggestedPrompts from './SuggestedPrompts';
import ChatInput from './ChatInput';
import styles from './ChatThread.module.css';

const ChatThread = ({ thread, onStartNewChat }) => {
  const { sendMessage, isStreaming, cancelStream } = useAIChat();
  const { getBreadcrumb, pageType, entity } = usePageContext();
  const messagesEndRef = useRef(null);

  const breadcrumb = getBreadcrumb();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread?.messages]);

  const handleSendMessage = (message) => {
    sendMessage(message, {
      breadcrumb,
      pageType,
      entity,
    });
  };

  const handlePromptSelect = (prompt) => {
    handleSendMessage(prompt);
  };

  // Empty state - no active thread
  if (!thread) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <div className={styles.emptyContent}>
            <div className="hero hero-sm">
              <span className="hero-eyebrow">Ask about your Feed</span>
              <h2 className="hero-heading">What do you want to action?</h2>
            </div>
          </div>

          <SuggestedPrompts onSelect={handlePromptSelect} />
        </div>

        <div className={styles.inputWrapper}>
          <ChatInput
            onSubmit={handleSendMessage}
            onCancel={cancelStream}
            placeholder="Ask anything…"
            disabled={false}
            isStreaming={isStreaming}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Messages */}
      <div className={styles.messages}>
        {thread.messages.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyContent}>
              <div className="hero hero-sm">
                <span className="hero-eyebrow">Ask about your Feed</span>
                <h2 className="hero-heading">What do you want to action?</h2>
              </div>
            </div>

            <SuggestedPrompts onSelect={handlePromptSelect} />
          </div>
        ) : (
          <>
            {thread.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {/* Streaming indicator */}
            {isStreaming && (
              <div className={styles.streamingIndicator}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className={styles.inputWrapper}>
        <ChatInput
          onSubmit={handleSendMessage}
          onCancel={cancelStream}
          placeholder="Ask anything…"
          disabled={false}
          isStreaming={isStreaming}
        />
      </div>
    </div>
  );
};

export default ChatThread;
