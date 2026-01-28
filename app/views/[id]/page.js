'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ViewsDrawer from '@/components/ViewsDrawer/ViewsDrawer';
import DataTable from '@/components/DataTable/DataTable';
import TableSkeleton from '@/components/DataTable/variants/v1-modern/TableSkeleton';
import { usePageContext } from '@/contexts/PageContext';
import { mockViews } from '@/data/mockViewsData';
import styles from '../views.module.css';

export default function ViewDetailPage() {
  const params = useParams();
  const viewId = params.id;
  const { setPageContext } = usePageContext();

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [viewData, setViewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableVariant, setTableVariant] = useState('v1-modern');

  // Set page context when view data loads
  useEffect(() => {
    if (viewData) {
      setPageContext('view', {
        type: 'view',
        id: viewData.id,
        name: viewData.name,
        metadata: {
          isShared: viewData.isShared,
          rowCount: viewData.tableData?.rows?.length || 0,
        },
      });
    }
  }, [viewData, setPageContext]);

  // Load view data from JSON file
  useEffect(() => {
    const loadViewData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/data/views/${viewId}.json`);
        
        if (!response.ok) {
          throw new Error('View not found');
        }
        
        const data = await response.json();
        setViewData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setViewData(null);
      } finally {
        setLoading(false);
      }
    };

    if (viewId) {
      loadViewData();
    }
  }, [viewId]);

  // Listen for Views button click from sidebar - always open drawer
  useEffect(() => {
    const handleViewsClick = () => {
      setIsDrawerOpen(true);
    };

    window.addEventListener('openViewsDrawer', handleViewsClick);

    return () => {
      window.removeEventListener('openViewsDrawer', handleViewsClick);
    };
  }, []);

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSelectView = (view) => {
    // Navigation will be handled by the Link component in ViewsDrawer
  };

  return (
    <>
      <ViewsDrawer
        title="Views"
        items={mockViews}
        isOpen={isDrawerOpen}
        onToggle={handleToggleDrawer}
        selectedId={viewData?.id}
        onSelectItem={handleSelectView}
        showSearch={true}
      />
      
      <div className={`${styles.viewPage} ${isDrawerOpen ? styles.drawerOpen : styles.drawerClosed}`}>
        {loading ? (
          <>
            <div className={styles.viewHeader}>
              <h1>Loading...</h1>
            </div>
            <div className={styles.tableContainer}>
              <TableSkeleton />
            </div>
          </>
        ) : error ? (
          <>
            <div className={styles.viewHeader}>
              <h1>Error</h1>
            </div>
            <div className={styles.tableContainer}>
              <div className={styles.emptyState}>
                <p>{error}</p>
              </div>
            </div>
          </>
        ) : viewData ? (
          <>
            <div className={styles.viewHeader}>
              <h2>{viewData.name}</h2>
              {viewData.isShared && (
                <p className={styles.sharedIndicator}>
                  This view was shared with you
                </p>
              )}
            </div>
            
            {/* Table container */}
            <div className={styles.tableContainer}>
              {viewData.tableData ? (
                <DataTable
                  variant={tableVariant}
                  data={viewData.tableData.rows}
                  columns={viewData.tableData.columns}
                />
              ) : (
                <div className={styles.emptyState}>
                  <h3>No data yet</h3>
                  <p>Table data will be displayed here</p>
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
