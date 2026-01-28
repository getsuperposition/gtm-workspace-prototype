'use client';

import { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EventIcon from '@mui/icons-material/Event';
import styles from './EmailDraftArtifact.module.css';

/**
 * Email Draft Artifact with inline editing
 */
const EmailDraftArtifact = ({ artifact, onUpdate }) => {
  const { content } = artifact;
  const bodyRef = useRef(null);

  const [editingField, setEditingField] = useState(null);
  const [localContent, setLocalContent] = useState(content || {});

  // Sync local content when artifact changes
  useEffect(() => {
    setLocalContent(content || {});
  }, [content]);

  if (!content) {
    return <div className={styles.empty}>No content available</div>;
  }

  const {
    to = [],
    cc = [],
    subject = '',
    body = '',
    signature = null,
  } = localContent;

  const handleSubjectChange = (e) => {
    const newSubject = e.target.value;
    setLocalContent(prev => ({ ...prev, subject: newSubject }));
  };

  const handleSubjectBlur = () => {
    setEditingField(null);
    if (onUpdate && localContent.subject !== content.subject) {
      onUpdate({ subject: localContent.subject });
    }
  };

  const handleBodyChange = (e) => {
    const newBody = e.target.value;
    setLocalContent(prev => ({ ...prev, body: newBody }));
  };

  const handleBodyBlur = () => {
    setEditingField(null);
    if (onUpdate && localContent.body !== content.body) {
      onUpdate({ body: localContent.body });
    }
  };

  const handleRemoveRecipient = (type, index) => {
    const newRecipients = [...localContent[type]];
    newRecipients.splice(index, 1);
    setLocalContent(prev => ({ ...prev, [type]: newRecipients }));
    if (onUpdate) {
      onUpdate({ [type]: newRecipients });
    }
  };

  return (
    <div className={styles.email}>
      {/* Email Header */}
      <div className={styles.header}>
        {/* To field */}
        <div className={styles.field}>
          <label className={styles.fieldLabel}>To</label>
          <div className={styles.fieldContent}>
            <div className={styles.recipients}>
              {to.map((recipient, index) => (
                <span key={index} className={styles.recipient}>
                  {recipient.name || recipient.email}
                  <button
                    className={styles.removeRecipient}
                    onClick={() => handleRemoveRecipient('to', index)}
                    aria-label="Remove recipient"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                className={styles.recipientInput}
                placeholder="Add recipient…"
                aria-label="Add recipient"
              />
            </div>
          </div>
        </div>

        {/* Cc field */}
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Cc</label>
          <div className={styles.fieldContent}>
            <div className={styles.recipients}>
              {cc.map((recipient, index) => (
                <span key={index} className={styles.recipient}>
                  {recipient.name || recipient.email}
                  <button
                    className={styles.removeRecipient}
                    onClick={() => handleRemoveRecipient('cc', index)}
                    aria-label="Remove recipient"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                className={styles.recipientInput}
                placeholder="Add Cc…"
                aria-label="Add Cc recipient"
              />
            </div>
          </div>
        </div>

        {/* Subject field */}
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Subject</label>
          <div className={styles.fieldContent}>
            {editingField === 'subject' ? (
              <input
                type="text"
                className={styles.subjectInput}
                value={localContent.subject}
                onChange={handleSubjectChange}
                onBlur={handleSubjectBlur}
                onKeyDown={(e) => e.key === 'Enter' && handleSubjectBlur()}
                autoFocus
              />
            ) : (
              <div
                className={styles.subject}
                onClick={() => setEditingField('subject')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setEditingField('subject')}
              >
                {subject || <span className={styles.placeholder}>Add subject…</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Email Body */}
      <div className={styles.body}>
        <textarea
          ref={bodyRef}
          className={styles.bodyTextarea}
          value={localContent.body}
          onChange={handleBodyChange}
          onBlur={handleBodyBlur}
          placeholder="Compose your email…"
          aria-label="Email body"
        />

        {signature && (
          <div className={styles.signature}>
            <p className={styles.signatureName}>{signature.name}</p>
            {signature.title && <p className={styles.signatureTitle}>{signature.title}</p>}
            {signature.email && (
              <a href={`mailto:${signature.email}`} className={styles.signatureEmail}>
                {signature.email}
              </a>
            )}
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <button className={styles.toolbarButton} aria-label="Format text">
            <FormatBoldIcon sx={{ fontSize: 18 }} />
          </button>
          <button className={styles.toolbarButton} aria-label="Add list">
            <FormatListBulletedIcon sx={{ fontSize: 18 }} />
          </button>
          <button className={styles.toolbarButton} aria-label="Attach file">
            <AttachFileIcon sx={{ fontSize: 18 }} />
          </button>
          <button className={styles.toolbarButton} aria-label="Add link">
            <LinkIcon sx={{ fontSize: 18 }} />
          </button>
          <button className={styles.toolbarButton} aria-label="Add image">
            <ImageIcon sx={{ fontSize: 18 }} />
          </button>
          <div className={styles.toolbarDivider} />
          <button className={styles.toolbarButton} aria-label="Add contact">
            <PersonAddIcon sx={{ fontSize: 18 }} />
          </button>
          <button className={styles.toolbarButton} aria-label="Schedule">
            <EventIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <div className={styles.actionsLeft}>
          <button className={styles.personalizeButton}>
            <EditIcon sx={{ fontSize: 16 }} />
            Personalize your email
          </button>
          <span className={styles.savedStyles}>Saved email styles: 2</span>
        </div>
        <button className={styles.sendButton}>
          <SendIcon sx={{ fontSize: 16 }} />
          Send
          <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
        </button>
      </div>
    </div>
  );
};

export default EmailDraftArtifact;
