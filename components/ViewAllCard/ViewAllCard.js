'use client';

import { useRouter } from 'next/navigation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from './ViewAllCard.module.css';

const ViewAllCard = ({ label, href, icon: Icon }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={styles.viewAllCard}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={label}
    >
      <div className={styles.content}>
        {Icon && <Icon sx={{ fontSize: 32 }} />}
        <span className={styles.label}>{label}</span>
        <ArrowForwardIcon sx={{ fontSize: 20 }} className={styles.arrow} />
      </div>
    </div>
  );
};

export default ViewAllCard;
