'use client';

import { memo, useEffect, useRef } from 'react';
import styles from './TableRow.module.css';
import CustomCheckbox from './CustomCheckbox';
import ContactAvatar from './ContactAvatar';
import StatusBadge from './StatusBadge';
import { getVisibleColumns } from '../../shared/columnUtils';
import { tableLoadingConfig } from '@/utils/tableLoadingConfig';

/**
 * Individual table row component with animations and interactions
 * Features hover lift effect, slide-in animation, and alternating backgrounds
 * 
 * @param {Object} rowData - The data for this row
 * @param {Array} columns - All column definitions
 * @param {Array} visibleColumns - Currently visible columns
 * @param {boolean} isSelected - Whether this row is selected
 * @param {function} onSelect - Callback when row selection changes
 * @param {string} animationDelay - CSS animation delay for staggered effect
 * @param {number} index - Row index for styling
 */
function TableRow({
  rowData,
  columns,
  visibleColumns,
  isSelected,
  onSelect,
  animationDelay = '0ms',
  index
}) {
  const rowRef = useRef(null);
  const cellRefs = useRef([]);
  const visible = getVisibleColumns(columns);

  // Generate random delay for each cell (0-800ms)
  const getCellAnimationDelay = (columnIndex) => {
    return `${Math.floor(Math.random() * 600)}ms`;
  };

  // Add animationComplete class after animation finishes
  useEffect(() => {
    const cells = cellRefs.current;
    
    // Set timeout to add animationComplete class after max animation time (800ms delay + 600ms animation)
    const timeout = setTimeout(() => {
      cells.forEach(cell => {
        if (cell) {
          cell.classList.add(styles.animationComplete);
        }
      });
    }, 900); // 800ms max delay + 600ms animation

    return () => clearTimeout(timeout);
  }, []);

  const renderCellContent = (column, value) => {
    // Primary column (contact name) - just show text without avatar
    if (column.primary) {
      return <span className={styles.primaryText}>{value}</span>;
    }

    // Badge type (status)
    if (column.type === 'badge') {
      return <StatusBadge status={value} />;
    }

    // Clickable column (company name)
    if (column.clickable) {
      return <span className={styles.clickableText}>{value}</span>;
    }

    // Default text
    return <span>{value}</span>;
  };

  return (
    <tr
      ref={rowRef}
      className={`${styles.row} ${isSelected ? styles.selected : ''}`}
      style={{ animationDelay }}
    >
      {/* Checkbox cell */}
      <td className={styles.checkboxCell}>
        <CustomCheckbox
          checked={isSelected}
          onChange={onSelect}
        />
      </td>

      {/* Data cells with individual animations */}
      {visible.map((column, columnIndex) => (
        <td
          key={column.id}
          ref={el => cellRefs.current[columnIndex] = el}
          className={styles.cell}
          style={{
            animationDelay: getCellAnimationDelay(columnIndex)
          }}
        >
          {renderCellContent(column, rowData[column.id])}
        </td>
      ))}
    </tr>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(TableRow);
