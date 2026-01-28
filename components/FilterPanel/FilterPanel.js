'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import FilterAccordion from './FilterAccordion';
import styles from './FilterPanel.module.css';

/**
 * FilterPanel - Dropdown panel for filtering feed items
 * Appears as a dropdown from the Filter button, no overlay
 */

// Map pulse types to user-friendly signal names
const SIGNAL_TYPE_MAP = {
  'website-visits': 'Website visit',
  'meeting-prep': 'Meeting prep',
  'assigned-view': 'Assigned view',
  'key-promotions': 'Key promotions',
  'new-hire': 'New hire',
  'funding': 'Funding',
  'g2-views': 'G2 Views',
};

// Opportunity stages
const OPPORTUNITY_STAGES = [
  'Discovery',
  'Negotiation',
  'Renewal',
  'Expansion',
  'Closed Won',
  'Closed Lost',
];

// Risk levels
const RISK_LEVELS = [
  'Low',
  'Medium',
  'High',
  'Critical',
];

// Record types
const RECORD_TYPES = [
  'Signal',
  'Task',
  'Meeting',
  'Contact Update',
];

export default function FilterPanel({
  isOpen,
  onClose,
  feedItems = [],
  activeFilters = {},
  onApplyFilters,
  anchorRef,
}) {
  const panelRef = useRef(null);
  // Local filter state (applied on "Apply" button)
  const [localFilters, setLocalFilters] = useState(activeFilters);

  // Extract unique values from feed items for dynamic filter options
  const filterOptions = useMemo(() => {
    const signals = new Set();
    const accounts = new Set();
    const contacts = new Set();
    const stages = new Set();

    feedItems.forEach(item => {
      // Signals from type
      if (item.type && SIGNAL_TYPE_MAP[item.type]) {
        signals.add(item.type);
      }

      // Account from content.company.name
      if (item.content?.company?.name) {
        accounts.add(item.content.company.name);
      }

      // Stage from content.stage
      if (item.content?.stage) {
        stages.add(item.content.stage);
      }

      // Contacts from various content fields
      if (item.content?.visitors) {
        item.content.visitors.forEach(v => contacts.add(v.name));
      }
      if (item.content?.promotions) {
        item.content.promotions.forEach(p => contacts.add(p.contactName));
      }
      if (item.content?.hire?.name) {
        contacts.add(item.content.hire.name);
      }
    });

    return {
      signals: Array.from(signals).map(type => ({
        id: type,
        label: SIGNAL_TYPE_MAP[type] || type,
      })),
      accounts: Array.from(accounts).sort().map(name => ({
        id: name,
        label: name,
      })),
      contacts: Array.from(contacts).sort().map(name => ({
        id: name,
        label: name,
      })),
      stages: OPPORTUNITY_STAGES.map(stage => ({
        id: stage.toLowerCase().replace(' ', '-'),
        label: stage,
        disabled: !stages.has(stage),
      })),
      riskLevels: RISK_LEVELS.map(level => ({
        id: level.toLowerCase(),
        label: level,
      })),
      recordTypes: RECORD_TYPES.map(type => ({
        id: type.toLowerCase().replace(' ', '-'),
        label: type,
      })),
    };
  }, [feedItems]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    return Object.values(localFilters).reduce((sum, arr) => sum + (arr?.length || 0), 0);
  }, [localFilters]);

  // Handle filter change for a category
  const handleFilterChange = useCallback((category, selectedIds) => {
    setLocalFilters(prev => ({
      ...prev,
      [category]: selectedIds,
    }));
  }, []);

  // Handle apply
  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  // Handle cancel
  const handleCancel = () => {
    setLocalFilters(activeFilters); // Reset to current active filters
    onClose();
  };

  // Handle clear all
  const handleClearAll = () => {
    setLocalFilters({});
  };

  // Reset local state when panel opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(activeFilters);
    }
  }, [isOpen, activeFilters]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        anchorRef?.current &&
        !anchorRef.current.contains(e.target)
      ) {
        handleCancel();
      }
    };

    // Close on escape
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, anchorRef, handleCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          className={styles.dropdown}
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className={styles.header}>
            <h3 className={styles.title}>Filters</h3>
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleCancel}
              aria-label="Close filters"
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </button>
          </div>

          {/* Filter sections */}
          <div className={styles.content}>
            <FilterAccordion
              title="Signals"
              options={filterOptions.signals}
              selectedIds={localFilters.signals || []}
              onChange={(ids) => handleFilterChange('signals', ids)}
              searchable
              searchPlaceholder="Search signals"
              recentLabel="Recent signals"
              defaultExpanded
            />

            <FilterAccordion
              title="Account"
              options={filterOptions.accounts}
              selectedIds={localFilters.accounts || []}
              onChange={(ids) => handleFilterChange('accounts', ids)}
              searchable
              searchPlaceholder="Search accounts"
            />

            <FilterAccordion
              title="Contact"
              options={filterOptions.contacts}
              selectedIds={localFilters.contacts || []}
              onChange={(ids) => handleFilterChange('contacts', ids)}
              searchable
              searchPlaceholder="Search contacts"
            />

            <FilterAccordion
              title="Risk level"
              options={filterOptions.riskLevels}
              selectedIds={localFilters.riskLevels || []}
              onChange={(ids) => handleFilterChange('riskLevels', ids)}
            />

            <FilterAccordion
              title="Opportunity stage"
              options={filterOptions.stages}
              selectedIds={localFilters.opportunityStage || []}
              onChange={(ids) => handleFilterChange('opportunityStage', ids)}
            />

            <FilterAccordion
              title="Record type"
              options={filterOptions.recordTypes}
              selectedIds={localFilters.recordTypes || []}
              onChange={(ids) => handleFilterChange('recordTypes', ids)}
            />
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            {activeFilterCount > 0 && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClearAll}
              >
                Clear all
              </button>
            )}
            <div className={styles.footerActions}>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleApply}
              >
                Apply
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
