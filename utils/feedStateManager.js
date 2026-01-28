/**
 * Feed State Manager - localStorage utility for persisting feed card states
 * 
 * Manages card states including bookmarked, archived, and showLessRequested flags
 */

const STORAGE_KEY = 'feedCardStates';
const STORAGE_VERSION = '1.0';

/**
 * Save card states to localStorage
 * @param {Object} cardStates - Object with cardId as key and state object as value
 */
export const saveStateToLocalStorage = (cardStates) => {
  try {
    const data = {
      version: STORAGE_VERSION,
      lastUpdated: Date.now(),
      states: cardStates
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving feed states to localStorage:', error);
    // Handle quota exceeded or other errors gracefully
    if (error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded. Consider clearing old data.');
    }
  }
};

/**
 * Load card states from localStorage
 * @returns {Object} Card states object or empty object if none found
 */
export const loadStateFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return {};
    
    const parsed = JSON.parse(data);
    
    // Validate version and structure
    if (parsed.version !== STORAGE_VERSION) {
      console.warn('localStorage version mismatch. Clearing old data.');
      clearStateFromLocalStorage();
      return {};
    }
    
    return parsed.states || {};
  } catch (error) {
    console.error('Error loading feed states from localStorage:', error);
    return {};
  }
};

/**
 * Clear all card states from localStorage
 */
export const clearStateFromLocalStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing feed states from localStorage:', error);
  }
};

/**
 * Update a single card's state
 * @param {string} cardId - The card ID to update
 * @param {Object} stateUpdate - Partial state object to merge
 */
export const updateCardState = (cardId, stateUpdate) => {
  const currentStates = loadStateFromLocalStorage();
  const updatedStates = {
    ...currentStates,
    [cardId]: {
      ...(currentStates[cardId] || {}),
      ...stateUpdate
    }
  };
  saveStateToLocalStorage(updatedStates);
  return updatedStates;
};

/**
 * Get a single card's state
 * @param {string} cardId - The card ID to retrieve
 * @returns {Object} Card state or default state if not found
 */
export const getCardState = (cardId) => {
  const states = loadStateFromLocalStorage();
  return states[cardId] || {
    isBookmarked: false,
    isArchived: false,
    showLessRequested: false,
    archivedAt: null,
    bookmarkedAt: null
  };
};

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is available
 */
export const isLocalStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};
