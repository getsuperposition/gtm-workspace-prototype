import CompanyLogo from '../FeedElements/CompanyLogo';
import styles from './DetailComponents.module.css';

const WebsiteVisitsDetail = ({ content }) => {
  const {
    companies,
    visitors,
    intentScore,
    pageAnalytics,
    recommendedActions,
    competitorComparison,
    visitorTimeline
  } = content;

  return (
    <div className={styles.detailContainer}>
      {/* Companies */}
      {companies && companies.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Companies</h3>
          <div className={styles.companyLogos}>
            {companies.map((company, index) => (
              <div key={index} className={styles.companyItem}>
                <CompanyLogo name={company.name} logo={company.logo} size="medium" />
                <span className={styles.companyLabel}>{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Intent Score */}
      {intentScore && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Intent Score</h3>
          <div className={styles.scoreCard}>
            <div className={styles.scoreValue}>{intentScore}/100</div>
            <div className={styles.scoreLabel}>
              {intentScore >= 80 ? 'High Intent' : intentScore >= 60 ? 'Medium Intent' : 'Low Intent'}
            </div>
          </div>
        </div>
      )}

      {/* Visitors */}
      {visitors && visitors.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Key Visitors</h3>
          <div className={styles.visitorList}>
            {visitors.map((visitor, index) => (
              <div key={index} className={styles.visitorCard}>
                <div className={styles.visitorHeader}>
                  <span className={styles.visitorName}>{visitor.name}</span>
                  <span className={styles.visitorVisits}>{visitor.visits} visits</span>
                </div>
                <span className={styles.visitorRole}>{visitor.role}</span>
                <span className={styles.visitorInfluence}>{visitor.influence}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Page Analytics */}
      {pageAnalytics && pageAnalytics.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Page Analytics</h3>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Page</span>
              <span>Views</span>
              <span>Avg Time</span>
              <span>Visitors</span>
            </div>
            {pageAnalytics.map((page, index) => (
              <div key={index} className={styles.tableRow}>
                <span className={styles.pagePath}>{page.page}</span>
                <span>{page.views}</span>
                <span>{page.avgTime}</span>
                <span>{page.uniqueVisitors}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Actions */}
      {recommendedActions && recommendedActions.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Recommended Actions</h3>
          <ul className={styles.list}>
            {recommendedActions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Competitor Comparison */}
      {competitorComparison && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Competitor Activity</h3>
          <div className={styles.competitorInfo}>
            <p><strong>Competitor Sites Visited:</strong> {competitorComparison.competitorVisits.join(', ')}</p>
            <p><strong>Comparison Pages Viewed:</strong> {competitorComparison.comparisonPages.join(', ')}</p>
            <p><strong>Total Competitor Page Views:</strong> {competitorComparison.competitorPageViews}</p>
          </div>
        </div>
      )}

      {/* Visitor Timeline */}
      {visitorTimeline && visitorTimeline.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Activity Timeline</h3>
          <div className={styles.timeline}>
            {visitorTimeline.map((day, index) => (
              <div key={index} className={styles.timelineItem}>
                <span className={styles.timelineDate}>{day.date}</span>
                <span className={styles.timelineVisits}>{day.visits} visits</span>
                <span className={styles.timelinePages}>{day.pages} pages</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteVisitsDetail;
