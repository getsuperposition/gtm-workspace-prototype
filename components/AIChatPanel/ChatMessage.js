'use client';

import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAIChat } from '@/contexts/AIChatContext';
import ArtifactCard from './ArtifactCard';
import ReasoningSteps from './ReasoningSteps';
import styles from './ChatMessage.module.css';

const ChatMessage = ({ message }) => {
  const { openArtifact, activeArtifact } = useAIChat();
  const isUser = message.role === 'user';

  const handleArtifactClick = (artifact) => {
    openArtifact(artifact);
  };

  return (
    <motion.div
      className={`${styles.message} ${isUser ? styles.user : styles.assistant}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Avatar - only for assistant */}
      {!isUser && (
        <div className={styles.assistantAvatar}>
          <AutoAwesomeIcon sx={{ fontSize: 16 }} />
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        {/* Reasoning steps (for assistant messages) */}
        {!isUser && message.reasoningSteps && message.reasoningSteps.length > 0 && (
          <ReasoningSteps steps={message.reasoningSteps} />
        )}

        {/* Message text */}
        {message.content && (
          <div className={`${styles.text} ${isUser ? styles.userText : styles.assistantText}`}>
            {message.content}
          </div>
        )}

        {/* Placeholder for empty assistant messages */}
        {!isUser && !message.content && (
          <div className={`${styles.text} ${styles.assistantText}`}>
            <span className={styles.placeholder}>Thinking…</span>
          </div>
        )}

        {/* Actions (for assistant messages with content) */}
        {!isUser && message.content && (
          <div className={styles.actions}>
            <button className={styles.actionButton} aria-label="Copy message">
              <ContentCopyIcon sx={{ fontSize: 14 }} />
            </button>
            <button className={styles.actionButton} aria-label="Like">
              <ThumbUpIcon sx={{ fontSize: 14 }} />
            </button>
            <button className={styles.actionButton} aria-label="Dislike">
              <ThumbDownIcon sx={{ fontSize: 14 }} />
            </button>
            <button className={styles.actionButton} aria-label="Regenerate">
              <RefreshIcon sx={{ fontSize: 14 }} />
            </button>
            <button className={styles.actionButton} aria-label="More options">
              <MoreHorizIcon sx={{ fontSize: 14 }} />
            </button>
          </div>
        )}

        {/* Artifacts */}
        {message.artifacts && message.artifacts.length > 0 && (
          <div className={styles.artifacts}>
            {message.artifacts.map((artifact, index) => (
              <ArtifactCard
                key={artifact.id || index}
                artifact={artifact}
                onClick={handleArtifactClick}
                isActive={activeArtifact?.id === artifact.id}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
