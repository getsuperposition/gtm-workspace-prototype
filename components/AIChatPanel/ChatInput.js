'use client';

import { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import StopIcon from '@mui/icons-material/Stop';
import styles from './ChatInput.module.css';

const ChatInput = ({
  onSubmit,
  onCancel,
  placeholder = 'Type your message…',
  disabled = false,
  isStreaming = false,
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (message.trim() && !disabled && !isStreaming) {
      onSubmit(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <textarea
          ref={textareaRef}
          className={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          aria-label="Chat message input"
        />

        {isStreaming ? (
          <button
            type="button"
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={handleCancelClick}
            aria-label="Stop generating"
          >
            <StopIcon sx={{ fontSize: 18 }} />
          </button>
        ) : (
          <button
            type="submit"
            className={styles.button}
            disabled={disabled || !message.trim()}
            aria-label="Send message"
          >
            <SendIcon sx={{ fontSize: 18 }} />
          </button>
        )}
      </div>
    </form>
  );
};

export default ChatInput;
