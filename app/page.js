'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import FeedItemSummaryCard from '../components/FeedItemSummaryCard/FeedItemSummaryCard';
import AnimatedFeedCard from '../components/FeedCard/AnimatedFeedCard';
import FeedCardSkeleton from '../components/FeedCard/FeedCardSkeleton';
import PulseCard from '../components/PulseCard';
import TasksView from '../components/TasksView';
import FilterPanel from '../components/FilterPanel';
import { useTaskQueue } from '../contexts/TaskQueueContext';
import Tabs from '../components/Tabs/Tabs';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getRandomFeedItems, sortFeedByTimestamp } from '../data/mockFeedData';
import { mockPulseData, sortPulsesByTimestamp } from '../data/mockPulseData';
import { generateSummaryText } from '../utils/feedHelpers';
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
  clearStateFromLocalStorage
} from '../utils/feedStateManager';
import tabStyles from '../components/Tabs/Tabs.module.css';
import styles from './page.module.css';

// Feature flag for new PulseCard layout
const USE_NEW_PULSE_CARDS = true;

export default function Home() {
  const router = useRouter();
  const { tasks, hasProcessingTasks, getCounts: getTaskCounts } = useTaskQueue();
  const [allFeedItems, setAllFeedItems] = useState([]);
  const [cardStates, setCardStates] = useState({});
  const [activeTab, setActiveTab] = useState('open');
  const [activeFilters, setActiveFilters] = useState({});
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [loadKey, setLoadKey] = useState(0);
  const hasLoadedRef = useRef(false);
  const filterButtonRef = useRef(null);

  // Count total active filters
  const activeFilterCount = useMemo(() => {
    return Object.values(activeFilters).reduce((sum, arr) => sum + (arr?.length || 0), 0);
  }, [activeFilters]);

  // Load feed items and card states on mount
  useEffect(() => {
    const loadFeed = async () => {
      setIsLoading(true);
      setIsInitialLoad(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Get feed items - use new pulse data if feature flag is enabled
      let feedItems;
      if (USE_NEW_PULSE_CARDS) {
        feedItems = sortPulsesByTimestamp(mockPulseData);
      } else {
        const randomItems = getRandomFeedItems(10);
        feedItems = sortFeedByTimestamp(randomItems);
      }

      // Load saved card states from localStorage
      const savedStates = loadStateFromLocalStorage();

      setAllFeedItems(feedItems);
      setCardStates(savedStates);
      setIsLoading(false);

      hasLoadedRef.current = true;
    };

    if (!hasLoadedRef.current) {
      loadFeed();
    }

    return () => {
      hasLoadedRef.current = false;
    };
  }, [loadKey]);

  // Listen for browser refresh/navigation events
  useEffect(() => {
    const handleBeforeUnload = () => {
      hasLoadedRef.current = false;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !hasLoadedRef.current) {
        setLoadKey(prev => prev + 1);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Save card states to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(cardStates).length > 0) {
      saveStateToLocalStorage(cardStates);
    }
  }, [cardStates]);

  // Apply filters to feed items
  const applyFilters = useCallback((items, filters) => {
    let filtered = [...items];

    // Filter by signal type
    if (filters.signals?.length > 0) {
      filtered = filtered.filter(item => filters.signals.includes(item.type));
    }

    // Filter by account
    if (filters.accounts?.length > 0) {
      filtered = filtered.filter(item => {
        const accountName = item.content?.company?.name;
        return accountName && filters.accounts.includes(accountName);
      });
    }

    // Filter by contact
    if (filters.contacts?.length > 0) {
      filtered = filtered.filter(item => {
        // Check visitors
        if (item.content?.visitors?.some(v => filters.contacts.includes(v.name))) {
          return true;
        }
        // Check promotions
        if (item.content?.promotions?.some(p => filters.contacts.includes(p.contactName))) {
          return true;
        }
        // Check hire
        if (item.content?.hire?.name && filters.contacts.includes(item.content.hire.name)) {
          return true;
        }
        return false;
      });
    }

    // Filter by opportunity stage
    if (filters.stages?.length > 0 || filters.opportunityStage?.length > 0) {
      const stageFilters = [...(filters.stages || []), ...(filters.opportunityStage || [])];
      filtered = filtered.filter(item => {
        const stage = item.content?.stage?.toLowerCase().replace(' ', '-');
        return stage && stageFilters.includes(stage);
      });
    }

    return filtered;
  }, []);

  // Get filtered items for current tab
  const getFilteredItemsForTab = useMemo(() => {
    // Actioned tab doesn't show feed items
    if (activeTab === 'actioned') {
      return [];
    }

    let tabFilteredItems = [];

    switch (activeTab) {
      case 'open':
        // Show non-archived cards (same as previous 'latest')
        tabFilteredItems = allFeedItems.filter(item => !cardStates[item.id]?.isArchived);
        break;
      case 'saved':
        // Show bookmarked, non-archived cards
        tabFilteredItems = allFeedItems.filter(item =>
          cardStates[item.id]?.isBookmarked && !cardStates[item.id]?.isArchived
        );
        break;
      default:
        tabFilteredItems = allFeedItems.filter(item => !cardStates[item.id]?.isArchived);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      tabFilteredItems = tabFilteredItems.filter(item => {
        const titleMatch = item.title?.toLowerCase().includes(query);
        const companyMatch = item.content?.company?.name?.toLowerCase().includes(query);
        const tagMatch = item.tags?.some(tag => tag.label.toLowerCase().includes(query));
        return titleMatch || companyMatch || tagMatch;
      });
    }

    // Apply panel filters
    if (activeFilterCount > 0) {
      tabFilteredItems = applyFilters(tabFilteredItems, activeFilters);
    }

    return tabFilteredItems;
  }, [allFeedItems, cardStates, activeTab, activeFilters, activeFilterCount, searchQuery, applyFilters]);

  // Calculate tab counts
  const tabCounts = useMemo(() => {
    const open = allFeedItems.filter(item => !cardStates[item.id]?.isArchived).length;
    const saved = allFeedItems.filter(item =>
      cardStates[item.id]?.isBookmarked && !cardStates[item.id]?.isArchived
    ).length;
    const taskCount = getTaskCounts().all;

    return { open, saved, tasks: taskCount };
  }, [allFeedItems, cardStates, getTaskCounts]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsInitialLoad(false);
  };

  // Handle filter panel apply
  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    setIsInitialLoad(false);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setActiveFilters({});
    setIsInitialLoad(false);
  };

  // Handle archive
  const handleArchive = (cardId) => {
    setCardStates(prev => ({
      ...prev,
      [cardId]: {
        ...(prev[cardId] || {}),
        isArchived: true,
        archivedAt: Date.now()
      }
    }));
  };

  // Handle bookmark change
  const handleBookmarkChange = (cardId, isBookmarked) => {
    setCardStates(prev => ({
      ...prev,
      [cardId]: {
        ...(prev[cardId] || {}),
        isBookmarked,
        bookmarkedAt: isBookmarked ? Date.now() : null
      }
    }));
  };

  // Handle card click - navigate to detail page
  const handleCardClick = (cardId) => {
    router.push(`/feed/${cardId}`);
  };

  // Handle CTA button click
  const handleCtaClick = (cardId, ctaLabel) => {
    console.log('CTA clicked:', ctaLabel, 'for card:', cardId);
    // Future: Implement specific actions per CTA type
  };

  // Handle reset feed
  const handleResetFeed = () => {
    clearStateFromLocalStorage();
    setCardStates({});
    setActiveTab('open');
    setActiveFilters({});
  };

  return (
    <div className={styles.page}>
      <div className={styles.feedContainer}>
        {!isLoading && allFeedItems.length > 0 && (
          <Tabs
            tabs={[
              { id: 'open', label: 'Open', count: tabCounts.open },
              { id: 'saved', label: 'Saved', count: tabCounts.saved },
              { id: 'actioned', label: 'Actioned', count: tabCounts.tasks, hasIndicator: hasProcessingTasks }
            ]}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            rightControls={
              activeTab !== 'actioned' ? (
                <>
                  <div className={tabStyles.searchInputWrapper}>
                    <SearchOutlinedIcon
                      className={tabStyles.searchIcon}
                      sx={{ fontSize: 16 }}
                    />
                    <input
                      type="text"
                      className={tabStyles.searchInput}
                      placeholder="Search feed..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className={styles.filterButtonWrapper}>
                    <button
                      ref={filterButtonRef}
                      className={`btn btn-secondary ${activeFilterCount > 0 ? styles.filterButtonActive : ''}`}
                      aria-label="Filters"
                      aria-expanded={isFilterPanelOpen}
                      onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                    >
                      <FilterListIcon sx={{ fontSize: 18 }} />
                      Filter
                      {activeFilterCount > 0 && (
                        <span className={styles.filterBadge}>{activeFilterCount}</span>
                      )}
                    </button>
                    <FilterPanel
                      isOpen={isFilterPanelOpen}
                      onClose={() => setIsFilterPanelOpen(false)}
                      feedItems={allFeedItems}
                      activeFilters={activeFilters}
                      onApplyFilters={handleApplyFilters}
                      anchorRef={filterButtonRef}
                    />
                  </div>
                </>
              ) : null
            }
          />
        )}

        {/* Active filter pills */}
        {activeFilterCount > 0 && activeTab !== 'actioned' && (
          <div className={styles.activeFilters}>
            <span className={styles.activeFiltersLabel}>
              {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} applied
            </span>
            <button
              className={styles.clearFiltersButton}
              onClick={handleClearFilters}
            >
              Clear all
            </button>
          </div>
        )}

        <div className={styles.feedList}>
          {isLoading ? (
            <>
              <FeedCardSkeleton />
              <FeedCardSkeleton />
              <FeedCardSkeleton />
              <FeedCardSkeleton />
              <FeedCardSkeleton />
            </>
          ) : activeTab === 'actioned' ? (
            <TasksView />
          ) : getFilteredItemsForTab.length > 0 ? (
            getFilteredItemsForTab.map((item, index) => (
              <AnimatedFeedCard
                key={`${loadKey}-${item.id}`}
                index={index}
                isInitialLoad={isInitialLoad}
              >
                {USE_NEW_PULSE_CARDS ? (
                  <PulseCard
                    id={item.id}
                    type={item.type}
                    title={item.title}
                    timestamp={item.timestamp}
                    content={item.content}
                    isBookmarked={cardStates[item.id]?.isBookmarked || false}
                    onBookmarkChange={handleBookmarkChange}
                    onArchive={handleArchive}
                    onClick={handleCardClick}
                  />
                ) : (
                  <FeedItemSummaryCard
                    id={item.id}
                    type={item.type}
                    tags={item.tags}
                    title={item.title}
                    summary={generateSummaryText(item.type, item.content)}
                    ctaLabel={item.ctaLabel}
                    isBookmarked={cardStates[item.id]?.isBookmarked || false}
                    isArchived={cardStates[item.id]?.isArchived || false}
                    onBookmarkChange={handleBookmarkChange}
                    onArchive={handleArchive}
                    onCtaClick={handleCtaClick}
                    onClick={handleCardClick}
                  />
                )}
              </AnimatedFeedCard>
            ))
          ) : activeFilterCount > 0 ? (
            <div className={styles.emptyState}>
              <p>No items match the selected filters</p>
              <button
                className="btn btn-secondary"
                onClick={handleClearFilters}
              >
                Clear filters
              </button>
            </div>
          ) : activeTab === 'saved' ? (
            <div className={styles.emptyState}>
              <p>No saved items yet</p>
              <p className="text-secondary">Bookmark items to see them here</p>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No feed items to display</p>
            </div>
          )}
        </div>

        {!isLoading && Object.keys(cardStates).length > 0 && (
          <div className={styles.resetContainer}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleResetFeed}
            >
              <RefreshIcon sx={{ fontSize: 18 }} />
              Reset feed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
