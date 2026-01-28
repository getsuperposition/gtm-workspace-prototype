'use client';

import { useState, useEffect } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckIcon from '@mui/icons-material/Check';
import styles from './FeedFilters.module.css';

const FeedFilters = ({ feedItems, activeFilters, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [tagCounts, setTagCounts] = useState({});

  // Extract unique tags from all feed items
  useEffect(() => {
    const tagsSet = new Set();
    feedItems.forEach(item => {
      item.tags.forEach(tag => {
        tagsSet.add(tag.label);
      });
    });
    setAvailableTags(Array.from(tagsSet).sort());
  }, [feedItems]);

  // Calculate tag counts
  useEffect(() => {
    const counts = {};
    
    // Initialize all tags with 0
    availableTags.forEach(tag => {
      counts[tag] = 0;
    });
    
    // Count items for each tag
    feedItems.forEach(item => {
      item.tags.forEach(tag => {
        if (counts[tag.label] !== undefined) {
          counts[tag.label]++;
        }
      });
    });
    
    setTagCounts(counts);
  }, [feedItems, availableTags]);

  const handleToggleExpand = () => {
    if (!isExpanded) {
      // Opening - initialize temp selection with current active filters
      setTempSelectedFilters([...activeFilters]);
    }
    setIsExpanded(!isExpanded);
  };

  const handleToggleTempFilter = (tagLabel) => {
    if (tempSelectedFilters.includes(tagLabel)) {
      // Remove filter
      setTempSelectedFilters(tempSelectedFilters.filter(f => f !== tagLabel));
    } else {
      // Add filter
      setTempSelectedFilters([...tempSelectedFilters, tagLabel]);
    }
  };

  const handleApplyFilters = () => {
    onFilterChange(tempSelectedFilters);
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setTempSelectedFilters([]);
  };

  const handleClearAll = () => {
    setTempSelectedFilters([]);
  };

  return (
    <div className={styles.filterContainer}>
      {/* Trigger Button */}
      <button 
        className={`${styles.filterTrigger} ${isExpanded ? styles.expanded : ''}`}
        onClick={handleToggleExpand}
        aria-label={isExpanded ? "Collapse filters" : "Expand filters"}
        aria-expanded={isExpanded}
      >
        <div className={styles.triggerLeft}>
          <FilterListIcon className={styles.filterIcon} />
          <span>Filters</span>
          {activeFilters.length > 0 && (
            <span className={styles.badge}>{activeFilters.length}</span>
          )}
        </div>
        {isExpanded ? (
          <ExpandLessIcon className={styles.expandIcon} />
        ) : (
          <ExpandMoreIcon className={styles.expandIcon} />
        )}
      </button>

      {/* Expandable Filter Panel */}
      {isExpanded && (
        <div className={styles.filterPanel}>
          {/* Filter Options */}
          <div className={styles.filterOptions}>
            {availableTags.length > 0 ? (
              availableTags.map((tag) => {
                const count = tagCounts[tag] || 0;
                const isDisabled = count === 0;
                const isSelected = tempSelectedFilters.includes(tag);
                
                return (
                  <button
                    key={tag}
                    className={`btn btn-chip ${isSelected ? 'active' : ''} ${styles.filterOption} ${isDisabled ? styles.disabled : ''}`}
                    disabled={isDisabled}
                    onClick={() => handleToggleTempFilter(tag)}
                  >
                    <span className={styles.filterLabel}>
                      {isSelected && <CheckIcon className={styles.checkIcon} />}
                      {tag}
                    </span>
                    <span className={`${styles.filterCount} ${isDisabled ? styles.disabledCount : ''}`}>
                      {count}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className={styles.emptyState}>
                <p>No filters available</p>
              </div>
            )}
          </div>
          
          {/* Filter Actions */}
          <div className={styles.filterActions}>
            {tempSelectedFilters.length > 0 && (
              <button
                className="btn btn-secondary btn-block"
                onClick={handleClearAll}
              >
                Clear all
              </button>
            )}
            <div className={styles.actionButtons}>
              <button
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleApplyFilters}
              >
                Apply filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedFilters;
