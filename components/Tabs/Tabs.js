'use client';

import Tag from '../FeedElements/Tag';
import styles from './Tabs.module.css';

/**
 * Tabs - Reusable tab navigation component
 *
 * @param {Array} tabs - Array of tab objects with { id, label, count?, disabled?, hasIndicator? }
 * @param {string} activeTab - ID of the currently active tab
 * @param {function} onTabChange - Callback when tab is changed
 * @param {boolean} showLoading - Optional loading state to disable tabs
 * @param {React.ReactNode} rightControls - Optional controls to render on the right side
 */
const Tabs = ({ tabs, activeTab, onTabChange, showLoading = false, rightControls }) => {
  const handleTabClick = (tabId) => {
    if (showLoading || tabs.find(t => t.id === tabId)?.disabled) return;
    onTabChange(tabId);
  };

  const handleKeyDown = (e, tabId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTabClick(tabId);
    }
  };

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabNavigation}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isDisabled = showLoading || tab.disabled;

          return (
            <button
              key={tab.id}
              className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
              onClick={() => handleTabClick(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, tab.id)}
              aria-selected={isActive}
              role="tab"
              disabled={isDisabled}
            >
              {tab.hasIndicator && <span className={styles.indicator} aria-hidden="true" />}
              <span className={styles.tabLabel}>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <Tag label={String(tab.count)} variant="default" size="sm" />
              )}
            </button>
          );
        })}
      </div>
      {rightControls && (
        <div className={styles.rightControls}>
          {rightControls}
        </div>
      )}
    </div>
  );
};

export default Tabs;
