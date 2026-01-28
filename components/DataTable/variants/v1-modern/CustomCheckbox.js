'use client';

import styles from './CustomCheckbox.module.css';

/**
 * Custom animated checkbox component with SVG checkmark
 * Features smooth transitions and draw-in animation
 * 
 * @param {boolean} checked - Whether the checkbox is checked
 * @param {function} onChange - Callback when checkbox state changes
 * @param {boolean} indeterminate - Whether to show indeterminate state (for select-all)
 */
export default function CustomCheckbox({ checked, onChange, indeterminate = false }) {
  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.hiddenInput}
      />
      <div className={`${styles.checkbox} ${checked || indeterminate ? styles.checked : ''}`}>
        <svg viewBox="0 0 16 16" className={styles.checkboxSvg}>
          {indeterminate ? (
            <line
              x1="4"
              y1="8"
              x2="12"
              y2="8"
              className={styles.indeterminateLine}
            />
          ) : (
            <path
              d="M3 8l3 3 7-7"
              className={styles.checkmark}
              style={{
                strokeDashoffset: checked ? 0 : 12
              }}
            />
          )}
        </svg>
      </div>
    </label>
  );
}
