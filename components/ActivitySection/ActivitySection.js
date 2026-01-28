'use client';

import { useState } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import { useSimulatedLoading } from '@/hooks/useSimulatedLoading';
import { LOADING_SPEEDS } from '@/utils/loadingDurations';
import { getRecentFeedItems } from '@/utils/feedHelpers';
import ActivityPreviewCard from '@/components/ActivityPreviewCard/ActivityPreviewCard';
import ChatPreviewCard from '@/components/ChatPreviewCard/ChatPreviewCard';
import ViewAllCard from '@/components/ViewAllCard/ViewAllCard';
import LoadingSquare from '@/components/LoadingStates/LoadingSquare';
import Tabs from '@/components/Tabs/Tabs';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import styles from './ActivitySection.module.css';

const ActivitySection = () => {
  const [activeTab, setActiveTab] = useState('activity');
  const [pendingTab, setPendingTab] = useState(null);
  const { chats } = useChatContext();
  const { isLoading, isCompleting, executeWithLoading } = useSimulatedLoading(LOADING_SPEEDS.QUICK);

  // Get recent feed items (9 items)
  const recentFeedItems = getRecentFeedItems(9);

  // Get recent chats (9 items)
  const recentChats = chats.slice(0, 9);

  // Show loading indicator during loading or completing
  const showLoading = isLoading || isCompleting;

  // Handle tab change with loading simulation
  const handleTabChange = async (tab) => {
    if (tab === activeTab) return; // Don't reload if already on this tab
    
    setPendingTab(tab);
    
    await executeWithLoading(async () => {
      // Tab change happens after fade-out completes
    });
    
    // Update tab after loading and fade-out complete
    setActiveTab(tab);
    setPendingTab(null);
  };

  return (
    <div className={styles.activitySection}>
      <Tabs
        tabs={[
          { id: 'activity', label: 'Latest Activity' },
          { id: 'chats', label: 'Recent Chats' }
        ]}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        showLoading={showLoading}
      />

      <div className={styles.tabContent} role="tabpanel">
        {showLoading && (
          <div className={styles.loadingContainer}>
            <LoadingSquare isLoading={isLoading} size={40} />
          </div>
        )}
        
        {!showLoading && activeTab === 'activity' && (
          <div className={styles.cardGrid}>
            {recentFeedItems.map((item) => (
              <ActivityPreviewCard
                key={item.id}
                id={item.id}
                type={item.type}
                title={item.title}
                timestamp={item.timestamp}
                content={item.content}
                tags={item.tags}
              />
            ))}
            <ViewAllCard
              label="View my feed"
              href="/feed"
              icon={DynamicFeedIcon}
            />
          </div>
        )}
        
        {!showLoading && activeTab === 'chats' && (
          <div className={styles.cardGrid}>
            {recentChats.length > 0 ? (
              <>
                {recentChats.map((chat) => (
                  <ChatPreviewCard
                    key={chat.id}
                    id={chat.id}
                    title={chat.title}
                    firstMessage={chat.messages[0]?.content}
                    updatedAt={chat.updatedAt}
                    companies={chat.companies}
                    companyCount={chat.companyCount}
                  />
                ))}
                <ViewAllCard
                  label="View all chats"
                  href="/chats"
                  icon={ChatBubbleOutlineIcon}
                />
              </>
            ) : (
              <div className={styles.emptyState}>
                <ChatBubbleOutlineIcon sx={{ fontSize: 48 }} />
                <p>No chats yet</p>
                <span className={styles.emptyHint}>
                  Start a conversation using the search box above
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitySection;
