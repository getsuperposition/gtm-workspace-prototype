import CompanyLogo from '../../FeedElements/CompanyLogo';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import styles from './ContentTypes.module.css';

const Renewals = ({ data }) => {
  const { company, renewalType, value, risks, createdBy } = data;

  return (
    <div className={styles.contentContainer}>
      <div className={styles.renewalHeader}>
        <CompanyLogo name={company.name} logo={company.logo} size="medium" />
        <div className={styles.renewalInfo}>
          <h5 className="m-0">{company.name}</h5>
          <div className={styles.renewalMeta}>
            <span>{renewalType}</span>
            <span className={styles.separator}>|</span>
            <span className={styles.value}>{value}</span>
          </div>
        </div>
      </div>

      <div className={styles.risksSection}>
        {risks.map((risk, index) => (
          <div key={index} className={styles.riskItem}>
            <WarningAmberOutlinedIcon 
              sx={{ fontSize: 18, color: '#DC2626' }} 
              className={styles.riskIcon}
            />
            <span className={styles.riskText}>{risk.description}</span>
          </div>
        ))}
      </div>

      <div className={styles.createdBy}>
        <span className={styles.label}>Created by:</span>
        <span className={styles.creator}>{createdBy}</span>
      </div>
    </div>
  );
};

export default Renewals;
