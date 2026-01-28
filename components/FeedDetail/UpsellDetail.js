import CompanyLogo from '../FeedElements/CompanyLogo';
import styles from './DetailComponents.module.css';

const UpsellDetail = ({ content }) => {
  const {
    accounts,
    accountCount,
    description,
    currentTier,
    proposedTier,
    revenueImpact,
    usageMetrics,
    expansionDrivers,
    timeline,
    accountBreakdown
  } = content;

  return (
    <div className={styles.detailContainer}>
      {/* Overview */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Opportunity Overview</h3>
        <p className={styles.description}>{description}</p>
      </div>

      {/* Accounts */}
      {accounts && accounts.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Target Accounts</h3>
          <div className={styles.companyLogos}>
            {accounts.map((account, index) => (
              <div key={index} className={styles.companyItem}>
                <CompanyLogo name={account.name} logo={account.logo} size="medium" />
                <span className={styles.companyLabel}>{account.name}</span>
              </div>
            ))}
            {accountCount > accounts.length && (
              <span className={styles.moreAccounts}>+{accountCount - accounts.length} more</span>
            )}
          </div>
        </div>
      )}

      {/* Tier Upgrade */}
      {currentTier && proposedTier && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Proposed Upgrade</h3>
          <div className={styles.tierComparison}>
            <div className={styles.tierBox}>
              <span className={styles.tierLabel}>Current</span>
              <span className={styles.tierName}>{currentTier}</span>
            </div>
            <span className={styles.tierArrow}>→</span>
            <div className={styles.tierBox}>
              <span className={styles.tierLabel}>Proposed</span>
              <span className={styles.tierName}>{proposedTier}</span>
            </div>
          </div>
        </div>
      )}

      {/* Revenue Impact */}
      {revenueImpact && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Revenue Impact</h3>
          <div className={styles.revenueCard}>
            <span className={styles.revenueValue}>{revenueImpact}</span>
          </div>
        </div>
      )}

      {/* Usage Metrics */}
      {usageMetrics && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Current Usage Metrics</h3>
          <div className={styles.metricsGrid}>
            {Object.entries(usageMetrics).map(([key, value]) => (
              <div key={key} className={styles.metricCard}>
                <span className={styles.metricLabel}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className={styles.metricValue}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expansion Drivers */}
      {expansionDrivers && expansionDrivers.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Expansion Drivers</h3>
          <ul className={styles.list}>
            {expansionDrivers.map((driver, index) => (
              <li key={index}>{driver}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Timeline */}
      {timeline && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Recommended Timeline</h3>
          <div className={styles.timelinePhases}>
            {Object.entries(timeline).map(([phase, description]) => (
              <div key={phase} className={styles.phaseCard}>
                <span className={styles.phaseName}>{phase.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className={styles.phaseDescription}>{description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Account Breakdown */}
      {accountBreakdown && accountBreakdown.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Account Breakdown</h3>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Account</span>
              <span>Potential</span>
              <span>Confidence</span>
              <span>Timeline</span>
            </div>
            {accountBreakdown.map((account, index) => (
              <div key={index} className={styles.tableRow}>
                <span>{account.name}</span>
                <span className={styles.potential}>{account.potential}</span>
                <span className={`${styles.confidence} ${styles[`confidence${account.confidence}`]}`}>
                  {account.confidence}
                </span>
                <span>{account.timeline}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpsellDetail;
