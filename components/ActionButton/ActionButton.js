'use client';

import { useState, useCallback } from 'react';
import { useTaskQueue } from '@/contexts/TaskQueueContext';
import { useAIChat } from '@/contexts/AIChatContext';
import styles from './ActionButton.module.css';

/**
 * @typedef {'meetingBrief' | 'emailDraft' | 'analysis' | 'document'} TaskType
 *
 * @typedef {Object} ActionButtonProps
 * @property {TaskType} taskType
 * @property {string} label - Default button label
 * @property {string} processingLabel - Label while processing (e.g., "Creating Meeting Brief")
 * @property {string} viewLabel - Label when artifact is ready (e.g., "View Meeting Brief")
 * @property {string} sourceId - ID of the source pulse
 * @property {string} sourceTitle - Title of the source pulse
 * @property {string} taskTitle - Title for the created task
 * @property {string} [accountName]
 * @property {string} [accountLogo]
 * @property {'primary' | 'secondary'} [variant='primary']
 * @property {'small' | 'medium'} [size='medium']
 * @property {boolean} [disabled]
 * @property {(taskId: string) => void} [onTaskCreated]
 * @property {(task: object) => void} [onViewArtifact]
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

const spinnerIcon = (
  <svg className={styles.spinner} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 12V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
    <path d="M3.05 3.05L5.17 5.17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
    <path d="M10.83 10.83L12.95 12.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2"/>
    <path d="M1 8H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
    <path d="M12 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.1"/>
    <path d="M3.05 12.95L5.17 10.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    <path d="M10.83 5.17L12.95 3.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
  </svg>
);

const viewIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export default function ActionButton({
  taskType,
  label,
  processingLabel,
  viewLabel,
  sourceId,
  sourceTitle,
  taskTitle,
  accountName,
  accountLogo,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onTaskCreated,
  onViewArtifact,
}) {
  const { addTask, tasks } = useTaskQueue();
  const { openArtifact, openChat } = useAIChat();
  const [isProcessing, setIsProcessing] = useState(false);

  // Check if there's a completed task for this source/type combination
  const completedTask = tasks.find(
    t => t.sourceId === sourceId && t.type === taskType && t.status === 'done'
  );

  // Check if there's a task in progress (queued or processing)
  const inProgressTask = tasks.find(
    t => t.sourceId === sourceId && t.type === taskType && (t.status === 'queued' || t.status === 'processing')
  );

  const handleClick = useCallback(() => {
    // If artifact is ready, view it
    if (completedTask && completedTask.artifact) {
      // Open chat panel and artifact canvas
      openChat();
      openArtifact(completedTask.artifact);
      onViewArtifact?.(completedTask);
      return;
    }

    // Don't create if already processing
    if (isProcessing || inProgressTask || disabled) return;

    setIsProcessing(true);

    const taskId = addTask({
      type: taskType,
      title: taskTitle,
      sourceId,
      sourceTitle,
      accountName,
      accountLogo,
    });

    onTaskCreated?.(taskId);
  }, [
    completedTask,
    isProcessing,
    inProgressTask,
    disabled,
    addTask,
    taskType,
    taskTitle,
    sourceId,
    sourceTitle,
    accountName,
    accountLogo,
    onTaskCreated,
    onViewArtifact,
    openChat,
    openArtifact,
  ]);

  // Determine button state
  const isComplete = !!completedTask;
  const showProcessing = isProcessing || !!inProgressTask;
  const isDisabled = disabled || showProcessing;

  // Determine label and icon
  let currentLabel = label;
  let currentIcon = iconMap[taskType];

  if (isComplete) {
    currentLabel = viewLabel || `View ${taskType === 'meetingBrief' ? 'Meeting Brief' : taskType === 'emailDraft' ? 'Email Draft' : 'Artifact'}`;
    currentIcon = viewIcon;
  } else if (showProcessing) {
    currentLabel = processingLabel;
    currentIcon = spinnerIcon;
  }

  const classNames = [
    styles.actionButton,
    styles[variant],
    styles[size],
    isDisabled && styles.disabled,
    showProcessing && styles.processing,
    isComplete && styles.complete,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classNames}
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={currentLabel}
      aria-busy={showProcessing}
    >
      <span className={styles.icon}>
        {currentIcon}
      </span>
      <span className={styles.label}>
        {currentLabel}
      </span>
    </button>
  );
}
