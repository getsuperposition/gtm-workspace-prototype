import CompanyLogo from '../FeedElements/CompanyLogo';
import styles from './DetailComponents.module.css';

const ContactDepartureDetail = ({ content }) => {
  const {
    companies,
    accountCount,
    departedContacts,
    replacementContacts,
    relationshipStrength,
    riskMitigation,
    accountImpact
  } = content;

  return (
    <div className={styles.detailContainer}>
      {/* Companies */}
      {companies && companies.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Affected Companies</h3>
          <div className={styles.companyLogos}>
            {companies.map((company, index) => (
              <div key={index} className={styles.companyItem}>
                <CompanyLogo name={company.name} logo={company.logo} size="medium" />
                <span className={styles.companyLabel}>{company.name}</span>
              </div>
            ))}
            {accountCount > companies.length && (
              <span className={styles.moreAccounts}>+{accountCount - companies.length} more</span>
            )}
          </div>
        </div>
      )}

      {/* Account Impact */}
      {accountImpact && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Impact Assessment</h3>
          <div className={styles.impactGrid}>
            <div className={styles.impactCard}>
              <span className={styles.impactLabel}>Total at Risk</span>
              <span className={styles.impactValue}>{accountImpact.totalAtRisk}</span>
            </div>
            <div className={styles.impactCard}>
              <span className={styles.impactLabel}>High Risk Accounts</span>
              <span className={styles.impactValue}>{accountImpact.highRiskAccounts}</span>
            </div>
            <div className={styles.impactCard}>
              <span className={styles.impactLabel}>Medium Risk Accounts</span>
              <span className={styles.impactValue}>{accountImpact.mediumRiskAccounts}</span>
            </div>
            <div className={styles.impactCard}>
              <span className={styles.impactLabel}>Immediate Action Required</span>
              <span className={styles.impactValue}>{accountImpact.immediateActionRequired}</span>
            </div>
          </div>
        </div>
      )}

      {/* Departed Contacts */}
      {departedContacts && departedContacts.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Departed Contacts</h3>
          <div className={styles.contactList}>
            {departedContacts.map((contact, index) => (
              <div key={index} className={styles.contactCard}>
                <div className={styles.contactHeader}>
                  <span className={styles.contactName}>{contact.name}</span>
                  <span className={`${styles.relationshipBadge} ${styles[`badge${contact.relationshipStrength.replace(' ', '')}`]}`}>
                    {contact.relationshipStrength}
                  </span>
                </div>
                <span className={styles.contactRole}>{contact.role}</span>
                <span className={styles.contactCompany}>{contact.company}</span>
                <div className={styles.contactMeta}>
                  <span>Departed: {contact.departureDate}</span>
                  <span>Account Value: {contact.accountValue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Replacement Contacts */}
      {replacementContacts && replacementContacts.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Replacement Contacts</h3>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Name</span>
              <span>Role</span>
              <span>Company</span>
              <span>Status</span>
              <span>Outreach</span>
            </div>
            {replacementContacts.map((contact, index) => (
              <div key={index} className={styles.tableRow}>
                <span>{contact.name}</span>
                <span>{contact.role}</span>
                <span>{contact.company}</span>
                <span className={`${styles.status} ${styles[`status${contact.status.replace(' ', '')}`]}`}>
                  {contact.status}
                </span>
                <span>{contact.outreachStatus}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Relationship Strength */}
      {relationshipStrength !== undefined && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Overall Relationship Strength</h3>
          <div className={styles.strengthCard}>
            <div className={`${styles.strengthScore} ${relationshipStrength >= 80 ? styles.strengthGood : relationshipStrength >= 60 ? styles.strengthMedium : styles.strengthPoor}`}>
              {relationshipStrength}/100
            </div>
            <div className={styles.strengthLabel}>
              {relationshipStrength >= 80 ? 'Strong' : relationshipStrength >= 60 ? 'Moderate' : 'Weak'}
            </div>
          </div>
        </div>
      )}

      {/* Risk Mitigation */}
      {riskMitigation && riskMitigation.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Risk Mitigation Strategies</h3>
          <ul className={styles.list}>
            {riskMitigation.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContactDepartureDetail;
