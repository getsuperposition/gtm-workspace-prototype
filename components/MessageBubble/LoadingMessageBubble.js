/**
 * LoadingMessageBubble Component
 *
 * A specialized message bubble that displays a loading animation
 * for chat assistant responses. Styled to match the assistant message bubble.
 *
 * @param {boolean} isLoading - Controls the loading animation state (true = loading, false = completing/fade-out)
 */

'use client';

import LoadingSquare from '@/components/LoadingStates/LoadingSquare';
import styles from './MessageBubble.module.css';

const LoadingMessageBubble = ({ isLoading = true }) => {
  return (
    <div className={`${styles.messageWrapper} ${styles.assistantWrapper}`}>
      <div className={`${styles.messageBubble} ${styles.assistantBubble} ${styles.loadingBubble}`}>
        <LoadingSquare isLoading={isLoading} size={16} />
      </div>
    </div>
  );
};

export default LoadingMessageBubble;
