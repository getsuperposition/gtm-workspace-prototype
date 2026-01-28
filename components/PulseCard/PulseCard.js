'use client';

import { useState, useEffect, useRef } from 'react';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DismissReasonPicker from '@/components/DismissReasonPicker';

// Content type components
import AssignedViewContent from './content-types/AssignedViewContent';
import MeetingPrepContent from './content-types/MeetingPrepContent';
import WebsiteVisitsContent from './content-types/WebsiteVisitsContent';
import KeyPromotionsContent from './content-types/KeyPromotionsContent';
import NewHireContent from './content-types/NewHireContent';

import styles from './PulseCard.module.css';

/**
 * PulseCard - New pulse card component matching the redesigned feed
 *
 * Card types:
 * - assigned-view: View assignment notification
 * - meeting-prep: Upcoming meeting with prep action
 * - website-visits: Visitor activity table
 * - key-promotions: Contact title change notifications
 * - new-hire: New executive hire alert
 */

function formatRelativeTime(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export default function PulseCard({
  id,
  type,
  title,
  timestamp,
  content,
  isBookmarked = false,
  onBookmarkChange,
  onArchive,
  onClick,
}) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [showDismissPicker, setShowDismissPicker] = useState(false);
  const dismissButtonRef = useRef(null);

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const handleBookmark = (e) => {
    e.stopPropagation();
    const newState = !bookmarked;
    setBookmarked(newState);
    onBookmarkChange?.(id, newState);
  };

  const handleDismissClick = (e) => {
    e.stopPropagation();
    setShowDismissPicker(true);
  };

  const handleDismissReasonSelect = (reason) => {
    console.log('Dismissed pulse:', id, 'Reason:', reason.label);
    setShowDismissPicker(false);
    onArchive?.(id, reason);
  };

  const handleCardClick = () => {
    onClick?.(id);
  };

  const renderContent = () => {
    switch (type) {
      case 'assigned-view':
        return <AssignedViewContent data={content} pulseId={id} />;
      case 'meeting-prep':
      case 'meeting':
        return <MeetingPrepContent data={content} pulseId={id} pulseTitle={title} />;
      case 'website-visits':
        return <WebsiteVisitsContent data={content} pulseId={id} pulseTitle={title} />;
      case 'key-promotions':
        return <KeyPromotionsContent data={content} pulseId={id} pulseTitle={title} />;
      case 'new-hire':
        return <NewHireContent data={content} pulseId={id} pulseTitle={title} />;
      default:
        return <div className={styles.unknownType}>Unknown pulse type: {type}</div>;
    }
  };

  return (
    <article className={styles.pulseCard}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.timestamp}>{formatRelativeTime(timestamp)}</span>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.actionButton} ${bookmarked ? styles.bookmarked : ''}`}
            onClick={handleBookmark}
            aria-label={bookmarked ? 'Remove from saved' : 'Save pulse'}
          >
            {bookmarked ? (
              <BookmarkOutlinedIcon sx={{ fontSize: 18 }} />
            ) : (
              <BookmarkBorderOutlinedIcon sx={{ fontSize: 18 }} />
            )}
          </button>
          <div className={styles.dismissWrapper}>
            <button
              ref={dismissButtonRef}
              type="button"
              className={styles.actionButton}
              onClick={handleDismissClick}
              aria-label="Dismiss pulse"
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </button>
            <DismissReasonPicker
              isOpen={showDismissPicker}
              onClose={() => setShowDismissPicker(false)}
              onSelect={handleDismissReasonSelect}
              triggerRef={dismissButtonRef}
              position="bottom-right"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className={styles.content}>
        {renderContent()}
      </div>
    </article>
  );
}
