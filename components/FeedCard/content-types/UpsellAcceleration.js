import CompanyLogo from '../../FeedElements/CompanyLogo';
import styles from './ContentTypes.module.css';

const UpsellAcceleration = ({ data }) => {
  const { accounts, accountCount, description, attendees } = data;

  return (
    <div className={styles.contentContainer}>
      <p className="m-0">
        <span className={styles.summaryText}>{accounts.slice(0, 3).map(a => a.name).join(', ')}, +{accountCount - 3} accounts</span>
      </p>

      <div className={styles.companyLogosRow}>
        {accounts.map((account, index) => (
          <CompanyLogo key={index} name={account.name} logo={account.logo} size="small" />
        ))}
        {accountCount > accounts.length && (
          <div className={styles.moreCount}>+{accountCount - accounts.length} more</div>
        )}
      </div>

      <p className="m-0">{description}</p>

      <div className={styles.attendeesSection}>
        <h4 className={styles.sectionTitle}>ATTENDEES</h4>
        <div className={styles.attendeesList}>
          {attendees.map((attendee, index) => (
            <div key={index} className={styles.attendee}>
              <span className={styles.attendeeName}>{attendee.name}</span>
              <span className={styles.attendeeRole}>({attendee.role})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpsellAcceleration;
