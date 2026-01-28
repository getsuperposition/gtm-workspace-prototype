'use client';

import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from './ArchivedCardView.module.css';

/**
 * ArchivedCardView - Displays collapsed archived state with actions
 * 
 * @param {function} onUndo - Callback when undo is clicked
 * @param {function} onShowLess - Callback when "Show less of this" is clicked
 * @param {boolean} showLessRequested - Whether user has clicked "Show less"
 * @param {Object} cardData - Card data for preview (passed to parent for hover)
 */
const ArchivedCardView = ({ onUndo, onShowLess, showLessRequested }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={styles.archivedContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.archivedContent}>
        <span className={styles.archivedMessage}>Feed item archived</span>
        
        <div className={styles.archivedActions}>
          <button
            className={styles.textLink}
            onClick={onUndo}
            aria-label="Undo archive"
          >
            Undo
          </button>
          
          <span className={styles.separator}>|</span>
          
          {!showLessRequested ? (
            <button
              className={styles.textLink}
              onClick={onShowLess}
              aria-label="Show less of this content"
            >
              Show less of this
            </button>
          ) : (
            <div className={styles.confirmation}>
              <CheckCircleIcon 
                sx={{ fontSize: 16, color: '#10B981' }} 
                className={styles.checkIcon}
              />
              <span className={styles.confirmationText}>
                We'll show you less of this content
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchivedCardView;
