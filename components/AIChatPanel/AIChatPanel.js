'use client';

import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import AddIcon from '@mui/icons-material/Add';
import { useAIChat } from '@/contexts/AIChatContext';
import { usePageContext } from '@/contexts/PageContext';
import ChatHistoryList from './ChatHistoryList';
import ChatThread from './ChatThread';
import styles from './AIChatPanel.module.css';

/**
 * AI Chat Panel
 * No backdrop - integrates into the layout as a side panel
 * Close button in header with simple gray hover
 */
const AIChatPanel = () => {
  const {
    closeChat,
    showHistory,
    toggleHistory,
    getActiveThread,
    createThread,
  } = useAIChat();

  const { getBreadcrumb } = usePageContext();
  const [showCloseTooltip, setShowCloseTooltip] = useState(false);
  const tooltipTimeoutRef = useRef(null);

  const activeThread = getActiveThread();
  const breadcrumb = getBreadcrumb();

  const handleNewChat = () => {
    createThread(breadcrumb);
  };

  const handleCloseMouseEnter = () => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowCloseTooltip(true);
    }, 400);
  };

  const handleCloseMouseLeave = () => {
    setShowCloseTooltip(false);
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
  };

  return (
    <aside
      className={styles.panel}
      role="complementary"
      aria-label="AI Assistant"
    >
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button
            className={`${styles.headerButton} ${showHistory ? styles.active : ''}`}
            onClick={toggleHistory}
            aria-label="Toggle chat history"
            aria-pressed={showHistory}
          >
            <HistoryIcon sx={{ fontSize: 18 }} />
          </button>
          <button
            className={styles.headerButton}
            onClick={handleNewChat}
            aria-label="Start new chat"
          >
            <AddIcon sx={{ fontSize: 18 }} />
          </button>
        </div>

        <div className={styles.headerRight}>
          {/* Close button with gray hover */}
          <div className={styles.closeButtonWrapper}>
            <button
              className={styles.closeButton}
              onClick={closeChat}
              onMouseEnter={handleCloseMouseEnter}
              onMouseLeave={handleCloseMouseLeave}
              aria-label="Close AI assistant"
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </button>

            {/* Tooltip */}
            <AnimatePresence>
              {showCloseTooltip && (
                <motion.div
                  className={styles.closeTooltip}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  Close
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {showHistory ? (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{
                duration: 0.28,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className={styles.contentInner}
            >
              <ChatHistoryList onNewChat={handleNewChat} />
            </motion.div>
          ) : (
            <motion.div
              key="thread"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{
                duration: 0.28,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className={styles.contentInner}
            >
              <ChatThread
                thread={activeThread}
                onStartNewChat={handleNewChat}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};

export default AIChatPanel;
