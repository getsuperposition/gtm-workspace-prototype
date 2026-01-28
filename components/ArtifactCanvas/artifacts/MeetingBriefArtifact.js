'use client';

import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import styles from './MeetingBriefArtifact.module.css';

/**
 * Meeting Brief Artifact with inline editing
 */
const MeetingBriefArtifact = ({ artifact, onUpdate }) => {
  const { content } = artifact;
  const [localContent, setLocalContent] = useState(content || {});
  const [editingSection, setEditingSection] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    setLocalContent(content || {});
  }, [content]);

  if (!content) {
    return <div className={styles.empty}>No content available</div>;
  }

  const {
    meetingContext,
    strategicFocusAreas = [],
    mainCompetitors = [],
    painPoints = [],
    attendees = [],
    nextSteps = [],
  } = localContent;

  const startEditing = (section, value) => {
    setEditingSection(section);
    setEditValue(Array.isArray(value) ? value.join('\n') : value);
  };

  const saveEdit = (section) => {
    let newValue = editValue;

    // Convert back to array for list sections
    if (['strategicFocusAreas', 'mainCompetitors', 'nextSteps'].includes(section)) {
      newValue = editValue.split('\n').filter(line => line.trim());
    }

    setLocalContent(prev => ({ ...prev, [section]: newValue }));

    if (onUpdate) {
      onUpdate({ [section]: newValue });
    }

    setEditingSection(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingSection(null);
    setEditValue('');
  };

  const EditableSection = ({ section, title, children, value }) => (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {editingSection !== section && (
          <button
            className={styles.editButton}
            onClick={() => startEditing(section, value)}
            aria-label={`Edit ${title}`}
          >
            <EditIcon sx={{ fontSize: 14 }} />
          </button>
        )}
      </div>

      {editingSection === section ? (
        <div className={styles.editContainer}>
          <textarea
            className={styles.editTextarea}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            autoFocus
            rows={Array.isArray(value) ? Math.max(value.length + 1, 3) : 3}
          />
          <div className={styles.editActions}>
            <button
              className={styles.saveButton}
              onClick={() => saveEdit(section)}
              aria-label="Save changes"
            >
              <CheckIcon sx={{ fontSize: 16 }} />
              Save
            </button>
            <button
              className={styles.cancelButton}
              onClick={cancelEdit}
              aria-label="Cancel editing"
            >
              <CloseIcon sx={{ fontSize: 16 }} />
            </button>
          </div>
        </div>
      ) : (
        children
      )}
    </section>
  );

  return (
    <div className={styles.brief}>
      {/* Meeting Context */}
      {(meetingContext || editingSection === 'meetingContext') && (
        <EditableSection section="meetingContext" title="Meeting context" value={meetingContext}>
          <p className={styles.contextText}>{meetingContext}</p>
        </EditableSection>
      )}

      {/* Strategic Focus Areas */}
      {(strategicFocusAreas.length > 0 || editingSection === 'strategicFocusAreas') && (
        <EditableSection
          section="strategicFocusAreas"
          title="Strategic focus areas"
          value={strategicFocusAreas}
        >
          <ul className={styles.bulletList}>
            {strategicFocusAreas.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </EditableSection>
      )}

      {/* Main Competitors */}
      {(mainCompetitors.length > 0 || editingSection === 'mainCompetitors') && (
        <EditableSection
          section="mainCompetitors"
          title="Main competitors"
          value={mainCompetitors}
        >
          <ul className={styles.bulletList}>
            {mainCompetitors.map((competitor, index) => (
              <li key={index}>{competitor}</li>
            ))}
          </ul>
        </EditableSection>
      )}

      {/* Pain Points */}
      {painPoints.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Pain points</h2>
          <ol className={styles.numberedList}>
            {painPoints.map((point, index) => (
              <li key={index} className={styles.painPoint}>
                <p className={styles.painPointText}>{point.text}</p>
                {point.quote && (
                  <div className={styles.quoteBlock}>
                    <div className={styles.quoteAuthor}>
                      <span className={styles.authorName}>{point.quote.author}</span>
                      {point.quote.role && (
                        <span className={styles.authorRole}>({point.quote.role})</span>
                      )}
                    </div>
                    <blockquote className={styles.quote}>
                      "{point.quote.text}"
                    </blockquote>
                    {point.quote.sentiment && (
                      <span className={`${styles.sentiment} ${styles[point.quote.sentiment]}`}>
                        {point.quote.sentiment === 'negative' ? '👎' : point.quote.sentiment === 'positive' ? '👍' : '😐'}
                      </span>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Attendees */}
      {attendees.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Meeting attendees</h2>
          <div className={styles.attendeesList}>
            {attendees.map((attendee, index) => (
              <div key={index} className={styles.attendee}>
                <div className={styles.attendeeAvatar}>
                  {attendee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={styles.attendeeInfo}>
                  <span className={styles.attendeeName}>{attendee.name}</span>
                  <span className={styles.attendeeRole}>{attendee.role}</span>
                  {attendee.notes && (
                    <span className={styles.attendeeNotes}>{attendee.notes}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Next Steps */}
      {(nextSteps.length > 0 || editingSection === 'nextSteps') && (
        <EditableSection
          section="nextSteps"
          title="Recommended next steps"
          value={nextSteps}
        >
          <ul className={styles.bulletList}>
            {nextSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </EditableSection>
      )}
    </div>
  );
};

export default MeetingBriefArtifact;
