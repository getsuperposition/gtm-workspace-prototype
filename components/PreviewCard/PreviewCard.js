'use client';

import Icon from '@/components/Icon/Icon';
import styles from './PreviewCard.module.css';

/**
 * PreviewCard - A reusable base component for preview cards
 * Used by ActivityPreviewCard and ChatPreviewCard
 * 
 * @param {string} id - Unique identifier for the card
 * @param {ReactNode} icon - Icon to display in the card header
 * @param {string} title - Card title
 * @param {string} preview - Preview text content
 * @param {ReactNode} footer - Custom footer content
 * @param {function} onClick - Click handler
 * @param {string} ariaLabel - Accessibility label
 */
const PreviewCard = ({ 
  id,
  icon,
  title,
  preview,
  footer,
  onClick,
  ariaLabel
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={styles.previewCard}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
    >
      <div className={styles.cardHeader}>
        <Icon size="sm">
          {icon}
        </Icon>
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{title}</h3>
          {preview && (
            <p className={styles.cardPreview}>{preview}</p>
          )}
        </div>
      </div>

      {footer && (
        <div className={styles.cardFooter}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default PreviewCard;
