'use client';

import { useState } from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from './ReasoningSteps.module.css';

/**
 * ReasoningSteps component
 * Shows the AI's reasoning process with expandable steps
 */
const ReasoningSteps = ({ steps }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!steps || steps.length === 0) return null;

  const completedSteps = steps.filter(s => s.status === 'complete').length;
  const isComplete = completedSteps === steps.length;

  return (
    <div className={styles.container}>
      {/* Header */}
      <button
        className={styles.header}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <AutoAwesomeIcon sx={{ fontSize: 16 }} className={styles.headerIcon} />
        <span className={styles.headerTitle}>
          {isComplete ? 'Completed' : 'Reasoning'}
        </span>
        {isExpanded ? (
          <KeyboardArrowUpIcon sx={{ fontSize: 18 }} />
        ) : (
          <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
        )}
      </button>

      {/* Steps */}
      {isExpanded && (
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div
              key={step.id || index}
              className={`${styles.step} ${styles[step.status]}`}
            >
              <div className={styles.stepIndicator}>
                {step.status === 'complete' ? (
                  <CheckCircleIcon sx={{ fontSize: 14 }} />
                ) : step.status === 'active' ? (
                  <span className={styles.activeDot} />
                ) : (
                  <span className={styles.pendingDot} />
                )}
              </div>
              <div className={styles.stepContent}>
                <span className={styles.stepTitle}>{step.title}</span>
                {step.detail && (
                  <span className={styles.stepDetail}>{step.detail}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReasoningSteps;
