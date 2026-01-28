'use client';

import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAIChat } from '@/contexts/AIChatContext';
import MeetingBriefArtifact from './artifacts/MeetingBriefArtifact';
import EmailDraftArtifact from './artifacts/EmailDraftArtifact';
import AccountBriefArtifact from './artifacts/AccountBriefArtifact';
import TableArtifact from './artifacts/TableArtifact';
import DocumentArtifact from './artifacts/DocumentArtifact';
import styles from './ArtifactCanvas.module.css';

const ARTIFACT_COMPONENTS = {
  meetingBrief: MeetingBriefArtifact,
  emailDraft: EmailDraftArtifact,
  accountBrief: AccountBriefArtifact,
  table: TableArtifact,
  document: DocumentArtifact,
};

const ARTIFACT_ICONS = {
  meetingBrief: '📋',
  emailDraft: '✉️',
  accountBrief: '🏢',
  table: '📊',
  document: '📄',
};

const ArtifactCanvas = () => {
  const { activeArtifact, closeArtifact, updateArtifact } = useAIChat();

  if (!activeArtifact) return null;

  const ArtifactComponent = ARTIFACT_COMPONENTS[activeArtifact.type] || DocumentArtifact;
  const icon = ARTIFACT_ICONS[activeArtifact.type] || '📄';

  const handleUpdate = (contentUpdates) => {
    updateArtifact(activeArtifact.id, contentUpdates);
  };

  return (
    <div className={styles.canvas}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.icon}>{icon}</span>
          <span className={styles.title}>{activeArtifact.title}</span>
          {activeArtifact.version && (
            <button className={styles.versionButton}>
              v{activeArtifact.version}
              <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
            </button>
          )}
        </div>

        <div className={styles.headerRight}>
          <button
            className={styles.headerButton}
            aria-label="Download artifact"
          >
            <DownloadIcon sx={{ fontSize: 18 }} />
          </button>
          <button
            className={styles.headerButton}
            aria-label="Open in new window"
          >
            <OpenInNewIcon sx={{ fontSize: 18 }} />
          </button>
          <button
            className={styles.closeButton}
            onClick={closeArtifact}
            aria-label="Close artifact"
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className={styles.content}>
        <ArtifactComponent
          artifact={activeArtifact}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default ArtifactCanvas;
