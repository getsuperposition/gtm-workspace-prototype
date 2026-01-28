'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './DismissReasonPicker.module.css';

/**
 * DismissReasonPicker - Dropdown to select reason for dismissing a card or row
 */

const DISMISS_REASONS = [
  { id: 'already-contacted', label: 'Already contacted this person' },
  { id: 'not-relevant', label: 'Not a relevant fit' },
  { id: 'assigned-elsewhere', label: 'Account assigned to someone else' },
  { id: 'wrong-timing', label: 'Wrong timing' },
  { id: 'duplicate', label: 'Duplicate entry' },
  { id: 'other', label: 'Other reason' },
];

export default function DismissReasonPicker({
  isOpen,
  onClose,
  onSelect,
  position = 'bottom-right',
  triggerRef,
}) {
  const [selectedReason, setSelectedReason] = useState(null);
  const pickerRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target) &&
        triggerRef?.current &&
        !triggerRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSelect = (reason) => {
    setSelectedReason(reason);
    onSelect(reason);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={pickerRef}
      className={`${styles.picker} ${styles[position]}`}
      role="listbox"
      aria-label="Select dismiss reason"
    >
      <div className={styles.header}>
        Why are you dismissing this?
      </div>
      <ul className={styles.options}>
        {DISMISS_REASONS.map((reason) => (
          <li key={reason.id}>
            <button
              type="button"
              className={styles.option}
              onClick={() => handleSelect(reason)}
              role="option"
              aria-selected={selectedReason?.id === reason.id}
            >
              {reason.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
