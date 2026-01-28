'use client';

import { use } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import ChatDetail from '@/components/ChatDetail/ChatDetail';
import styles from './page.module.css';

export default function ChatDetailPage({ params }) {
  const { id } = use(params);
  const { getChatById, addMessage } = useChatContext();
  const chat = getChatById(id);

  const handleSendMessage = (message) => {
    addMessage(id, message, 'user');
  };

  return (
    <div className={styles.page}>
      <ChatDetail chat={chat} onSendMessage={handleSendMessage} />
    </div>
  );
}
