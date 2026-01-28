import CompanyLogo from '../../FeedElements/CompanyLogo';
import styles from './ContentTypes.module.css';

const ContactDepartures = ({ data }) => {
  const { companies, accountCount } = data;

  return (
    <div className={styles.contentContainer}>
      <div className={styles.companyLogosRow}>
        {companies.map((company, index) => (
          <CompanyLogo key={index} name={company.name} logo={company.logo} size="small" />
        ))}
        {accountCount > companies.length && (
          <div className={styles.moreCount}>+{accountCount - companies.length} more</div>
        )}
      </div>

      <p className={styles.accountSummary}>
        {accountCount} accounts with recent departures
      </p>
    </div>
  );
};

export default ContactDepartures;
