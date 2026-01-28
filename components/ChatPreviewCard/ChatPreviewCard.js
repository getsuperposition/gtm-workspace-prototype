'use client';

import { useRouter } from 'next/navigation';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BusinessIcon from '@mui/icons-material/Business';
import { formatRelativeTime, getFirstSentence } from '@/utils/chatHelpers';
import PreviewCard from '@/components/PreviewCard/PreviewCard';
import styles from './ChatPreviewCard.module.css';

const ChatPreviewCard = ({ 
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

  // Custom footer for chat cards
  const footer = (
    <div className={styles.metaInfo}>
      {companyDisplay && (
        <div className={styles.companyInfo}>
          <BusinessIcon sx={{ fontSize: 12 }} />
          <span className={styles.companyText}>{companyDisplay}</span>
        </div>
      )}
      <span className={styles.timestamp}>
        {formatRelativeTime(updatedAt)}
      </span>
    </div>
  );

  return (
    <PreviewCard
      id={id}
      icon={<ChatBubbleOutlineIcon sx={{ fontSize: 20 }} />}
      title={title}
      preview={preview}
      footer={footer}
      onClick={handleClick}
      ariaLabel={`Open chat: ${title}`}
    />
  );
};

export default ChatPreviewCard;
