'use client';

import { useState, useMemo } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import SortIcon from '@mui/icons-material/Sort';
import { useTaskQueue } from '@/contexts/TaskQueueContext';
import { useAIChat } from '@/contexts/AIChatContext';
import TaskCard from '@/components/TaskCard';
import styles from './TasksView.module.css';

/**
 * TasksView - Tasks tab content showing grouped tasks with sub-filters
 * Completed tasks can be clicked to view artifacts in the canvas
 */

const FILTERS = [
  { id: 'all', label: 'ALL' },
  { id: 'next', label: 'NEXT' },
  { id: 'processing', label: 'PROCESSING' },
  { id: 'done', label: 'DONE' },
];

const SORT_OPTIONS = [
  { id: 'grouped', label: 'Grouped by Pulse' },
  { id: 'recent', label: 'Most Recent' },
];

export default function TasksView() {
  const { tasks, getGroupedTasks, getCounts, clearAllTasks } = useTaskQueue();
  const { openArtifact, openChat } = useAIChat();
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('grouped');

  const counts = getCounts();

  // Filter tasks based on active filter
  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case 'next':
        return tasks.filter(t => t.status === 'queued');
      case 'processing':
        return tasks.filter(t => t.status === 'processing');
      case 'done':
        return tasks.filter(t => t.status === 'done');
      default:
        return tasks;
    }
  }, [tasks, activeFilter]);

  // Sort tasks by most recent (completedAt or createdAt)
  const sortedTasks = useMemo(() => {
    if (sortBy === 'recent') {
      return [...filteredTasks].sort((a, b) => {
        const aTime = a.completedAt || a.createdAt;
        const bTime = b.completedAt || b.createdAt;
        return bTime - aTime; // Most recent first
      });
    }
    return filteredTasks;
  }, [filteredTasks, sortBy]);

  // Group filtered tasks by source (only when grouped view)
  const groupedTasks = useMemo(() => {
    if (sortBy === 'recent') {
      return null; // Flat list for recent sort
    }

    const groups = new Map();

    filteredTasks.forEach(task => {
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
  }, [filteredTasks, sortBy]);

  const getFilterCount = (filterId) => {
    switch (filterId) {
      case 'all':
        return counts.all;
      case 'next':
        return counts.queued;
      case 'processing':
        return counts.processing;
      case 'done':
        return counts.done;
      default:
        return 0;
    }
  };

  const handleTaskClick = (task) => {
    // Open the artifact in the canvas and show chat panel for editing
    if (task.artifact) {
      openChat(); // Ensure chat panel is open
      openArtifact(task.artifact); // Open artifact in canvas
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all tasks and artifacts? This will reset everything.')) {
      clearAllTasks();
    }
  };

  const toggleSort = () => {
    setSortBy(prev => prev === 'grouped' ? 'recent' : 'grouped');
  };

  if (tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No tasks yet</p>
        <p className={styles.emptyHint}>
          Click action buttons on pulse cards to start generating artifacts
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tasksView}>
      {/* Sub-filter pills */}
      <div className={styles.filterRow}>
        <div className={styles.filterPills}>
          {FILTERS.map(filter => {
            const count = getFilterCount(filter.id);
            const isActive = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                className={`${styles.filterPill} ${isActive ? styles.active : ''}`}
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={isActive}
              >
                {filter.label}
                <span className={styles.filterCount}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.controlButtons}>
          <button
            type="button"
            className={`${styles.sortButton} ${sortBy === 'recent' ? styles.active : ''}`}
            onClick={toggleSort}
            aria-label={`Sort by ${sortBy === 'grouped' ? 'most recent' : 'grouped by pulse'}`}
          >
            <SortIcon sx={{ fontSize: 16 }} />
            {sortBy === 'grouped' ? 'Grouped' : 'Recent'}
          </button>

          {counts.all > 0 && (
            <button
              type="button"
              className={styles.resetButton}
              onClick={handleClearAll}
              aria-label="Clear all tasks"
            >
              <RefreshIcon sx={{ fontSize: 16 }} />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Task list */}
      <div className={styles.taskGroups}>
        {filteredTasks.length === 0 ? (
          <div className={styles.emptyFilter}>
            <p>No {activeFilter === 'next' ? 'queued' : activeFilter} tasks</p>
          </div>
        ) : sortBy === 'recent' ? (
          // Flat list sorted by most recent
          <div className={styles.flatTaskList}>
            {sortedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => handleTaskClick(task)}
                showTimestamp
              />
            ))}
          </div>
        ) : (
          // Grouped by pulse
          groupedTasks.map(group => (
            <div key={group.sourceId} className={styles.taskGroup}>
              {/* Group header */}
              <div className={styles.groupHeader}>
                {group.accountName && (
                  <>
                    {group.accountLogo ? (
                      <img
                        src={group.accountLogo}
                        alt=""
                        className={styles.accountLogo}
                      />
                    ) : (
                      <div className={styles.accountLogoPlaceholder}>
                        {group.accountName.charAt(0)}
                      </div>
                    )}
                    <span className={styles.accountName}>{group.accountName}</span>
                  </>
                )}
                <span className={styles.sourceTitle}>{group.sourceTitle}</span>
              </div>

              {/* Tasks in group */}
              <div className={styles.groupTasks}>
                {group.tasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => handleTaskClick(task)}
                    showTimestamp
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
