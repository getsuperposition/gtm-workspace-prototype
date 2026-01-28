import { formatFeedTimestamp } from '@/utils/feedHelpers';
import Tag from '@/components/FeedElements/Tag';
import SourceIndicator from '@/components/FeedElements/SourceIndicator';
import FeedActionButton from '@/components/FeedElements/FeedActionButton';
import MeetingDetail from './MeetingDetail';
import WebsiteVisitsDetail from './WebsiteVisitsDetail';
import UpsellDetail from './UpsellDetail';
import RenewalDetail from './RenewalDetail';
import ContactDepartureDetail from './ContactDepartureDetail';
import styles from './FeedDetail.module.css';

const FeedDetail = ({ feedItem }) => {
  const { id, type, title, timestamp, tags, content, sources, ctaLabel } = feedItem;

  // Render type-specific detail component
  const renderDetailContent = () => {
    switch (type) {
      case 'meeting':
        return <MeetingDetail content={content} />;
      case 'website-visits':
        return <WebsiteVisitsDetail content={content} />;
      case 'upsell':
        return <UpsellDetail content={content} />;
      case 'renewal':
        return <RenewalDetail content={content} />;
      case 'contact-departure':
        return <ContactDepartureDetail content={content} />;
      default:
        return <div>Detail view not available for this feed type.</div>;
    }
  };

  return (
    <div className={styles.feedDetail}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.metadata}>
            <span className={styles.timestamp}>{formatFeedTimestamp(timestamp)}</span>
            {sources && <SourceIndicator count={sources} />}
          </div>
        </div>
        
        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <Tag key={index} label={tag.label} variant={tag.variant} />
            ))}
          </div>
        )}
      </div>

      <div className={styles.content}>
        {renderDetailContent()}
      </div>

      {ctaLabel && (
        <div className={styles.actions}>
          <FeedActionButton label={ctaLabel} />
        </div>
      )}
    </div>
  );
};

export default FeedDetail;
