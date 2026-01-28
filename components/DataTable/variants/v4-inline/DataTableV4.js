'use client';

import { useState, useMemo, useRef } from 'react';
import DismissReasonPicker from '@/components/DismissReasonPicker';
import styles from './DataTableV4.module.css';

/**
 * Inline DataTable variant for compact display in cards
 * Used for visitor lists, promotions, etc. in Pulse Feed cards
 *
 * Features:
 * - "See more" expansion instead of pagination
 * - Row dismiss with reason picker
 * - Clickable entity names via render functions
 */

const closeIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const chevronDownIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function DataTableV4({
  columns,
  data,
  actionColumn,
  initialVisibleCount = 4,
  expandIncrement = 6,
  emptyMessage = 'No data',
  onDismissRow,
  showRowDismiss = false,
}) {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const [dismissedRows, setDismissedRows] = useState(new Set());
  const [dismissPickerRow, setDismissPickerRow] = useState(null);
  const dismissButtonRefs = useRef({});

  // Filter out dismissed rows
  const activeData = useMemo(() => {
    return data.filter(row => !dismissedRows.has(row.id));
  }, [data, dismissedRows]);

  const visibleData = useMemo(() => {
    return activeData.slice(0, visibleCount);
  }, [activeData, visibleCount]);

  const hasMore = activeData.length > visibleCount;
  const remainingCount = activeData.length - visibleCount;

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + expandIncrement);
  };

  const handleDismissClick = (row) => {
    setDismissPickerRow(row.id);
  };

  const handleDismissReasonSelect = (row, reason) => {
    setDismissedRows(prev => new Set([...prev, row.id]));
    onDismissRow?.(row, reason);
    setDismissPickerRow(null);
  };

  const handleDismissPickerClose = () => {
    setDismissPickerRow(null);
  };

  if (activeData.length === 0) {
    return (
      <div className={styles.empty}>
        {emptyMessage}
      </div>
    );
  }

  // Build columns array with action column, then dismiss on far right
  const allColumns = [
    ...columns,
    ...(actionColumn ? [{ key: 'action', header: 'ACTION', width: 'auto' }] : []),
    ...(showRowDismiss ? [{ key: 'dismiss', header: '', width: '32px' }] : []),
  ];

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.table} role="table">
        {/* Header */}
        <div className={styles.headerRow} role="row">
          {allColumns.map(col => (
            <div
              key={col.key}
              className={styles.headerCell}
              role="columnheader"
              style={col.width ? { width: col.width, flex: col.width === 'auto' ? '0 0 auto' : undefined } : undefined}
            >
              {col.header}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className={styles.body} role="rowgroup">
          {visibleData.map((row, rowIndex) => (
            <div key={row.id || rowIndex} className={styles.row} role="row">
              {allColumns.map(col => (
                <div
                  key={col.key}
                  className={`${styles.cell} ${col.numeric ? styles.numeric : ''} ${col.key === 'dismiss' ? styles.dismissCell : ''}`}
                  role="cell"
                  style={col.width ? { width: col.width, flex: col.width === 'auto' ? '0 0 auto' : undefined } : undefined}
                >
                  {col.key === 'action' ? (
                    actionColumn(row)
                  ) : col.key === 'dismiss' ? (
                    <div className={styles.dismissWrapper}>
                      <button
                        ref={el => dismissButtonRefs.current[row.id] = el}
                        type="button"
                        className={styles.dismissButton}
                        onClick={() => handleDismissClick(row)}
                        aria-label="Dismiss this row"
                      >
                        {closeIcon}
                      </button>
                      <DismissReasonPicker
                        isOpen={dismissPickerRow === row.id}
                        onClose={handleDismissPickerClose}
                        onSelect={(reason) => handleDismissReasonSelect(row, reason)}
                        triggerRef={{ current: dismissButtonRefs.current[row.id] }}
                        position="bottom-right"
                      />
                    </div>
                  ) : col.render ? (
                    col.render(row)
                  ) : (
                    row[col.key]
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* See more */}
      {hasMore && (
        <button
          type="button"
          className={styles.seeMoreButton}
          onClick={handleSeeMore}
        >
          See {Math.min(remainingCount, expandIncrement)} more
          {chevronDownIcon}
        </button>
      )}
    </div>
  );
}
