'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import AIChatButton from '@/components/AIChatButton';
import AIChatPanel from '@/components/AIChatPanel';
import ArtifactCanvas from '@/components/ArtifactCanvas';
import { usePageContext } from '@/contexts/PageContext';
import { useAIChat } from '@/contexts/AIChatContext';
import styles from './AIChatWrapper.module.css';

/**
 * Wrapper component that manages the AI Chat layout
 * - Handles route-based visibility
 * - Provides split layout when panel is open (no backdrop)
 * - Shows artifact canvas when artifact is active
 */
const AIChatWrapper = ({ children }) => {
  const pathname = usePathname();
  const { setPageContext } = usePageContext();
  const { isOpen, closeChat, hasActiveArtifact } = useAIChat();

  // Determine if AI chat should be visible based on route
  // AI chat is available everywhere except dedicated chats pages
  const isHiddenRoute =
    pathname === '/chats' ||
    pathname.startsWith('/chats/');

  // Update page context based on route
  useEffect(() => {
    if (pathname === '/') {
      setPageContext('feed');
    } else if (pathname.startsWith('/feed/')) {
      setPageContext('pulse');
    } else if (pathname === '/views') {
      setPageContext('views');
    } else if (pathname.startsWith('/views/')) {
      setPageContext('view');
    } else if (pathname === '/meetings') {
      setPageContext('meetings');
    } else if (pathname === '/notes') {
      setPageContext('notes');
    } else if (pathname === '/chats') {
      setPageContext('chats');
    } else if (pathname.startsWith('/chats/')) {
      setPageContext('chat');
    }
  }, [pathname, setPageContext]);

  // Close chat panel when navigating to hidden routes
  useEffect(() => {
    if (isHiddenRoute) {
      closeChat();
    }
  }, [isHiddenRoute, closeChat]);

  // If on hidden route, just render children without AI features
  if (isHiddenRoute) {
    return <div className={styles.mainContent}>{children}</div>;
  }

  // Determine layout class based on state
  const layoutClass = isOpen
    ? hasActiveArtifact
      ? styles.layoutWithArtifact
      : styles.layoutWithPanel
    : styles.layoutDefault;

  return (
    <div className={`${styles.layoutContainer} ${layoutClass}`}>
      {/* Main content area */}
      <div className={styles.mainContent}>
        {children}
      </div>

      {/* Artifact canvas (when active) */}
      {isOpen && hasActiveArtifact && (
        <div className={styles.artifactCanvas}>
          <ArtifactCanvas />
        </div>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className={styles.chatPanel}>
          <AIChatPanel />
        </div>
      )}

      {/* Floating button (when panel is closed) */}
      {!isOpen && <AIChatButton />}
    </div>
  );
};

export default AIChatWrapper;
