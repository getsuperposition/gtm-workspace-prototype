'use client';

import Link from 'next/link';
import DataTable from '@/components/DataTable/DataTable';
import ActionButton from '@/components/ActionButton';
import Tag from '@/components/FeedElements/Tag';
import { getCompanyLogo } from '@/utils/companyLogos';
import styles from './ContentTypes.module.css';

/**
 * WebsiteVisitsContent - Website visitor activity
 * Design: Account metadata + description + data table with row actions
 */
export default function WebsiteVisitsContent({ data, pulseId, pulseTitle }) {
  const {
    company,
    companies,
    visitors,
    description,
    value,
    stage,
    recency,
    intentSignal,
  } = data;

  // Get primary company (first one if multiple)
  const primaryCompany = company || companies?.[0];

  // Get logo from utility if not provided
  const companyLogo = primaryCompany?.logo || getCompanyLogo(primaryCompany?.name);

  const handleDismissRow = (row, reason) => {
    console.log('Dismissed row:', row.name, 'Reason:', reason.label);
    // TODO: Persist dismissal to backend
  };

  // Table columns for visitors
  const columns = [
    {
      key: 'visitor',
      header: 'VISITOR',
      render: (row) => (
        <div className={styles.visitorCell}>
          <Link
            href={`/contacts/${row.id}`}
            className={styles.entityLink}
            onClick={(e) => e.stopPropagation()}
          >
            {row.name}
          </Link>
          <span className={styles.visitorRole}>{row.role}</span>
        </div>
      ),
    },
    {
      key: 'visits',
      header: 'VISITS',
      width: '60px',
      numeric: true,
      render: (row) => row.visits,
    },
    {
      key: 'topPages',
      header: 'TOP PAGES',
      render: (row) => (
        <span className={styles.topPages}>
          {row.topPages?.[0] || '-'}
        </span>
      ),
    },
  ];

  // Action column render
  const renderAction = (row) => (
    <ActionButton
      taskType="emailDraft"
      label="Draft Email"
      processingLabel="Drafting..."
      viewLabel="View Email"
      sourceId={`${pulseId}-${row.id}`}
      sourceTitle={pulseTitle}
      taskTitle={`Email ${row.name} - ${row.role}`}
      accountName={primaryCompany?.name}
      accountLogo={companyLogo}
      size="small"
    />
  );

  return (
    <div className={styles.websiteVisits}>
      {/* Account metadata row */}
      <div className={styles.accountMeta}>
        {companyLogo ? (
          <img src={companyLogo} alt="" className={styles.companyLogo} />
        ) : (
          <div className={styles.companyLogoPlaceholder}>
            {primaryCompany?.name?.charAt(0) || '?'}
          </div>
        )}
        <Link
          href={`/accounts/${primaryCompany?.id || 'unknown'}`}
          className={styles.companyNameLink}
          onClick={(e) => e.stopPropagation()}
        >
          {primaryCompany?.name}
        </Link>
        {value && <Tag label={value} variant="default" size="sm" />}
        {stage && <Tag label={stage} variant="default" size="sm" />}
        {recency && <span className={styles.recency}>{recency}</span>}
      </div>

      {/* Intent signal / description */}
      {(intentSignal || description) && (
        <p className={styles.description}>
          {intentSignal || description}
        </p>
      )}

      {/* Visitors table */}
      {visitors && visitors.length > 0 && (
        <div className={styles.tableWrapper}>
          <DataTable
            variant="v4-inline"
            columns={columns}
            data={visitors}
            actionColumn={renderAction}
            initialVisibleCount={4}
            expandIncrement={6}
            showRowDismiss={true}
            onDismissRow={handleDismissRow}
          />
        </div>
      )}
    </div>
  );
}
