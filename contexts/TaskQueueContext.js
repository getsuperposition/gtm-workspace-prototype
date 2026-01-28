'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY = 'gtm-workspace-task-queue';

/**
 * @typedef {'meetingBrief' | 'emailDraft' | 'analysis' | 'document'} TaskType
 * @typedef {'queued' | 'processing' | 'done' | 'error'} TaskStatus
 *
 * @typedef {Object} Task
 * @property {string} id
 * @property {TaskType} type
 * @property {TaskStatus} status
 * @property {string} title
 * @property {string} sourceId - ID of the source pulse
 * @property {string} sourceTitle - Title of the source pulse for grouping
 * @property {string} [accountName]
 * @property {string} [accountLogo]
 * @property {number} progress - 0-100
 * @property {number} elapsedSeconds
 * @property {number} [version]
 * @property {string} [errorMessage]
 * @property {number} createdAt
 * @property {number} [completedAt]
 * @property {Object} [artifact] - Generated artifact content when done
 */

import { generateArtifactForTask } from '@/data/mockArtifacts';

const TaskQueueContext = createContext();

// Simulated processing time range (for prototype)
const MIN_PROCESS_TIME = 8000; // 8 seconds
const MAX_PROCESS_TIME = 45000; // 45 seconds

function generateTaskId() {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function TaskQueueProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const processIntervals = useRef(new Map());

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Reset any processing tasks to queued on reload
        const resetTasks = parsed.map(task => ({
          ...task,
          status: task.status === 'processing' ? 'queued' : task.status,
          progress: task.status === 'processing' ? 0 : task.progress,
          elapsedSeconds: task.status === 'processing' ? 0 : task.elapsedSeconds,
        }));
        setTasks(resetTasks);
      }
    } catch (e) {
      console.error('Failed to load tasks from localStorage:', e);
    }
    setIsInitialized(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (e) {
        console.error('Failed to save tasks to localStorage:', e);
      }
    }
  }, [tasks, isInitialized]);

  // Simulate task processing
  const startProcessing = useCallback((taskId) => {
    const processingTime = MIN_PROCESS_TIME + Math.random() * (MAX_PROCESS_TIME - MIN_PROCESS_TIME);
    const startTime = Date.now();

    // Update to processing status
    setTasks(prev => prev.map(t =>
      t.id === taskId
        ? { ...t, status: 'processing', progress: 0, elapsedSeconds: 0 }
        : t
    ));

    // Progress update interval
    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(95, (elapsed / processingTime) * 100);
      const elapsedSeconds = Math.floor(elapsed / 1000);

      setTasks(prev => prev.map(t =>
        t.id === taskId && t.status === 'processing'
          ? { ...t, progress, elapsedSeconds }
          : t
      ));

      // Complete when time is up
      if (elapsed >= processingTime) {
        clearInterval(intervalId);
        processIntervals.current.delete(taskId);

        setTasks(prev => prev.map(t => {
          if (t.id === taskId) {
            // Generate artifact content for the completed task
            const artifact = generateArtifactForTask(t);
            return {
              ...t,
              status: 'done',
              progress: 100,
              completedAt: Date.now(),
              version: 1,
              artifact,
            };
          }
          return t;
        }));
      }
    }, 100);

    processIntervals.current.set(taskId, intervalId);
  }, []);

  // Process queued tasks (FIFO, one at a time per type)
  useEffect(() => {
    if (!isInitialized) return;

    const processingTypes = new Set(
      tasks.filter(t => t.status === 'processing').map(t => t.type)
    );

    // Find queued tasks that can start processing
    const queuedTasks = tasks.filter(t =>
      t.status === 'queued' && !processingTypes.has(t.type)
    );

    // Start processing one task per type
    const typesToProcess = new Set();
    queuedTasks.forEach(task => {
      if (!typesToProcess.has(task.type)) {
        typesToProcess.add(task.type);
        startProcessing(task.id);
      }
    });
  }, [tasks, isInitialized, startProcessing]);

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      processIntervals.current.forEach(intervalId => clearInterval(intervalId));
    };
  }, []);

  /**
   * Add a new task to the queue
   */
  const addTask = useCallback((params) => {
    const {
      type,
      title,
      sourceId,
      sourceTitle,
      accountName,
      accountLogo,
    } = params;

    const newTask = {
      id: generateTaskId(),
      type,
      status: 'queued',
      title,
      sourceId,
      sourceTitle,
      accountName,
      accountLogo,
      progress: 0,
      elapsedSeconds: 0,
      createdAt: Date.now(),
    };

    setTasks(prev => [...prev, newTask]);
    return newTask.id;
  }, []);

  /**
   * Remove a task from the queue
   */
  const removeTask = useCallback((taskId) => {
    // Clear any processing interval
    if (processIntervals.current.has(taskId)) {
      clearInterval(processIntervals.current.get(taskId));
      processIntervals.current.delete(taskId);
    }
    setTasks(prev => prev.filter(t => t.id !== taskId));
  }, []);

  /**
   * Clear all completed tasks
   */
  const clearCompletedTasks = useCallback(() => {
    setTasks(prev => prev.filter(t => t.status !== 'done'));
  }, []);

  /**
   * Clear all tasks (full reset)
   */
  const clearAllTasks = useCallback(() => {
    // Clear all processing intervals
    processIntervals.current.forEach(intervalId => clearInterval(intervalId));
    processIntervals.current.clear();
    setTasks([]);
  }, []);

  /**
   * Get tasks by status
   */
  const getTasksByStatus = useCallback((status) => {
    return tasks.filter(t => t.status === status);
  }, [tasks]);

  /**
   * Get tasks grouped by source pulse
   */
  const getGroupedTasks = useCallback(() => {
    const groups = new Map();

    tasks.forEach(task => {
      const key = task.sourceId;
      if (!groups.has(key)) {
        groups.set(key, {
          sourceId: task.sourceId,
          sourceTitle: task.sourceTitle,
          accountName: task.accountName,
          accountLogo: task.accountLogo,
          tasks: [],
        });
      }
      groups.get(key).tasks.push(task);
    });

    return Array.from(groups.values());
  }, [tasks]);

  /**
   * Get count by status
   */
  const getCounts = useCallback(() => {
    return {
      all: tasks.length,
      queued: tasks.filter(t => t.status === 'queued').length,
      processing: tasks.filter(t => t.status === 'processing').length,
      done: tasks.filter(t => t.status === 'done').length,
    };
  }, [tasks]);

  /**
   * Check if any tasks are processing
   */
  const hasProcessingTasks = tasks.some(t => t.status === 'processing');

  /**
   * Get task by ID
   */
  const getTaskById = useCallback((taskId) => {
    return tasks.find(t => t.id === taskId) || null;
  }, [tasks]);

  const value = {
    tasks,
    isInitialized,
    hasProcessingTasks,
    addTask,
    removeTask,
    clearCompletedTasks,
    clearAllTasks,
    getTasksByStatus,
    getGroupedTasks,
    getCounts,
    getTaskById,
  };

  return (
    <TaskQueueContext.Provider value={value}>
      {children}
    </TaskQueueContext.Provider>
  );
}

export function useTaskQueue() {
  const context = useContext(TaskQueueContext);

  if (context === undefined) {
    throw new Error('useTaskQueue must be used within a TaskQueueProvider');
  }

  return context;
}
