import CompanyLogo from '../../FeedElements/CompanyLogo';
import styles from './ContentTypes.module.css';

const MeetingBrief = ({ data }) => {
  const { company, attendeeCount, timeUntil, description, attendees } = data;

  return (
    <div className={styles.contentContainer}>
      <div className={styles.meetingHeader}>
        <CompanyLogo name={company.name} logo={company.logo} size="medium" />
        <div className={styles.meetingInfo}>
          <h5 className="m-0">{company.name}</h5>
          <div className={styles.meetingMeta}>
            <span>{attendeeCount} attendees</span>
            <span className={styles.separator}>|</span>
            <span>{timeUntil}</span>
          </div>
        </div>
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

export default MeetingBrief;
