'use client';

import EmbeddedCard from '@/components/EmbeddedCard';
import styles from './ContentTypes.module.css';

/**
 * AssignedViewContent - Shows view assignment notification
 * Design: Embedded view card with description
 */
export default function AssignedViewContent({ data, pulseId }) {
  const { view, description } = data;

  const handleViewClick = () => {
    // TODO: Navigate to view
    console.log('Navigate to view:', view.id);
  };

  return (
    <div className={styles.assignedView}>
      <EmbeddedCard
        type="view"
        title={view.name}
        subtitle={view.owner}
        metadata={
          <span className={styles.viewMeta}>
            {view.accountCount} Accounts · {view.contactCount} contacts
          </span>
        }
        onClick={handleViewClick}
      />

      {description && (
        <p className={styles.description}>{description}</p>
      )}
    </div>
  );
}
