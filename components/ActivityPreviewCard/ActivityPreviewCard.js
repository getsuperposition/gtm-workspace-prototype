'use client';

import { useRouter } from 'next/navigation';
import { generatePreviewText, formatFeedTimestamp } from '@/utils/feedHelpers';
import Tag from '@/components/FeedElements/Tag';
import PreviewCard from '@/components/PreviewCard/PreviewCard';
import EventIcon from '@mui/icons-material/Event';
import LanguageIcon from '@mui/icons-material/Language';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import styles from './ActivityPreviewCard.module.css';

const ActivityPreviewCard = ({ 
  id, 
  type, 
  title, 
  timestamp, 
  content,
  tags 
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/feed/${id}`);
  };

  // Get icon based on feed type
  const getIcon = () => {
    switch (type) {
      case 'meeting':
        return <EventIcon sx={{ fontSize: 20 }} />;
      case 'website-visits':
        return <LanguageIcon sx={{ fontSize: 20 }} />;
      case 'upsell':
        return <TrendingUpIcon sx={{ fontSize: 20 }} />;
      case 'renewal':
        return <AutorenewIcon sx={{ fontSize: 20 }} />;
      case 'contact-departure':
        return <PersonOffIcon sx={{ fontSize: 20 }} />;
      default:
        return <EventIcon sx={{ fontSize: 20 }} />;
    }
  };

  const previewText = generatePreviewText(type, content);

  // Custom footer for activity cards
  const footer = (
    <>
      <div className={styles.tags}>
        {tags.slice(0, 2).map((tag, index) => (
          <Tag key={index} label={tag.label} variant={tag.variant} size="sm" />
        ))}
      </div>
      <span className={styles.timestamp}>
        {formatFeedTimestamp(timestamp)}
      </span>
    </>
  );

  return (
    <PreviewCard
      id={id}
      icon={getIcon()}
      title={title}
      preview={previewText}
      footer={footer}
      onClick={handleClick}
      ariaLabel={`View details: ${title}`}
    />
  );
};

export default ActivityPreviewCard;
