'use client';

import { useState, useEffect } from 'react';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Tag from '../FeedElements/Tag';
import styles from './FeedItemSummaryCard.module.css';

/**
 * FeedItemSummaryCard - A compact summary card for feed items
 * Shows tags, title, short description, and primary action button
 * Clicking the card navigates to the detail page
 * 
 * @param {string} id - Feed item ID
 * @param {string} type - Feed type (meeting, website-visits, etc.)
 * @param {array} tags - Array of tag objects
 * @param {string} title - Card title
 * @param {string} summary - Short description text
 * @param {string} ctaLabel - Primary action button label
 * @param {boolean} isBookmarked - Bookmark state
 * @param {boolean} isArchived - Archive state
 * @param {function} onBookmarkChange - Bookmark toggle handler
 * @param {function} onArchive - Archive handler
 * @param {function} onCtaClick - CTA button click handler
 * @param {function} onClick - Card click handler (navigate to detail)
 */
const FeedItemSummaryCard = ({
  id,
  type,
  tags,
  title,
  summary,
  ctaLabel,
  isBookmarked = false,
  isArchived = false,
  onBookmarkChange,
  onArchive,
  onCtaClick,
  onClick
}) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  // Sync bookmark state with prop
  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const handleBookmark = (e) => {
    e.stopPropagation(); // Prevent card click
    const newBookmarkedState = !bookmarked;
    setBookmarked(newBookmarkedState);
    
    if (onBookmarkChange) {
      onBookmarkChange(id, newBookmarkedState);
    }
  };

  const handleArchive = (e) => {
    e.stopPropagation(); // Prevent card click
    if (onArchive) {
      onArchive(id);
    }
  };

  const handleCtaClick = (e) => {
    e.stopPropagation(); // Prevent card click
    if (onCtaClick) {
      onCtaClick(id, ctaLabel);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      className={styles.summaryCard}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details: ${title}`}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.headerActions}>
          <button
            className={`btn btn-ghost btn-icon-only ${bookmarked ? styles.active : ''}`}
            onClick={handleBookmark}
            aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            {bookmarked ? (
              <BookmarkOutlinedIcon sx={{ fontSize: 20 }} />
            ) : (
              <BookmarkBorderOutlinedIcon sx={{ fontSize: 20 }} />
            )}
          </button>

          <button
            className="btn btn-ghost btn-icon-only"
            onClick={handleArchive}
            aria-label="Archive this item"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      </div>

        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <Tag key={index} label={tag.label} variant={tag.variant} size="sm" />
          ))}
        </div>
        

      <p className={styles.summary}>{summary}</p>

      {ctaLabel && (
        <div className={styles.actions}>
          <button
            className="btn btn-primary"
            onClick={handleCtaClick}
            aria-label={ctaLabel}
          >
            {ctaLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedItemSummaryCard;
