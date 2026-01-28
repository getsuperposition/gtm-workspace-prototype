'use client';

import DescriptionIcon from '@mui/icons-material/Description';
import TableChartIcon from '@mui/icons-material/TableChart';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import EventNoteIcon from '@mui/icons-material/EventNote';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styles from './ArtifactCard.module.css';

const ARTIFACT_ICONS = {
  document: DescriptionIcon,
  meetingBrief: EventNoteIcon,
  emailDraft: EmailIcon,
  accountBrief: BusinessIcon,
  table: TableChartIcon,
};

const ARTIFACT_LABELS = {
  document: 'Document',
  meetingBrief: 'Meeting Brief',
  emailDraft: 'Email Draft',
  accountBrief: 'Account Brief',
  table: 'Table',
};

/**
 * Generate a preview snippet from artifact content
 */
function getContentPreview(artifact) {
  const { type, content } = artifact;
  if (!content) return null;

  switch (type) {
    case 'emailDraft':
      return content.subject || content.body?.substring(0, 100);

    case 'meetingBrief':
      if (content.meetingContext) {
        return content.meetingContext.substring(0, 100);
      }
      if (content.strategicFocusAreas?.length > 0) {
        return content.strategicFocusAreas.slice(0, 2).join(' • ');
      }
      return null;

    case 'accountBrief':
      if (content.overview) {
        return content.overview.substring(0, 100);
      }
      if (content.companyName) {
        return `${content.companyName}${content.industry ? ` — ${content.industry}` : ''}`;
      }
      return null;

    case 'table':
      if (content.rows?.length > 0 && content.columns?.length > 0) {
        return `${content.rows.length} rows × ${content.columns.length} columns`;
      }
      return content.description || null;

    case 'document':
      if (content.sections?.length > 0) {
        return content.sections[0].content?.substring(0, 100);
      }
      return content.summary || null;

    default:
      return null;
  }
}

/**
 * Get key stats for artifact types
 */
function getArtifactStats(artifact) {
  const { type, content } = artifact;
  if (!content) return null;

  switch (type) {
    case 'emailDraft':
      const recipientCount = content.recipients?.length || 0;
      return recipientCount > 0 ? `${recipientCount} recipient${recipientCount !== 1 ? 's' : ''}` : null;

    case 'meetingBrief':
      const attendeeCount = content.attendees?.length || 0;
      return attendeeCount > 0 ? `${attendeeCount} attendee${attendeeCount !== 1 ? 's' : ''}` : null;

    case 'accountBrief':
      const metricCount = content.keyMetrics?.length || 0;
      return metricCount > 0 ? `${metricCount} metric${metricCount !== 1 ? 's' : ''}` : null;

    case 'table':
      return content.rows?.length ? `${content.rows.length} row${content.rows.length !== 1 ? 's' : ''}` : null;

    case 'document':
      const sectionCount = content.sections?.length || 0;
      return sectionCount > 0 ? `${sectionCount} section${sectionCount !== 1 ? 's' : ''}` : null;

    default:
      return null;
  }
}

const ArtifactCard = ({ artifact, onClick, isActive = false, showPreview = true }) => {
  const {
    type = 'document',
    title,
    description,
    version,
    progress,
    status = 'complete',
  } = artifact;

  const IconComponent = ARTIFACT_ICONS[type] || DescriptionIcon;
  const typeLabel = ARTIFACT_LABELS[type] || 'Document';
  const isProcessing = status === 'processing' || (progress !== undefined && progress < 100);
  const preview = showPreview ? getContentPreview(artifact) : null;
  const stats = getArtifactStats(artifact);

  const handleClick = () => {
    if (onClick && !isProcessing) {
      onClick(artifact);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick && !isProcessing) {
      e.preventDefault();
      onClick(artifact);
    }
  };

  return (
    <div
      className={`${styles.card} ${isProcessing ? styles.processing : ''} ${isActive ? styles.active : ''} ${onClick ? styles.clickable : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Open ${title}` : undefined}
    >
      {/* Icon */}
      <div className={styles.icon}>
        <IconComponent sx={{ fontSize: 20 }} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          {version && (
            <span className={styles.version}>v{version}</span>
          )}
        </div>

        {/* Type label and stats */}
        <div className={styles.meta}>
          <span className={styles.typeLabel}>{typeLabel}</span>
          {stats && (
            <>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.stats}>{stats}</span>
            </>
          )}
        </div>

        {/* Description or preview */}
        {(description || preview) && (
          <p className={styles.preview}>
            {description || preview}
            {(description || preview)?.length >= 100 && '…'}
          </p>
        )}

        {/* Progress bar */}
        {isProcessing && progress !== undefined && (
          <div className={styles.progressWrapper}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* View action */}
      {onClick && !isProcessing && (
        <div className={styles.viewAction}>
          <OpenInNewIcon sx={{ fontSize: 16 }} />
        </div>
      )}
    </div>
  );
};

export default ArtifactCard;
