'use client';

import styles from './TableHeader.module.css';
import CustomCheckbox from './CustomCheckbox';
import { getVisibleColumns } from '../../shared/columnUtils';

/**
 * Table header component with sortable columns
 * Features gradient background and animated sort indicators
 * 
 * @param {Array} columns - All column definitions
 * @param {Array} visibleColumns - Currently visible columns
 * @param {Object} sortConfig - Current sort configuration { key, direction }
 * @param {function} onSort - Callback when column header is clicked
 * @param {function} onSelectAll - Callback when select-all checkbox is clicked
 * @param {string} selectionState - 'none', 'some', or 'all'
 */
export default function TableHeader({ 
  columns, 
  visibleColumns, 
  sortConfig, 
  onSort, 
  onSelectAll,
  selectionState 
}) {
  const visible = getVisibleColumns(columns);

  const handleHeaderClick = (column) => {
    if (column.sortable !== false) {
      onSort(column.id);
    }
  };

  const getSortIcon = (columnId) => {
    if (sortConfig.key !== columnId) {
      return <span className={styles.sortIcon}>↕</span>;
    }
    return sortConfig.direction === 'asc' 
      ? <span className={`${styles.sortIcon} ${styles.active}`}>↑</span>
      : <span className={`${styles.sortIcon} ${styles.active}`}>↓</span>;
  };

  return (
    <thead>
      <tr className={styles.headerRow}>
        {/* Select all checkbox */}
        <th className={styles.checkboxCell}>
          <CustomCheckbox 
            checked={selectionState === 'all'}
            indeterminate={selectionState === 'some'}
            onChange={onSelectAll}
          />
        </th>

        {/* Column headers */}
        {visible.map((column) => (
          <th 
            key={column.id}
            className={`${styles.headerCell} ${column.sortable !== false ? styles.sortable : ''}`}
            onClick={() => handleHeaderClick(column)}
          >
            <div className={styles.headerContent}>
              <span>{column.label}</span>
              {column.sortable !== false && getSortIcon(column.id)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
