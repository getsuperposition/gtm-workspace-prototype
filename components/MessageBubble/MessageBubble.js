'use client';

import { formatMessageTime } from '@/utils/chatHelpers';
import styles from './MessageBubble.module.css';

const MessageBubble = ({ role, content, timestamp }) => {
  const isUser = role === 'user';
  const isAssistant = role === 'assistant';

  return (
    <div className={`${styles.messageWrapper} ${isUser ? styles.userWrapper : styles.assistantWrapper}`}>
      <div className={`${styles.messageBubble} ${isUser ? styles.userBubble : styles.assistantBubble}`}>
        <div className={styles.messageContent}>
          {content}
        </div>
        {timestamp && (
          <div className={styles.messageTimestamp}>
            {formatMessageTime(timestamp)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
