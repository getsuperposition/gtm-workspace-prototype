'use client';

import Link from 'next/link';
import DataTable from '@/components/DataTable/DataTable';
import ActionButton from '@/components/ActionButton';
import { getCompanyLogo } from '@/utils/companyLogos';
import styles from './ContentTypes.module.css';

/**
 * KeyPromotionsContent - Contact title/role change notifications
 * Design: Stats subtitle + data table with row actions
 */
export default function KeyPromotionsContent({ data, pulseId, pulseTitle }) {
  const {
    accountCount,
    contactCount,
    promotions,
  } = data;

  const handleDismissRow = (row, reason) => {
    console.log('Dismissed promotion:', row.contactName, 'Reason:', reason.label);
    // TODO: Persist dismissal to backend
  };

  // Helper to get logo for a row
  const getRowLogo = (row) => row.accountLogo || getCompanyLogo(row.accountName);

  // Table columns for promotions
  const columns = [
    {
      key: 'account',
      header: 'ACCOUNT',
      render: (row) => {
        const logo = getRowLogo(row);
        return (
          <div className={styles.accountCell}>
            {logo ? (
              <img src={logo} alt="" className={styles.cellLogo} />
            ) : (
              <div className={styles.cellLogoPlaceholder}>
                {row.accountName?.charAt(0) || '?'}
              </div>
            )}
            <Link
              href={`/accounts/${row.accountId || 'unknown'}`}
              className={styles.entityLink}
              onClick={(e) => e.stopPropagation()}
            >
              {row.accountName}
            </Link>
          </div>
        );
      },
    },
    {
      key: 'contact',
      header: 'CONTACT',
      render: (row) => (
        <Link
          href={`/contacts/${row.contactId || row.id}`}
          className={styles.entityLink}
          onClick={(e) => e.stopPropagation()}
        >
          {row.contactName}
        </Link>
      ),
    },
    {
      key: 'newRole',
      header: 'NEW ROLE',
      render: (row) => row.newRole,
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
      taskTitle={`Email ${row.contactName} following promotion to ${row.newRole} at ${row.accountName}`}
      accountName={row.accountName}
      accountLogo={getRowLogo(row)}
      size="small"
    />
  );

  return (
    <div className={styles.keyPromotions}>
      {/* Stats subtitle */}
      <p className={styles.statsSubtitle}>
        {accountCount} accounts · {contactCount} contacts with title changes
      </p>

      {/* Promotions table */}
      {promotions && promotions.length > 0 && (
        <div className={styles.tableWrapper}>
          <DataTable
            variant="v4-inline"
            columns={columns}
            data={promotions}
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
