'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getFeedItemById } from '@/utils/feedHelpers';
import FeedDetail from '@/components/FeedDetail/FeedDetail';
import { usePageContext } from '@/contexts/PageContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './page.module.css';

export default function FeedDetailPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const feedItem = getFeedItemById(id);
  const { setPageContext } = usePageContext();

  // Set page context with feed item details
  useEffect(() => {
    if (feedItem) {
      setPageContext('pulse', {
        type: 'pulse',
        id: feedItem.id,
        name: feedItem.company?.name || feedItem.title,
        metadata: {
          type: feedItem.type,
          company: feedItem.company,
        },
      });
    }
  }, [feedItem, setPageContext]);

  if (!feedItem) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h1>Feed Item Not Found</h1>
            <p>The feed item you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/')}
              className="btn btn-ghost"
            >
              <ArrowBackIcon sx={{ fontSize: 18 }} />
              Back to Feed
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button
          onClick={() => router.back()}
          className="btn btn-ghost"
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} />
          Back
        </button>
        
        <FeedDetail feedItem={feedItem} />
      </div>
    </div>
  );
}
