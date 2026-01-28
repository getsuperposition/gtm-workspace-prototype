'use client';

import { useState, useEffect } from 'react';
import ViewsDrawer from '@/components/ViewsDrawer/ViewsDrawer';
import { mockViews } from '@/data/mockViewsData';
import styles from './views.module.css';

export default function ViewsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // Listen for Views button click from sidebar - always open drawer
  useEffect(() => {
    const handleViewsClick = () => {
      setIsDrawerOpen(true);
    };

    // Custom event listener for sidebar Views button
    window.addEventListener('openViewsDrawer', handleViewsClick);

    return () => {
      window.removeEventListener('openViewsDrawer', handleViewsClick);
    };
  }, []);

  // Ensure drawer is open when page loads
  useEffect(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSelectView = (view) => {
    // Navigation is handled by Link component in ViewsDrawer
  };

  return (
    <>
      <ViewsDrawer
        title="Views"
        items={mockViews}
        isOpen={isDrawerOpen}
        onToggle={handleToggleDrawer}
        selectedId={null}
        onSelectItem={handleSelectView}
        showSearch={true}
      />
      
      <div className={`${styles.viewPage} ${isDrawerOpen ? styles.drawerOpen : styles.drawerClosed}`}>
        <div className={styles.viewHeader}>
          <h1>Views</h1>
          <p className={styles.sharedIndicator}>
            Select a view from the drawer to get started
          </p>
        </div>
        
        <div className={styles.tableContainer}>
          <div className={styles.emptyState}>
            <h3>No view selected</h3>
            <p>Views are audience lists for sales prospecting. Click on any view in the drawer to see its details and data.</p>
          </div>
        </div>
      </div>
    </>
  );
}
