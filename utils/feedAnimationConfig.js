/**
 * Feed Card Animation Configuration
 * 
 * This file contains all animation variables for feed card entrance/exit animations.
 * Adjust these values to fine-tune the animation behavior.
 */

export const FEED_ANIMATION_CONFIG = {
  // Initial load stagger delays (in milliseconds)
  // Cards animate in sequence with decreasing delays
  staggerDelays: {
    initial: 0,  // Initial delay before first card starts animating
    card1: 0,      // First card starts after initial delay
    card2: 100,    // Second card starts 300ms after first
    card3: 100,    // Third card starts 150ms after second (450ms total)
    card4: 100,     // Fourth card starts 75ms after third (525ms total)
    card5: 100,     // Fifth card starts 30ms after fourth (555ms total)
    remaining: 30  // All remaining cards start with card 5 (555ms total)
  },

  // Animation durations (in milliseconds)
  duration: {
    fadeIn: 100,      // How long the fade-in takes
    slideUp: 400,     // How long the slide-up takes
    fadeOut: 300,     // How long the fade-out takes (for exit)
    slideUpExit: 300  // How long the slide-up takes on exit
  },

  // Animation distances (in pixels)
  distance: {
    slideUp: 200,      // How far cards move up when entering
    slideUpExit: 150   // How far cards move up when exiting
  },

  // Easing functions
  easing: {
    enter: 'cubic-bezier(0.4, 0, 0.2, 1)',  // Smooth ease-in-out for entrance
    exit: 'cubic-bezier(0.4, 0, 1, 1)'       // Ease-in for exit
  },

  // Intersection Observer options
  observer: {
    // Trigger animation when this percentage of the card is visible
    threshold: 0.1,
    
    // Start observing this many pixels before the card enters viewport
    rootMargin: '50px 0px -50px 0px'
  }
};

/**
 * Calculate the delay for a card based on its index
 * @param {number} index - The card's position in the list (0-based)
 * @returns {number} - Delay in milliseconds
 */
export function getCardDelay(index) {
  const { staggerDelays } = FEED_ANIMATION_CONFIG;
  
  switch (index) {
    case 0:
      return staggerDelays.initial + staggerDelays.card1;
    case 1:
      return staggerDelays.initial + staggerDelays.card1 + staggerDelays.card2;
    case 2:
      return staggerDelays.initial + staggerDelays.card1 + staggerDelays.card2 + staggerDelays.card3;
    case 3:
      return staggerDelays.initial + staggerDelays.card1 + staggerDelays.card2 + staggerDelays.card3 + staggerDelays.card4;
    case 4:
    default:
      // Card 5 and all remaining cards use the same delay
      return staggerDelays.initial + staggerDelays.card1 + staggerDelays.card2 + staggerDelays.card3 + staggerDelays.card4 + staggerDelays.card5;
  }
}
