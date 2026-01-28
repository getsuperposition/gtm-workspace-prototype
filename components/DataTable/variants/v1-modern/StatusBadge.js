'use client';

import styles from './StatusBadge.module.css';

/**
 * Pill-shaped status badge component
 * Features color-coded backgrounds based on status type
 * 
 * @param {string} status - The status text to display
 * @param {string} type - Optional type override for custom styling
 */
export default function StatusBadge({ status, type }) {
  // Map status values to style classes
  const getStatusClass = (status) => {
    const statusLower = status?.toLowerCase() || '';
    
    if (statusLower.includes('prospect')) return 'prospecting';
    if (statusLower.includes('disqualified')) return 'disqualified';
    if (statusLower.includes('qualified')) return 'qualified';
    if (statusLower.includes('customer')) return 'customer';
    if (statusLower.includes('churned')) return 'churned';
    
    return 'default';
  };

  const statusClass = type || getStatusClass(status);

  return (
    <span className={`${styles.badge} ${styles[statusClass]}`}>
      {status}
    </span>
  );
}
