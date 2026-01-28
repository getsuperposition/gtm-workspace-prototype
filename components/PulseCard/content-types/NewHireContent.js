'use client';

import ActionButton from '@/components/ActionButton';
import Tag from '@/components/FeedElements/Tag';
import { getCompanyLogo } from '@/utils/companyLogos';
import styles from './ContentTypes.module.css';

/**
 * NewHireContent - New executive/C-level hire alert
 * Design: Account metadata + narrative description + action button
 */
export default function NewHireContent({ data, pulseId, pulseTitle }) {
  const {
    company,
    value,
    stage,
    recency,
    hire,
    narrative,
    recommendation,
  } = data;

  // Get logo from utility if not provided
  const companyLogo = company?.logo || getCompanyLogo(company?.name);

  // Build narrative text
  const narrativeText = narrative || (hire && (
    `${hire.name} joined ${company?.name} as a new ${hire.role}. ${recommendation || ''}`
  ));

  return (
    <div className={styles.newHire}>
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

      {/* Narrative */}
      {narrativeText && (
        <div className={styles.narrative}>
          <p className={styles.narrativeText}>{narrativeText}</p>
          {hire?.background && (
            <p className={styles.backgroundText}>{hire.background}</p>
          )}
        </div>
      )}

      {/* Action button */}
      <div className={styles.actionRow}>
        <ActionButton
          taskType="emailDraft"
          label="Draft Email"
          processingLabel="Drafting Email"
          viewLabel="View Email"
          sourceId={pulseId}
          sourceTitle={pulseTitle}
          taskTitle={`Introduce to ${hire?.name || 'new hire'} at ${company?.name}`}
          accountName={company?.name}
          accountLogo={companyLogo}
        />
      </div>
    </div>
  );
}
