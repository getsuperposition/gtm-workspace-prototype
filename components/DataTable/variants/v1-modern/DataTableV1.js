'use client';

import { useState, useEffect } from 'react';
import styles from './DataTableV1.module.css';
import TableFilters from './TableFilters';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableSkeleton from './TableSkeleton';
import { sortData, toggleSortDirection } from '../../shared/sortingUtils';
import { toggleRowSelection, toggleSelectAll, getSelectionState } from '../../shared/selectionUtils';
import { getAllRowIds, getRowId } from '../../shared/dataHelpers';
import { tableLoadingConfig } from '@/utils/tableLoadingConfig';

/**
 * V1 Modern data table variant
 * Features animations, custom components, and sophisticated interactions
 * 
 * @param {Array} data - The table data rows
 * @param {Array} columns - The column definitions
 * @param {boolean} loading - Whether the table is loading
 */
export default function DataTableV1({ data = [], columns = [], loading = false }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSimulatedLoading, setIsSimulatedLoading] = useState(true);
  const [isExpanding, setIsExpanding] = useState(false);

  // Simulate loading for configured duration when component mounts with data
  useEffect(() => {
    if (!loading && data.length > 0) {
      setIsSimulatedLoading(true);
      setIsExpanding(false);
      
      const loadingTimer = setTimeout(() => {
        // Start margin expansion animation
        setIsExpanding(true);
        
        // Wait for margin expansion to complete, then show data
        const expansionTimer = setTimeout(() => {
          setIsSimulatedLoading(false);
          // Trigger row expansion animation after margin expansion completes
          setTimeout(() => setIsLoaded(true), 50);
        }, tableLoadingConfig.marginExpansion.duration + tableLoadingConfig.marginExpansion.delay);

        return () => clearTimeout(expansionTimer);
      }, tableLoadingConfig.loadingDuration);

      return () => clearTimeout(loadingTimer);
    }
  }, [loading, data]);

  // Update visible columns when columns prop changes
  useEffect(() => {
    setVisibleColumns(columns);
  }, [columns]);

  // Sort data
  const sortedData = sortData(data, sortConfig);
  const allRowIds = getAllRowIds(data);
  const selectionState = getSelectionState(selectedRows, allRowIds);

  // Handlers
  const handleSort = (columnId) => {
    setSortConfig((prev) => ({
      key: columnId,
      direction: prev.key === columnId ? toggleSortDirection(prev.direction) : 'asc',
    }));
  };

  const handleRowSelect = (rowId) => {
    setSelectedRows((prev) => toggleRowSelection(prev, rowId));
  };

  const handleSelectAll = () => {
    setSelectedRows((prev) => toggleSelectAll(prev, allRowIds));
  };

  const handleColumnToggle = (updatedColumns) => {
    setVisibleColumns(updatedColumns);
  };

  const getAnimationDelay = (index) => `${index * 30}ms`;

  // Show skeleton during actual loading or simulated loading
  if (loading || isSimulatedLoading) {
    return (
      <TableSkeleton
        rowCount={tableLoadingConfig.skeletonRowCount}
        columnCount={tableLoadingConfig.skeletonColumnCount}
        isExpanding={isExpanding}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      {/* Floating action bar */}
      <TableFilters
        columns={visibleColumns}
        visibleColumns={visibleColumns}
        onColumnToggle={handleColumnToggle}
        selectedCount={selectedRows.length}
        totalCount={data.length}
      />

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <TableHeader
            columns={visibleColumns}
            visibleColumns={visibleColumns}
            sortConfig={sortConfig}
            onSort={handleSort}
            onSelectAll={handleSelectAll}
            selectionState={selectionState}
          />
          <tbody>
            {sortedData.map((row, index) => {
              const rowId = getRowId(row, index);
              return (
                <TableRow
                  key={rowId}
                  rowData={row}
                  columns={visibleColumns}
                  visibleColumns={visibleColumns}
                  isSelected={selectedRows.includes(rowId)}
                  onSelect={() => handleRowSelect(rowId)}
                  animationDelay={isLoaded ? getAnimationDelay(index) : '0ms'}
                  index={index}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
