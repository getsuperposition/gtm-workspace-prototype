import CompanyLogo from '../FeedElements/CompanyLogo';
import styles from './DetailComponents.module.css';

const RenewalDetail = ({ content }) => {
  const {
    company,
    renewalType,
    value,
    risks,
    createdBy,
    contractDetails,
    healthScore,
    usageTrends,
    stakeholderMap,
    competitorThreats,
    successMetrics
  } = content;

  return (
    <div className={styles.detailContainer}>
      {/* Company Header */}
      <div className={styles.section}>
        <div className={styles.companyHeader}>
          <CompanyLogo name={company.name} logo={company.logo} size="large" />
          <div>
            <h2 className={styles.companyName}>{company.name}</h2>
            <p className={styles.renewalMeta}>{renewalType} • {value}</p>
          </div>
        </div>
      </div>

      {/* Health Score */}
      {healthScore !== undefined && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Account Health Score</h3>
          <div className={styles.healthScoreCard}>
            <div className={`${styles.healthScore} ${healthScore >= 80 ? styles.healthGood : healthScore >= 60 ? styles.healthMedium : styles.healthPoor}`}>
              {healthScore}/100
            </div>
            <div className={styles.healthLabel}>
              {healthScore >= 80 ? 'Healthy' : healthScore >= 60 ? 'At Risk' : 'Critical'}
            </div>
          </div>
        </div>
      )}

      {/* Contract Details */}
      {contractDetails && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Contract Details</h3>
          <div className={styles.contractGrid}>
            <div className={styles.contractItem}>
              <span className={styles.contractLabel}>Start Date</span>
              <span className={styles.contractValue}>{contractDetails.startDate}</span>
            </div>
            <div className={styles.contractItem}>
              <span className={styles.contractLabel}>End Date</span>
              <span className={styles.contractValue}>{contractDetails.endDate}</span>
            </div>
            <div className={styles.contractItem}>
              <span className={styles.contractLabel}>Days Until Renewal</span>
              <span className={styles.contractValue}>{contractDetails.daysUntilRenewal} days</span>
            </div>
            <div className={styles.contractItem}>
              <span className={styles.contractLabel}>Auto-Renew</span>
              <span className={styles.contractValue}>{contractDetails.autoRenew ? 'Yes' : 'No'}</span>
            </div>
          </div>
          <p className={styles.contractTerms}>{contractDetails.terms}</p>
        </div>
      )}

      {/* Risks */}
      {risks && risks.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Identified Risks</h3>
          <div className={styles.riskList}>
            {risks.map((risk, index) => (
              <div key={index} className={styles.riskCard}>
                {risk.description}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Usage Trends */}
      {usageTrends && usageTrends.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Usage Trends</h3>
          <div className={styles.trendList}>
            {usageTrends.map((trend, index) => (
              <div key={index} className={styles.trendItem}>
                <span className={styles.trendMonth}>{trend.month}</span>
                <span className={styles.trendUsers}>{trend.activeUsers} users</span>
                <span className={`${styles.trendScore} ${trend.score >= 80 ? styles.scoreGood : trend.score >= 60 ? styles.scoreMedium : styles.scorePoor}`}>
                  Score: {trend.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stakeholder Map */}
      {stakeholderMap && stakeholderMap.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Stakeholder Map</h3>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Name</span>
              <span>Role</span>
              <span>Relationship</span>
              <span>Influence</span>
            </div>
            {stakeholderMap.map((stakeholder, index) => (
              <div key={index} className={styles.tableRow}>
                <span>{stakeholder.name}</span>
                <span>{stakeholder.role}</span>
                <span className={`${styles.relationship} ${styles[`relationship${stakeholder.relationship}`]}`}>
                  {stakeholder.relationship}
                </span>
                <span>{stakeholder.influence}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Competitor Threats */}
      {competitorThreats && competitorThreats.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Competitor Threats</h3>
          <div className={styles.threatList}>
            {competitorThreats.map((threat, index) => (
              <div key={index} className={styles.threatCard}>
                <span className={styles.threatCompetitor}>{threat.competitor}</span>
                <span className={styles.threatActivity}>{threat.activity}</span>
                <span className={styles.threatDate}>{threat.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Metrics */}
      {successMetrics && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Success Metrics</h3>
          <div className={styles.metricsGrid}>
            {Object.entries(successMetrics).map(([key, value]) => (
              <div key={key} className={styles.metricCard}>
                <span className={styles.metricLabel}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className={styles.metricValue}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {createdBy && (
        <div className={styles.createdBy}>
          Created by {createdBy}
        </div>
      )}
    </div>
  );
};

export default RenewalDetail;
