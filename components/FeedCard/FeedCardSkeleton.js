import styles from './FeedCardSkeleton.module.css';

const FeedCardSkeleton = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.cardHeader}>
        <div className={styles.tags}>
          <div className={styles.skeletonTag}></div>
          <div className={styles.skeletonTag}></div>
          <div className={styles.skeletonTag}></div>
        </div>
        <div className={styles.skeletonClose}></div>
      </div>

      <div className={styles.skeletonTitle}></div>

      <div className={styles.instanceSlot}>
        <div className={styles.skeletonContent}>
          <div className={styles.skeletonLine}></div>
          <div className={styles.skeletonLine}></div>
          <div className={styles.skeletonLine} style={{ width: '70%' }}></div>
        </div>
      </div>

      <div className={styles.actionsBar}>
        <div className={styles.leftActions}>
          <div className={styles.skeletonIcon}></div>
          <div className={styles.skeletonIcon}></div>
          <div className={styles.skeletonIcon}></div>
          <div className={styles.skeletonSource}></div>
        </div>
        <div className={styles.skeletonButton}></div>
      </div>
    </div>
  );
};

export default FeedCardSkeleton;
