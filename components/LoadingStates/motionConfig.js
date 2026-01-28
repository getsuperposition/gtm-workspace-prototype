/**
 * Motion Configuration for Loading Components
 * 
 * Centralized animation values for all loading indicators.
 * Uses the same easing function as defined in globals.css for consistency.
 */

export const MOTION_CONFIG = {
  // Square loading animation
  square: {
    duration: 2500,                      // 2500ms per cycle (in milliseconds)
    fadeOutDuration: 500,                // 500ms fade-out when completing
    ease: [0.075, 0.82, 0.165, 1],      // Matches --transition-* in globals.css
    opacityKeyframes: [0, 1, 0],        // Opacity animation pattern
    defaultSize: 16,                     // Default square size in pixels
    defaultCornerRadius: 16,             // Default corner radius
  },
  
  // Future loading animations can be added here
};

/**
 * Get configuration for a specific loading type
 * @param {string} type - The loading animation type (e.g., 'square', 'spinner')
 * @returns {object} Configuration object for the specified type
 */
export function getLoadingConfig(type) {
  return MOTION_CONFIG[type] || MOTION_CONFIG.square;
}
