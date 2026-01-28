// Helper functions for chat feature

/**
 * Generate chat title from first prompt
 * Takes first 50 characters or first sentence, whichever is shorter
 */
export const generateChatTitle = (prompt) => {
  if (!prompt || typeof prompt !== 'string') {
    return 'New Chat';
  }

  const maxLength = 50;
  const firstSentence = prompt.split(/[.!?]/)[0].trim();
  
  if (firstSentence.length === 0) {
    return 'New Chat';
  }
  
  if (firstSentence.length <= maxLength) {
    return firstSentence;
  }
  
  return firstSentence.substring(0, maxLength).trim() + '...';
};

/**
 * Get first sentence for card preview
 */
export const getFirstSentence = (prompt) => {
  if (!prompt || typeof prompt !== 'string') {
    return '';
  }
  
  return prompt.split(/[.!?]/)[0].trim();
};

/**
 * Format relative time (e.g., "2h ago", "3d ago")
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
};

/**
 * Generate mock AI response for demo purposes
 */
export const generateMockResponse = (prompt) => {
  const responses = [
    'I\'ve analyzed your request and here are my recommendations based on the available data. Would you like me to provide more details on any specific area?',
    'Based on the account information, I can help you with that. Let me break down the key points you should consider.',
    'I\'ve reviewed the relevant data and identified several important insights. Here\'s what you need to know.',
    'Great question! I\'ve compiled the information you requested. Here are the main findings.',
    'I can help you with that. Based on current trends and historical data, here\'s my analysis.'
  ];
  
  // Simple hash function to get consistent response for same prompt
  const hash = prompt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return responses[hash % responses.length];
};

/**
 * Generate unique chat ID
 */
export const generateChatId = () => {
  return `chat-user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Generate unique message ID
 */
export const generateMessageId = () => {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format timestamp for message display
 */
export const formatMessageTime = (date) => {
  if (!date) return '';
  
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 60) => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength).trim() + '...';
};
