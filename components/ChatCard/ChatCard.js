'use client';

import { useRouter } from 'next/navigation';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BusinessIcon from '@mui/icons-material/Business';
import { formatRelativeTime, getFirstSentence } from '@/utils/chatHelpers';
import Icon from '@/components/Icon/Icon';
import styles from './ChatCard.module.css';

const ChatCard = ({ 
  id, 
  title, 
  firstMessage, 
  updatedAt, 
  companies, 
  companyCount 
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/chats/${id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Get company display text
  const getCompanyDisplay = () => {
    if (!companies || companies.length === 0) {
      return null;
    }

    if (companyCount && companyCount > 1) {
      return `${companyCount} companies`;
    }

    return companies[0].name;
  };

  const companyDisplay = getCompanyDisplay();
  const preview = firstMessage ? getFirstSentence(firstMessage) : '';

  return (
    <div
      className={styles.chatCard}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open chat: ${title}`}
    >
      <div className={styles.cardHeader}>
        <Icon size="md">
          <ChatBubbleOutlineIcon sx={{ fontSize: 20 }} />
        </Icon>
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{title}</h3>
          {preview && (
            <p className={styles.cardPreview}>{preview}</p>
          )}
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.metaInfo}>
          {companyDisplay && (
            <div className={styles.companyInfo}>
              <BusinessIcon sx={{ fontSize: 14 }} />
              <span className={styles.companyText}>{companyDisplay}</span>
            </div>
          )}
          <span className={styles.timestamp}>
            {formatRelativeTime(updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
