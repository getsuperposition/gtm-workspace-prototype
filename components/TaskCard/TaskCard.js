'use client';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styles from './TaskCard.module.css';

/**
 * TaskCard component for displaying tasks in the Tasks tab
 * Shows different states: queued, processing, done
 * Completed tasks with artifacts are clickable to open in canvas
 */

const iconMap = {
  meetingBrief: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1H4C3.44772 1 3 1.44772 3 2V14C3 14.5523 3.44772 15 4 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 1V5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 8H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 11H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  emailDraft: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="3" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M1 4L8 9L15 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  analysis: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 13V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 13V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 13V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  document: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1H4C3.44772 1 3 1.44772 3 2V14C3 14.5523 3.44772 15 4 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 1V5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

const checkIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs.toString().padStart(2, '0')}s`;
}

function formatCompletedTime(timestamp) {
  if (!timestamp) return null;

  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function TaskCard({
  task,
  onClick,
  showTimestamp = false,
}) {
  const { type, status, title, progress, elapsedSeconds, version, completedAt } = task;

  const isQueued = status === 'queued';
  const isProcessing = status === 'processing';
  const isDone = status === 'done';

  const classNames = [
    styles.taskCard,
    isQueued && styles.queued,
    isProcessing && styles.processing,
    isDone && styles.done,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      onClick={isDone ? onClick : undefined}
      role={isDone ? 'button' : undefined}
      tabIndex={isDone ? 0 : undefined}
      onKeyDown={isDone ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
    >
      <div className={styles.content}>
        <div className={styles.iconAndTitle}>
          <span className={styles.icon}>
            {iconMap[type]}
          </span>
          <span className={styles.title}>{title}</span>
          {version && (
            <span className={styles.version}>v{version}</span>
          )}
        </div>

        <div className={styles.statusArea}>
          {isQueued && (
            <span className={styles.queuedLabel}>QUEUED</span>
          )}

          {isDone && (
            <>
              {showTimestamp && completedAt && (
                <span className={styles.completedTime}>
                  {formatCompletedTime(completedAt)}
                </span>
              )}
              <span className={styles.doneLabel}>
                {checkIcon}
                <span className={styles.viewText}>View</span>
                <OpenInNewIcon sx={{ fontSize: 14 }} className={styles.openIcon} />
              </span>
            </>
          )}
        </div>
      </div>

      {isProcessing && (
        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.timeLabel}>
            {formatTime(elapsedSeconds)}
          </span>
        </div>
      )}
    </div>
  );
}
