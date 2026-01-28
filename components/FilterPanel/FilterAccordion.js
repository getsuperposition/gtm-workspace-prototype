'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import styles from './FilterPanel.module.css';

/**
 * FilterAccordion - Collapsible filter section with checkboxes
 */
export default function FilterAccordion({
  title,
  options = [],
  selectedIds = [],
  onChange,
  searchable = false,
  searchPlaceholder = 'Search...',
  recentLabel,
  defaultExpanded = false,
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter options by search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    const query = searchQuery.toLowerCase();
    return options.filter(opt => opt.label.toLowerCase().includes(query));
  }, [options, searchQuery]);

  // Toggle option selection
  const toggleOption = (optionId) => {
    const newSelected = selectedIds.includes(optionId)
      ? selectedIds.filter(id => id !== optionId)
      : [...selectedIds, optionId];
    onChange(newSelected);
  };

  // Count selected in this section
  const selectedCount = selectedIds.length;

  return (
    <div className={styles.accordion}>
      {/* Accordion header */}
      <button
        type="button"
        className={styles.accordionHeader}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className={styles.accordionTitle}>
          {title}
          {selectedCount > 0 && (
            <span className={styles.selectedBadge}>{selectedCount}</span>
          )}
        </span>
        <motion.span
          className={styles.expandIcon}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ExpandMoreIcon sx={{ fontSize: 20 }} />
        </motion.span>
      </button>

      {/* Accordion content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            className={styles.accordionContent}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.accordionInner}>
              {/* Search input */}
              {searchable && (
                <div className={styles.searchWrapper}>
                  <SearchOutlinedIcon
                    className={styles.searchIcon}
                    sx={{ fontSize: 16 }}
                  />
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              )}

              {/* Recent label */}
              {recentLabel && !searchQuery && (
                <span className={styles.recentLabel}>{recentLabel}</span>
              )}

              {/* Options list */}
              <div className={styles.optionsList}>
                {filteredOptions.length === 0 ? (
                  <span className={styles.noResults}>No results found</span>
                ) : (
                  filteredOptions.map(option => {
                    const isSelected = selectedIds.includes(option.id);
                    return (
                      <label
                        key={option.id}
                        className={`${styles.optionItem} ${option.disabled ? styles.disabled : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleOption(option.id)}
                          disabled={option.disabled}
                          className={styles.checkboxInput}
                        />
                        <span className={styles.checkbox}>
                          {isSelected ? (
                            <CheckBoxIcon sx={{ fontSize: 20 }} />
                          ) : (
                            <CheckBoxOutlineBlankIcon sx={{ fontSize: 20 }} />
                          )}
                        </span>
                        <span className={styles.optionLabel}>{option.label}</span>
                      </label>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
