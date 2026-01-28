'use client';

import { useEffect, useState } from 'react';
import styles from './TableSkeleton.module.css';
import { tableLoadingConfig } from '@/utils/tableLoadingConfig';

/**
 * Loading skeleton for the data table
 * Mimics table structure with pulsing sweep animation
 *
 * @param {number} rowCount - Number of skeleton rows to display (default: 10)
 * @param {number} columnCount - Number of columns to display (default: 6)
 * @param {boolean} isExpanding - Whether the skeleton is in expanding state (transitioning to data)
 */
export default function TableSkeleton({ rowCount = 10, columnCount = 6, isExpanding = false }) {
  const [pulseKey, setPulseKey] = useState(0);

  // Trigger pulse animation at configured intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseKey(prev => prev + 1);
    }, tableLoadingConfig.pulseInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${styles.skeletonWrapper} ${isExpanding ? styles.expanding : ''}`}
      style={{
        '--margin-transition-duration': `${tableLoadingConfig.marginExpansion.duration}ms`,
        '--margin-transition-delay': `${tableLoadingConfig.marginExpansion.delay}ms`,
      }}
    >
      {/* Pulse overlay that sweeps across the table */}
      <div
        key={pulseKey}
        className={styles.pulseOverlay}
        style={{
          '--pulse-duration': `${tableLoadingConfig.pulseDuration}ms`,
        }}
      />
      {/* Action bar skeleton */}
      <div className={styles.tableWrapper}>
      <div className={styles.actionBarSkeleton}>
        <div className={styles.skeletonButton}></div>
        <div className={styles.skeletonButton}></div>
        <div className={styles.skeletonSpacer}></div>
        <div className={styles.skeletonButton}></div>
      </div>

      {/* Table skeleton */}
        <table className={styles.table}>
          {/* Header skeleton */}
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.headerCell}>
                <div className={styles.skeletonCheckbox}></div>
              </th>
              {Array.from({ length: columnCount - 1 }).map((_, index) => (
                <th key={index} className={styles.headerCell}>
                  <div className={styles.skeletonHeaderText}></div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body skeleton */}
          <tbody>
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className={styles.row}
                style={{
                  '--row-index': rowIndex,
                  '--row-expansion-duration': `${tableLoadingConfig.rowExpansion.duration}ms`,
                  '--row-expansion-stagger': `${tableLoadingConfig.rowExpansion.staggerDelay}ms`,
                }}
              >
                <td className={styles.cell}>
                  <div className={styles.skeletonCheckbox}></div>
                </td>
                <td className={styles.cell}>
                  <div className={styles.cellContent}>
                    <div className={styles.skeletonAvatar}></div>
                    <div className={styles.skeletonText}></div>
                  </div>
                </td>
                {Array.from({ length: columnCount - 3 }).map((_, colIndex) => (
                  <td key={colIndex} className={styles.cell}>
                    <div className={styles.skeletonText}></div>
                  </td>
                ))}
                <td className={styles.cell}>
                  <div className={styles.skeletonBadge}></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
