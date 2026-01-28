'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SparkleIcon from './SparkleIcon';
import HoverBlobs from './HoverBlobs';
import { useAIChat } from '@/contexts/AIChatContext';
import styles from './AIChatButton.module.css';

const AIChatButton = () => {
  const { isOpen, toggleChat } = useAIChat();
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Delay tooltip to avoid flashing on quick hovers
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 400);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTooltip(false);
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
  };

  return (
    <div className={styles.buttonWrapper}>
      <motion.button
        className={styles.button}
        onClick={toggleChat}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Ask Chat"
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated hover background with spinning blobs */}
        <span className={`${styles.blobContainer} ${isHovered ? styles.blobVisible : ''}`}>
          <HoverBlobs className={styles.blobs} isVisible={isHovered} />
        </span>

        {/* Default icon - visible when not hovered */}
        <span className={`${styles.iconDefault} ${isHovered ? styles.iconHidden : ''}`}>
          <SparkleIcon size={28} />
        </span>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className={styles.tooltip}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{
              duration: 0.2,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            Ask Chat
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChatButton;
