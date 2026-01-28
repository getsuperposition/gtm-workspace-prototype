'use client';

import EmbeddedCard from '@/components/EmbeddedCard';
import ActionButton from '@/components/ActionButton';
import Tag from '@/components/FeedElements/Tag';
import { getCompanyLogo } from '@/utils/companyLogos';
import styles from './ContentTypes.module.css';

/**
 * MeetingPrepContent - Meeting preparation card
 * Design: Account metadata + embedded meeting card + action button
 */
export default function MeetingPrepContent({ data, pulseId, pulseTitle }) {
  const {
    company,
    meeting,
    description,
    value,
    stage,
    recency,
    attendeeCount,
    timeUntil,
  } = data;

  // Get logo from utility if not provided
  const companyLogo = company?.logo || getCompanyLogo(company?.name);

  // Support both old and new data structures
  const meetingTitle = meeting?.name || `Meeting with ${company?.name}`;
  const meetingTime = meeting?.time || timeUntil;
  const meetingAttendees = meeting?.attendeeCount || attendeeCount;

  const handleMeetingClick = () => {
    console.log('Navigate to meeting:', meeting?.id);
  };

  return (
    <div className={styles.meetingPrep}>
      {/* Account metadata row */}
      <div className={styles.accountMeta}>
        {companyLogo ? (
          <img src={companyLogo} alt="" className={styles.companyLogo} />
        ) : (
          <div className={styles.companyLogoPlaceholder}>
            {company?.name?.charAt(0) || '?'}
          </div>
        )}
        <span className={styles.companyName}>{company?.name}</span>
        {value && <Tag label={value} variant="default" size="sm" />}
        {stage && <Tag label={stage} variant="default" size="sm" />}
        {recency && <span className={styles.recency}>{recency}</span>}
      </div>

      {/* Embedded meeting card */}
      <EmbeddedCard
        type="meeting"
        title={meetingTitle}
        metadata={
          <span className={styles.meetingMeta}>
            {meetingTime} · {meetingAttendees} Attendees
          </span>
        }
        onClick={handleMeetingClick}
      />

      {/* Description */}
      {description && (
        <p className={styles.description}>{description}</p>
      )}

      {/* Action button */}
      <div className={styles.actionRow}>
        <ActionButton
          taskType="meetingBrief"
          label="Create Meeting Brief"
          processingLabel="Creating Meeting Brief"
          viewLabel="View Meeting Brief"
          sourceId={pulseId}
          sourceTitle={pulseTitle}
          taskTitle={`${meetingTitle} - Meeting Brief`}
          accountName={company?.name}
          accountLogo={companyLogo}
        />
      </div>
    </div>
  );
}
