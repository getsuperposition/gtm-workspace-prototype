import styles from './SourceIndicator.module.css';

const SourceIndicator = ({ count }) => {
  return (
    <div className={styles.sourceIndicator}>
      <div className={styles.iconStack}>
        <div className={`${styles.icon} ${styles.icon1}`} />
        <div className={`${styles.icon} ${styles.icon2}`} />
      </div>
      <span className={styles.count}>{count} {count === 1 ? 'source' : 'sources'}</span>
    </div>
  );
};

export default SourceIndicator;
