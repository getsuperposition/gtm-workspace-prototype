import CompanyLogo from '../../FeedElements/CompanyLogo';
import styles from './ContentTypes.module.css';

const WebsiteVisits = ({ data }) => {
  const { companies, visitors } = data;

  return (
    <div className={styles.contentContainer}>
      <div className={styles.companyGrid}>
        {companies.map((company, index) => (
          <div key={index} className={styles.companyCard}>
            <CompanyLogo name={company.name} logo={company.logo} size="medium" />
            <span className={styles.companyName}>{company.name}</span>
          </div>
        ))}
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Website visitors</th>
              <th>Buying influence</th>
              <th>Visits</th>
              <th>Top pages</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor, index) => (
              <tr key={index}>
                <td>
                  <div className={styles.visitorInfo}>
                    <span className={styles.visitorName}>{visitor.name}</span>
                    <span className={styles.visitorRole}>{visitor.role}</span>
                  </div>
                </td>
                <td>
                  <span className={styles.influenceBadge}>{visitor.influence}</span>
                </td>
                <td>{visitor.visits} visits</td>
                <td className={styles.pagesList}>
                  {visitor.topPages.map((page, idx) => (
                    <div key={idx} className={styles.pagePath}>{page}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WebsiteVisits;
