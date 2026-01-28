'use client';

import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import styles from './ChatInput.module.css';

const ChatInput = ({ onSubmit, placeholder = 'Type your message...', disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSubmit(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className={styles.chatInputForm} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <textarea
          className={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          aria-label="Chat message input"
        />
        <button
          type="submit"
          className="btn btn-primary btn-icon-only btn-lg"
          disabled={disabled || !message.trim()}
          aria-label="Send message"
        >
          <SendIcon sx={{ fontSize: 20 }} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
