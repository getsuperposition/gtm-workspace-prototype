import CompanyLogo from '../../FeedElements/CompanyLogo';
import styles from './FeedPreviewCard.module.css';

const FeedPreviewCard = ({ type, content }) => {
  const renderPreview = () => {
    switch (type) {
      case 'meeting':
        return (
          <div className={styles.previewContent}>
            <div className={styles.previewHeader}>
              <CompanyLogo name={content.company.name} logo={content.company.logo} size="small" />
              <div className={styles.previewInfo}>
                <span className={styles.companyName}>{content.company.name}</span>
                <span className={styles.metaText}>{content.attendeeCount} attendees • {content.timeUntil}</span>
              </div>
            </div>
            <small className="m-0">{content.description.substring(0, 120)}...</small>
            <div className={styles.attendees}>
              {content.attendees.slice(0, 2).map((attendee, idx) => (
                <span key={idx} className={styles.attendee}>{attendee.name}</span>
              ))}
              {content.attendees.length > 2 && <span className={styles.more}>+{content.attendees.length - 2} more</span>}
            </div>
          </div>
        );

      case 'website-visits':
        return (
          <div className={styles.previewContent}>
            <div className={styles.companyLogos}>
              {content.companies.slice(0, 4).map((company, idx) => (
                <CompanyLogo key={idx} name={company.name} logo={company.logo} size="small" />
              ))}
            </div>
            <div className={styles.visitorInfo}>
              <span className={styles.label}>{content.visitors.length} visitor{content.visitors.length > 1 ? 's' : ''} tracked</span>
              {content.visitors.slice(0, 1).map((visitor, idx) => (
                <div key={idx} className={styles.visitor}>
                  <span className={styles.visitorName}>{visitor.name}</span>
                  <span className={styles.visitorRole}>{visitor.role}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'upsell':
        return (
          <div className={styles.previewContent}>
            <div className={styles.companyLogos}>
              {content.accounts.slice(0, 4).map((account, idx) => (
                <CompanyLogo key={idx} name={account.name} logo={account.logo} size="small" />
              ))}
            </div>
            <small className="m-0">{content.description}</small>
            <div className={styles.attendees}>
              {content.attendees.slice(0, 2).map((attendee, idx) => (
                <span key={idx} className={styles.attendee}>{attendee.name}</span>
              ))}
            </div>
          </div>
        );

      case 'renewal':
        return (
          <div className={styles.previewContent}>
            <div className={styles.previewHeader}>
              <CompanyLogo name={content.company.name} logo={content.company.logo} size="small" />
              <div className={styles.previewInfo}>
                <span className={styles.companyName}>{content.company.name}</span>
                <span className={styles.metaText}>{content.renewalType} • {content.value}</span>
              </div>
            </div>
            {content.risks.length > 0 && (
              <div className={styles.risks}>
                <span className={styles.riskLabel}>{content.risks.length} risk{content.risks.length > 1 ? 's' : ''} identified</span>
                <small className={`${styles.riskText} m-0`}>{content.risks[0].description}</small>
              </div>
            )}
            <span className={styles.creator}>Created by {content.createdBy}</span>
          </div>
        );

      case 'contact-departure':
        return (
          <div className={styles.previewContent}>
            <div className={styles.companyLogos}>
              {content.companies.slice(0, 4).map((company, idx) => (
                <CompanyLogo key={idx} name={company.name} logo={company.logo} size="small" />
              ))}
            </div>
            <small className="m-0">{content.accountCount} account{content.accountCount > 1 ? 's' : ''} with recent departures</small>
          </div>
        );

      default:
        return <div className={styles.previewContent}>Preview not available</div>;
    }
  };

  return (
    <div className={styles.previewCard}>
      {renderPreview()}
    </div>
  );
};

export default FeedPreviewCard;
