import CompanyLogo from '../FeedElements/CompanyLogo';
import styles from './DetailComponents.module.css';

const MeetingDetail = ({ content }) => {
  const {
    company,
    attendeeCount,
    timeUntil,
    description,
    attendees,
    agenda,
    meetingNotes,
    preparationTips,
    relatedDocuments,
    meetingHistory
  } = content;

  return (
    <div className={styles.detailContainer}>
      {/* Company Info */}
      <div className={styles.section}>
        <div className={styles.companyHeader}>
          <CompanyLogo name={company.name} logo={company.logo} size="large" />
          <div>
            <h2 className={styles.companyName}>{company.name}</h2>
            <p className={styles.meetingMeta}>{attendeeCount} attendees • {timeUntil}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Meeting Overview</h3>
          <p className={styles.description}>{description}</p>
        </div>
      )}

      {/* Attendees */}
      {attendees && attendees.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Attendees</h3>
          <div className={styles.attendeeList}>
            {attendees.map((attendee, index) => (
              <div key={index} className={styles.attendeeCard}>
                <span className={styles.attendeeName}>{attendee.name}</span>
                <span className={styles.attendeeRole}>{attendee.role}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Agenda */}
      {agenda && agenda.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Agenda</h3>
          <ul className={styles.list}>
            {agenda.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Preparation Tips */}
      {preparationTips && preparationTips.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Preparation Tips</h3>
          <ul className={styles.list}>
            {preparationTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Meeting Notes */}
      {meetingNotes && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Context from Previous Meetings</h3>
          <p className={styles.notes}>{meetingNotes}</p>
        </div>
      )}

      {/* Related Documents */}
      {relatedDocuments && relatedDocuments.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Related Documents</h3>
          <div className={styles.documentList}>
            {relatedDocuments.map((doc, index) => (
              <a key={index} href={doc.url} className={styles.documentLink}>
                {doc.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Meeting History */}
      {meetingHistory && meetingHistory.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Meeting History</h3>
          <div className={styles.historyList}>
            {meetingHistory.map((meeting, index) => (
              <div key={index} className={styles.historyItem}>
                <span className={styles.historyDate}>{meeting.date}</span>
                <span className={styles.historyTopic}>{meeting.topic}</span>
                <span className={styles.historyOutcome}>{meeting.outcome}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingDetail;
