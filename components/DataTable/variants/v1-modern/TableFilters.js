'use client';

import { useState } from 'react';
import styles from './TableFilters.module.css';
import CustomCheckbox from './CustomCheckbox';
import { toggleColumnVisibility, ensureMinimumVisibleColumns } from '../../shared/columnUtils';

/**
 * Floating action bar with Fields dropdown, Filters, and Actions
 * Features sticky positioning and row count display
 * 
 * @param {Array} columns - All column definitions
 * @param {Array} visibleColumns - Currently visible columns
 * @param {function} onColumnToggle - Callback when column visibility changes
 * @param {number} selectedCount - Number of selected rows
 * @param {number} totalCount - Total number of rows
 */
export default function TableFilters({ 
  columns, 
  visibleColumns, 
  onColumnToggle, 
  selectedCount, 
  totalCount 
}) {
  const [isFieldsOpen, setIsFieldsOpen] = useState(false);

  const handleColumnToggle = (columnId) => {
    const updatedColumns = toggleColumnVisibility(columns, columnId);
    if (ensureMinimumVisibleColumns(updatedColumns)) {
      onColumnToggle(updatedColumns);
    }
  };

  return (
    <div className={styles.filterBar}>
      {/* Left side: Fields and Filters */}
      <div className={styles.leftActions}>
        {/* Fields dropdown */}
        <div className={styles.dropdownWrapper}>
          <button 
            className={styles.filterButton}
            onClick={() => setIsFieldsOpen(!isFieldsOpen)}
          >
            Fields
            <span className={`${styles.dropdownIcon} ${isFieldsOpen ? styles.open : ''}`}>
              ▼
            </span>
          </button>

          {isFieldsOpen && (
            <div className={styles.dropdown}>
              {columns.map((column) => (
                <label key={column.id} className={styles.dropdownItem}>
                  <CustomCheckbox
                    checked={column.visible !== false}
                    onChange={() => handleColumnToggle(column.id)}
                  />
                  <span>{column.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Filters button (placeholder) */}
        <button className={`${styles.filterButton} ${styles.disabled}`} disabled>
          Filters
        </button>
      </div>

      {/* Center: Row counts */}
      <div className={styles.rowCounts}>
        Showing {totalCount} rows
        {selectedCount > 0 && ` • ${selectedCount} selected`}
      </div>

      {/* Right side: Actions */}
      <div className={styles.rightActions}>
        <button 
          className={`${styles.actionsButton} ${selectedCount === 0 ? styles.disabled : ''}`}
          disabled={selectedCount === 0}
        >
          Actions
        </button>
      </div>
    </div>
  );
}
