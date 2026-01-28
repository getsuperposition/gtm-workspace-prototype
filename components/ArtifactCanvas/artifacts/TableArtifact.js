'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './TableArtifact.module.css';

/**
 * Table Artifact with inline cell editing
 */
const TableArtifact = ({ artifact, onUpdate }) => {
  const { content } = artifact;
  const [localContent, setLocalContent] = useState(content || {});
  const [editingCell, setEditingCell] = useState(null); // { rowIndex, colKey }
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setLocalContent(content || {});
  }, [content]);

  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingCell]);

  if (!content) {
    return <div className={styles.empty}>No content available</div>;
  }

  const { title, description, columns = [], rows = [], summary } = localContent;

  const startEditing = (rowIndex, colKey, value) => {
    setEditingCell({ rowIndex, colKey });
    setEditValue(value ?? '');
  };

  const saveEdit = () => {
    if (!editingCell) return;

    const { rowIndex, colKey } = editingCell;
    const newRows = [...localContent.rows];
    newRows[rowIndex] = { ...newRows[rowIndex], [colKey]: editValue };

    setLocalContent(prev => ({ ...prev, rows: newRows }));

    if (onUpdate) {
      onUpdate({ rows: newRows });
    }

    setEditingCell(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      saveEdit();
      // Move to next cell
      const colIndex = columns.findIndex(c => (c.key || c) === editingCell.colKey);
      if (colIndex < columns.length - 1) {
        const nextCol = columns[colIndex + 1];
        const nextColKey = nextCol.key || nextCol;
        startEditing(editingCell.rowIndex, nextColKey, rows[editingCell.rowIndex][nextColKey]);
      } else if (editingCell.rowIndex < rows.length - 1) {
        const firstColKey = columns[0].key || columns[0];
        startEditing(editingCell.rowIndex + 1, firstColKey, rows[editingCell.rowIndex + 1][firstColKey]);
      }
    }
  };

  const formatCellValue = (value, type) => {
    if (value === null || value === undefined) {
      return '—';
    }

    switch (type) {
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      case 'currency':
        return typeof value === 'number'
          ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
          : value;
      case 'percent':
        return typeof value === 'number' ? `${value}%` : value;
      case 'date':
        return value instanceof Date ? value.toLocaleDateString() : value;
      default:
        return String(value);
    }
  };

  return (
    <div className={styles.table}>
      {/* Header */}
      {(title || description) && (
        <header className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.description}>{description}</p>}
        </header>
      )}

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className={styles.th}>
                  {column.label || column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={styles.tr}>
                {columns.map((column, colIndex) => {
                  const colKey = column.key || column;
                  const value = row[colKey];
                  const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.colKey === colKey;

                  return (
                    <td
                      key={colIndex}
                      className={`${styles.td} ${isEditing ? styles.editing : ''}`}
                      onClick={() => !isEditing && startEditing(rowIndex, colKey, value)}
                    >
                      {isEditing ? (
                        <input
                          ref={inputRef}
                          type="text"
                          className={styles.cellInput}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={saveEdit}
                          onKeyDown={handleKeyDown}
                        />
                      ) : (
                        <span className={styles.cellValue}>
                          {formatCellValue(value, column.type)}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      {summary && (
        <div className={styles.summary}>
          <h3 className={styles.summaryTitle}>Summary</h3>
          <div className={styles.summaryContent}>
            {summary.split('\n').map((line, index) => (
              <p key={index} className={styles.summaryLine}>{line}</p>
            ))}
          </div>
        </div>
      )}

      {/* Row count */}
      <div className={styles.footer}>
        <span className={styles.rowCount}>
          {rows.length} {rows.length === 1 ? 'row' : 'rows'}
        </span>
        <span className={styles.editHint}>Click any cell to edit</span>
      </div>
    </div>
  );
};

export default TableArtifact;
