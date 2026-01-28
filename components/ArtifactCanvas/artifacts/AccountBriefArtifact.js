'use client';

import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import styles from './AccountBriefArtifact.module.css';

/**
 * Account Brief Artifact with inline editing
 */
const AccountBriefArtifact = ({ artifact, onUpdate }) => {
  const { content } = artifact;
  const [localContent, setLocalContent] = useState(content || {});
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    setLocalContent(content || {});
  }, [content]);

  if (!content) {
    return <div className={styles.empty}>No content available</div>;
  }

  const startEditing = (field, value) => {
    setEditingField(field);
    setEditValue(Array.isArray(value) ? value.join('\n') : value || '');
  };

  const saveEdit = (field) => {
    let newValue = editValue;
    if (['opportunities', 'risks', 'recommendations'].includes(field)) {
      newValue = editValue.split('\n').filter(line => line.trim());
    }

    setLocalContent(prev => ({ ...prev, [field]: newValue }));
    if (onUpdate) {
      onUpdate({ [field]: newValue });
    }
    setEditingField(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const {
    companyName,
    industry,
    overview,
    keyMetrics = [],
    recentActivity = [],
    opportunities = [],
    risks = [],
    recommendations = [],
  } = localContent;

  const EditableListSection = ({ field, title, items, icon }) => (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {editingField !== field && (
          <button
            className={styles.editButton}
            onClick={() => startEditing(field, items)}
            aria-label={`Edit ${title}`}
          >
            <EditIcon sx={{ fontSize: 14 }} />
          </button>
        )}
      </div>

      {editingField === field ? (
        <div className={styles.editContainer}>
          <textarea
            className={styles.editTextarea}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            autoFocus
            rows={Math.max(items.length + 1, 3)}
            placeholder="Enter one item per line"
          />
          <div className={styles.editActions}>
            <button
              className={styles.saveButton}
              onClick={() => saveEdit(field)}
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
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={index} className={styles.listItem}>
              {icon && <span className={styles.listIcon}>{icon}</span>}
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );

  return (
    <div className={styles.brief}>
      {/* Company Header */}
      <header className={styles.companyHeader}>
        <div className={styles.companyLogo}>
          {companyName?.[0] || 'A'}
        </div>
        <div className={styles.companyInfo}>
          <h1 className={styles.companyName}>{companyName}</h1>
          {industry && <span className={styles.industry}>{industry}</span>}
        </div>
      </header>

      {/* Overview */}
      {(overview || editingField === 'overview') && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Overview</h2>
            {editingField !== 'overview' && (
              <button
                className={styles.editButton}
                onClick={() => startEditing('overview', overview)}
                aria-label="Edit overview"
              >
                <EditIcon sx={{ fontSize: 14 }} />
              </button>
            )}
          </div>
          {editingField === 'overview' ? (
            <div className={styles.editContainer}>
              <textarea
                className={styles.editTextarea}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
                rows={4}
              />
              <div className={styles.editActions}>
                <button className={styles.saveButton} onClick={() => saveEdit('overview')}>
                  <CheckIcon sx={{ fontSize: 16 }} /> Save
                </button>
                <button className={styles.cancelButton} onClick={cancelEdit}>
                  <CloseIcon sx={{ fontSize: 16 }} />
                </button>
              </div>
            </div>
          ) : (
            <p className={styles.overviewText}>{overview}</p>
          )}
        </section>
      )}

      {/* Key Metrics */}
      {keyMetrics.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Key metrics</h2>
          <div className={styles.metricsGrid}>
            {keyMetrics.map((metric, index) => (
              <div key={index} className={styles.metricCard}>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{metric.label}</span>
                {metric.change && (
                  <span className={`${styles.metricChange} ${metric.change > 0 ? styles.positive : styles.negative}`}>
                    {metric.change > 0 ? '↑' : '↓'} {Math.abs(metric.change)}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Recent activity</h2>
          <div className={styles.activityList}>
            {recentActivity.map((activity, index) => (
              <div key={index} className={styles.activityItem}>
                <span className={styles.activityDot} />
                <div className={styles.activityContent}>
                  <span className={styles.activityText}>{activity.text}</span>
                  <span className={styles.activityDate}>{activity.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Opportunities */}
      {(opportunities.length > 0 || editingField === 'opportunities') && (
        <EditableListSection field="opportunities" title="Opportunities" items={opportunities} icon="💡" />
      )}

      {/* Risks */}
      {(risks.length > 0 || editingField === 'risks') && (
        <EditableListSection field="risks" title="Risks" items={risks} icon="⚠️" />
      )}

      {/* Recommendations */}
      {(recommendations.length > 0 || editingField === 'recommendations') && (
        <EditableListSection field="recommendations" title="Recommendations" items={recommendations} />
      )}
    </div>
  );
};

export default AccountBriefArtifact;
