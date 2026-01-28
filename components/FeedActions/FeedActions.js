'use client';

import SourceIndicator from '../FeedElements/SourceIndicator';
import FeedActionButton from '../FeedElements/FeedActionButton';
import styles from './FeedActions.module.css';

const FeedActions = ({ sources, ctaLabel, onCtaClick }) => {
  return (
    <div className={styles.actionsContainer}>
      <div className={styles.leftActions}>
        <SourceIndicator count={sources} />
      </div>

      <div className={styles.rightActions}>
        <FeedActionButton label={ctaLabel} onClick={onCtaClick} />
      </div>
    </div>
  );
};

export default FeedActions;
