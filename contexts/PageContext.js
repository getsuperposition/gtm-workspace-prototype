'use client';

import { createContext, useContext, useState, useCallback } from 'react';

/**
 * @typedef {'home' | 'feed' | 'pulse' | 'views' | 'view' | 'meetings' | 'notes' | 'chats' | 'chat'} PageType
 *
 * @typedef {Object} PageEntity
 * @property {'pulse' | 'view' | 'account' | 'meeting' | 'note' | 'chat' | null} type
 * @property {string | null} id
 * @property {string | null} name
 * @property {Object} metadata - Additional context-specific data
 */

const PageContext = createContext();

const DEFAULT_ENTITY = {
  type: null,
  id: null,
  name: null,
  metadata: {},
};

export function PageContextProvider({ children }) {
  const [pageType, setPageType] = useState('home');
  const [entity, setEntity] = useState(DEFAULT_ENTITY);

  /**
   * Set the current page context
   * @param {PageType} type - The page type
   * @param {Partial<PageEntity>} entityData - Optional entity data
   */
  const setPageContext = useCallback((type, entityData = null) => {
    setPageType(type);
    if (entityData) {
      setEntity({
        type: entityData.type || null,
        id: entityData.id || null,
        name: entityData.name || null,
        metadata: entityData.metadata || {},
      });
    } else {
      setEntity(DEFAULT_ENTITY);
    }
  }, []);

  /**
   * Clear the current entity while keeping the page type
   */
  const clearEntity = useCallback(() => {
    setEntity(DEFAULT_ENTITY);
  }, []);

  /**
   * Get a formatted breadcrumb string for the current context
   * e.g., "Feed / Dell Technologies" or "View: Vancouver Accounts"
   */
  const getBreadcrumb = useCallback(() => {
    const pageLabels = {
      home: 'Home',
      feed: 'Feed',
      pulse: 'Feed',
      views: 'Views',
      view: 'View',
      meetings: 'Meetings',
      notes: 'Notes',
      chats: 'Chats',
      chat: 'Chat',
    };

    const label = pageLabels[pageType] || 'Page';

    if (entity.name) {
      if (pageType === 'view') {
        return `View: ${entity.name}`;
      }
      return `${label} / ${entity.name}`;
    }

    return label;
  }, [pageType, entity.name]);

  /**
   * Check if the current page should show the AI chat button
   * Hidden on: /, /chats, /chats/[id]
   */
  const shouldShowAIChat = useCallback(() => {
    return !['home', 'chats', 'chat'].includes(pageType);
  }, [pageType]);

  const value = {
    pageType,
    entity,
    setPageContext,
    clearEntity,
    getBreadcrumb,
    shouldShowAIChat,
  };

  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  const context = useContext(PageContext);

  if (context === undefined) {
    throw new Error('usePageContext must be used within a PageContextProvider');
  }

  return context;
}
