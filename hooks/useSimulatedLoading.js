/**
 * useSimulatedLoading Hook
 *
 * A reusable React hook for managing simulated loading states with configurable durations.
 * Provides both manual control and automatic execution helpers for async operations.
 * Properly handles the LoadingSquare fade-out animation (500ms) before hiding content.
 */

'use client';

import { useState, useCallback } from 'react';
import { simulateLoading, LOADING_SPEEDS } from '@/utils/loadingDurations';
import { getLoadingConfig } from '@/components/LoadingStates/motionConfig';

// Get the fade-out duration from the loading config
const FADE_OUT_DURATION = getLoadingConfig('square').fadeOutDuration;

/**
 * Hook for managing simulated loading states
 * @param {string} speed - Loading speed preset ('quick' or 'slow')
 * @returns {object} { isLoading, isCompleting, startLoading, executeWithLoading }
 */
export function useSimulatedLoading(speed = LOADING_SPEEDS.QUICK) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  /**
   * Manually start a loading state that completes after a random duration
   * Waits for fade-out animation to complete before clearing loading state
   * @returns {Promise<void>}
   */
  const startLoading = useCallback(async () => {
    setIsLoading(true);
    setIsCompleting(false);
    
    // Simulate loading delay
    await simulateLoading(speed);
    
    // Start fade-out animation
    setIsCompleting(true);
    
    // Wait for fade-out to complete
    await new Promise(resolve => setTimeout(resolve, FADE_OUT_DURATION));
    
    // Clear loading state
    setIsLoading(false);
    setIsCompleting(false);
  }, [speed]);

  /**
   * Execute a callback with simulated loading before and after
   * Waits for fade-out animation to complete before showing new content
   * @param {Function} callback - Async function to execute
   * @returns {Promise<any>} Result of the callback
   */
  const executeWithLoading = useCallback(async (callback) => {
    setIsLoading(true);
    setIsCompleting(false);
    
    try {
      // Simulate loading delay
      await simulateLoading(speed);
      
      // Execute the callback
      const result = await callback();
      
      // Start fade-out animation
      setIsCompleting(true);
      
      // Wait for fade-out to complete before showing new content
      await new Promise(resolve => setTimeout(resolve, FADE_OUT_DURATION));
      
      return result;
    } finally {
      // Always clear loading state, even if callback throws
      setIsLoading(false);
      setIsCompleting(false);
    }
  }, [speed]);

  return {
    isLoading,
    isCompleting,
    startLoading,
    executeWithLoading
  };
}
