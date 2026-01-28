/**
 * Task Queue Types
 * Manages artifact generation tasks (email drafts, meeting briefs, etc.)
 */

export type TaskType = 'meetingBrief' | 'emailDraft' | 'analysis' | 'document';

export type TaskStatus = 'queued' | 'processing' | 'done' | 'error';

export interface Task {
  id: string;
  type: TaskType;
  status: TaskStatus;
  title: string;
  /** ID of the source pulse that triggered this task */
  sourceId: string;
  /** Source pulse title for grouping in Tasks view */
  sourceTitle: string;
  /** Account name associated with the task */
  accountName?: string;
  /** Account logo URL */
  accountLogo?: string;
  /** Progress 0-100 for processing state */
  progress: number;
  /** Elapsed time in seconds */
  elapsedSeconds: number;
  /** Version number for completed artifacts */
  version?: number;
  /** Error message if status is error */
  errorMessage?: string;
  createdAt: number;
  completedAt?: number;
}

export interface TaskGroup {
  sourceId: string;
  sourceTitle: string;
  accountName?: string;
  accountLogo?: string;
  tasks: Task[];
}

export type TaskFilter = 'all' | 'next' | 'processing' | 'done';

export const taskTypeLabels: Record<TaskType, string> = {
  meetingBrief: 'Meeting Brief',
  emailDraft: 'Email',
  analysis: 'Analysis',
  document: 'Document',
};

export const taskTypeIcons: Record<TaskType, string> = {
  meetingBrief: 'FileText',
  emailDraft: 'Mail',
  analysis: 'BarChart',
  document: 'File',
};
