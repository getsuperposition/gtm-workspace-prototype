'use client';

import { useChatContext } from '@/contexts/ChatContext';
import ChatCard from '@/components/ChatCard/ChatCard';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import styles from './page.module.css';

export default function ChatsPage() {
  const { chats, isLoading, deleteUserChats } = useChatContext();

  const handleClearUserChats = () => {
    const count = deleteUserChats();
    console.log(`Deleted ${count} user-created chats`);
  };

  // Check if there are any user-created chats
  const hasUserChats = chats.some(chat => chat.isUserCreated);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <div>
              <h1>Chats</h1>
              <p className={styles.description}>View and manage your conversations</p>
            </div>
          </div>
          <div className={styles.loadingState}>
            <p>Loading chats...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div>
            <h1>Chats</h1>
            <p className={styles.description}>View and manage your conversations</p>
          </div>
          {hasUserChats && (
            <button
              onClick={handleClearUserChats}
              className="btn btn-ghost"
              aria-label="Clear user-created chats"
            >
              <DeleteOutlineIcon sx={{ fontSize: 18 }} />
              Clear user chats
            </button>
          )}
        </div>

        {chats.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No chats yet</h2>
            <p>Start a conversation from the home page using the search box or action buttons.</p>
          </div>
        ) : (
          <div className={styles.chatGrid}>
            {chats.map((chat) => (
              <ChatCard
                key={chat.id}
                id={chat.id}
                title={chat.title}
                firstMessage={chat.messages[0]?.content}
                updatedAt={chat.updatedAt}
                companies={chat.companies}
                companyCount={chat.companyCount}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
