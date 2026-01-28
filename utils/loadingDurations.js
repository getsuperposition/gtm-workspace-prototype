/**
 * Loading Duration Utilities
 * 
 * Centralized management of simulated loading durations with configurable speed presets.
 * Provides randomized delays to create a more natural, realistic user experience.
 */

// Loading speed presets
export const LOADING_SPEEDS = {
  QUICK: 'quick',
  SLOW: 'slow'
};

// Duration ranges in milliseconds
const DURATION_RANGES = {
  [LOADING_SPEEDS.QUICK]: { min: 300, max: 1500 },
  [LOADING_SPEEDS.SLOW]: { min: 2500, max: 7000 }
};

/**
 * Get a random duration for the specified speed preset
 * @param {string} speed - Loading speed preset ('quick' or 'slow')
 * @returns {number} Random duration in milliseconds
 */
export function getRandomDuration(speed = LOADING_SPEEDS.QUICK) {
  const range = DURATION_RANGES[speed];
  
  if (!range) {
    console.warn(`Invalid loading speed: ${speed}. Using QUICK as fallback.`);
    return getRandomDuration(LOADING_SPEEDS.QUICK);
  }
  
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}

/**
 * Create a promise that resolves after a random duration
 * @param {string} speed - Loading speed preset ('quick' or 'slow')
 * @returns {Promise<void>} Promise that resolves after the random duration
 */
export function simulateLoading(speed = LOADING_SPEEDS.QUICK) {
  const duration = getRandomDuration(speed);
  return new Promise(resolve => setTimeout(resolve, duration));
}
