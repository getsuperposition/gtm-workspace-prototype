'use client';

import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useAIChat } from '@/contexts/AIChatContext';
import { usePageContext } from '@/contexts/PageContext';
import styles from './ChatHistoryList.module.css';

const ChatHistoryList = ({ onNewChat }) => {
  const { threads, selectThread, getThreadsByContext } = useAIChat();
  const { getBreadcrumb, pageType } = usePageContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('context'); // 'context' | 'all'

  const breadcrumb = getBreadcrumb();

  // Filter threads based on tab and search
  const contextThreads = getThreadsByContext(breadcrumb);
  const displayedThreads = activeTab === 'context' ? contextThreads : threads;

  const filteredThreads = displayedThreads.filter(thread =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={styles.container}>
      {/* Search */}
      <div className={styles.searchWrapper}>
        <SearchIcon className={styles.searchIcon} sx={{ fontSize: 18 }} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search chats…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search chats"
        />
      </div>

      {/* Tabs */}
      <div className={styles.tabs} role="tablist">
        <button
          className={`${styles.tab} ${activeTab === 'context' ? styles.active : ''}`}
          onClick={() => setActiveTab('context')}
          role="tab"
          aria-selected={activeTab === 'context'}
        >
          Chats for this View
          {contextThreads.length > 0 && (
            <span className={styles.tabCount}>{contextThreads.length}</span>
          )}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
          onClick={() => setActiveTab('all')}
          role="tab"
          aria-selected={activeTab === 'all'}
        >
          All Chats
          {threads.length > 0 && (
            <span className={styles.tabCount}>{threads.length}</span>
          )}
        </button>
      </div>

      {/* Thread List */}
      <div className={styles.list}>
        {filteredThreads.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>
              {searchQuery
                ? 'No chats found'
                : activeTab === 'context'
                ? `No chats for ${breadcrumb}`
                : 'No chats yet'}
            </p>
            {!searchQuery && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={onNewChat}
              >
                <AddIcon sx={{ fontSize: 16 }} />
                Start a new chat
              </button>
            )}
          </div>
        ) : (
          <ul className={styles.threadList} role="list">
            {filteredThreads.map((thread) => (
              <li key={thread.id}>
                <button
                  className={styles.threadItem}
                  onClick={() => selectThread(thread.id)}
                >
                  <span className={styles.threadTitle}>{thread.title}</span>
                  <span className={styles.threadMeta}>
                    <span className={styles.threadContext}>{thread.pageContext}</span>
                    <span className={styles.threadTime}>{formatTime(thread.updatedAt)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* New Chat Button */}
      {filteredThreads.length > 0 && (
        <div className={styles.footer}>
          <button
            className="btn btn-primary btn-block"
            onClick={onNewChat}
          >
            <AddIcon sx={{ fontSize: 18 }} />
            New Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatHistoryList;
