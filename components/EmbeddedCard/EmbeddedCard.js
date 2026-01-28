'use client';

import styles from './EmbeddedCard.module.css';

/**
 * @typedef {'view' | 'meeting' | 'document'} EmbeddedCardType
 *
 * @typedef {Object} EmbeddedCardProps
 * @property {EmbeddedCardType} type
 * @property {string} title
 * @property {string} [subtitle]
 * @property {React.ReactNode} [metadata]
 * @property {boolean} [showChevron=true]
 * @property {() => void} [onClick]
 */

const iconMap = {
  view: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  meeting: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 7H18" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 1V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 1V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  document: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 1H5C4.44772 1 4 1.44772 4 2V18C4 18.5523 4.44772 19 5 19H15C15.5523 19 16 18.5523 16 18V6L11 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 1V6H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

const chevronIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function EmbeddedCard({
  type,
  title,
  subtitle,
  metadata,
  showChevron = true,
  onClick,
}) {
  const isClickable = !!onClick;

  const classNames = [
    styles.embeddedCard,
    isClickable && styles.clickable,
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `Open ${title}` : undefined}
    >
      <div className={styles.iconWrapper}>
        {iconMap[type]}
      </div>

      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        {(subtitle || metadata) && (
          <div className={styles.meta}>
            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
            {metadata}
          </div>
        )}
      </div>

      {showChevron && (
        <div className={styles.chevron}>
          {chevronIcon}
        </div>
      )}
    </div>
  );
}
