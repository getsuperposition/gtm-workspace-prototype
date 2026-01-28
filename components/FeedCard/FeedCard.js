'use client';

import { useState, useEffect } from 'react';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CloseIcon from '@mui/icons-material/Close';
import UndoIcon from '@mui/icons-material/Undo';
import Tag from '../FeedElements/Tag';
import FeedActions from '../FeedActions/FeedActions';
import ArchivedCardView from './ArchivedCardView';
import MeetingBrief from './content-types/MeetingBrief';
import WebsiteVisits from './content-types/WebsiteVisits';
import UpsellAcceleration from './content-types/UpsellAcceleration';
import Renewals from './content-types/Renewals';
import ContactDepartures from './content-types/ContactDepartures';
import styles from './FeedCard.module.css';

const FeedCard = ({
  id,
  type,
  tags,
  title,
  content,
  sources,
  ctaLabel,
  onClose,
  // New props for archive functionality
  currentTab = 'latest',
  isArchived = false,
  isBookmarked = false,
  showLessRequested = false,
  onArchive,
  onUnarchive,
  onShowLess,
  onBookmarkChange
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // Sync bookmark state with prop
  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const handleBookmark = () => {
    const newBookmarkedState = !bookmarked;
    setBookmarked(newBookmarkedState);
    
    // Call parent callback if provided
    if (onBookmarkChange) {
      onBookmarkChange(id, newBookmarkedState);
    } else {
      console.log('Bookmark toggled:', newBookmarkedState);
    }
  };

  const handleArchive = () => {
    if (onArchive) {
      onArchive(id);
    }
  };

  const handleUnarchive = () => {
    if (onUnarchive) {
      onUnarchive(id);
    }
  };

  const handleShowLess = () => {
    if (onShowLess) {
      onShowLess(id);
    }
  };

  const handleLike = () => {
    if (disliked) {
      setDisliked(false);
    }
    setLiked(!liked);
    console.log('Like toggled:', !liked);
  };

  const handleDislike = () => {
    if (liked) {
      setLiked(false);
    }
    setDisliked(!disliked);
    console.log('Dislike toggled:', !disliked);
  };

  const handleCtaClick = () => {
    console.log('CTA clicked:', ctaLabel, 'for card:', id);
  };

  const renderContent = () => {
    switch (type) {
      case 'meeting':
        return <MeetingBrief data={content} />;
      case 'website-visits':
        return <WebsiteVisits data={content} />;
      case 'upsell':
        return <UpsellAcceleration data={content} />;
      case 'renewal':
        return <Renewals data={content} />;
      case 'contact-departure':
        return <ContactDepartures data={content} />;
      default:
        return <div>Unknown content type</div>;
    }
  };

  if (!isVisible) {
    return null;
  }

  // Determine what to show based on archived state and current tab
  const showCollapsedArchiveView = isArchived && currentTab !== 'archived';
  const showFullContent = !isArchived || currentTab === 'archived';

  return (
    <div className={styles.feedCard}>
      {showCollapsedArchiveView ? (
        // Show collapsed "Feed item archived" view on Latest/Saved tabs
        <ArchivedCardView
          onUndo={handleUnarchive}
          onShowLess={handleShowLess}
          showLessRequested={showLessRequested}
        />
      ) : (
        // Show full card content (normal cards or archived cards on Archived tab)
        <>
          <div className={styles.cardHeader}>
            <div className={styles.headerContent}>
              <h4 className={styles.cardTitle}>{title}</h4>
              <div className={styles.tags}>
                {tags.map((tag, index) => (
                  <Tag key={index} label={tag.label} variant={tag.variant} size={tag.size || 'sm'} />
                ))}
              </div>
            </div>
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
                className={`btn btn-ghost btn-icon-only ${liked ? styles.activeLike : ''}`}
                onClick={handleLike}
                aria-label={liked ? 'Remove like' : 'Like'}
              >
                {liked ? (
                  <ThumbUpIcon sx={{ fontSize: 20 }} />
                ) : (
                  <ThumbUpOutlinedIcon sx={{ fontSize: 20 }} />
                )}
              </button>

              <button
                className={`btn btn-ghost btn-icon-only ${disliked ? styles.activeDislike : ''}`}
                onClick={handleDislike}
                aria-label={disliked ? 'Remove dislike' : 'Dislike'}
              >
                {disliked ? (
                  <ThumbDownIcon sx={{ fontSize: 20 }} />
                ) : (
                  <ThumbDownOutlinedIcon sx={{ fontSize: 20 }} />
                )}
              </button>

              {/* Show return arrow on Archived tab, X icon on other tabs */}
              {currentTab === 'archived' && isArchived ? (
                <button
                  className="btn btn-ghost btn-icon-only"
                  onClick={handleUnarchive}
                  aria-label="Restore this item"
                >
                  <UndoIcon sx={{ fontSize: 20 }} />
                </button>
              ) : (
                <button
                  className="btn btn-ghost btn-icon-only"
                  onClick={handleArchive}
                  aria-label="Archive this item"
                >
                  <CloseIcon sx={{ fontSize: 20 }} />
                </button>
              )}
            </div>
          </div>

          <div className={styles.instanceSlot}>
            {renderContent()}
          </div>

          <FeedActions
            sources={sources}
            ctaLabel={ctaLabel}
            onCtaClick={handleCtaClick}
          />
        </>
      )}
    </div>
  );
};

export default FeedCard;
