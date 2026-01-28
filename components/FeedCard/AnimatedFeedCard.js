'use client';

import { useEffect, useRef, useState } from 'react';
import { FEED_ANIMATION_CONFIG, getCardDelay } from '../../utils/feedAnimationConfig';
import styles from './AnimatedFeedCard.module.css';

/**
 * AnimatedFeedCard - Wrapper component that adds entrance/exit animations to feed cards
 * 
 * Features:
 * - Initial load: Cards animate in with staggered delays
 * - Scroll into view: Cards animate in when entering viewport
 * - Scroll out of view: Cards animate out when leaving viewport at the top
 */
const AnimatedFeedCard = ({ children, index, isInitialLoad }) => {
  const [animationState, setAnimationState] = useState('hidden'); // 'hidden', 'entering', 'visible', 'exiting'
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const cardRef = useRef(null);
  const observerRef = useRef(null);
  const timeoutRef = useRef(null);

  // Reset animation state when isInitialLoad changes (e.g., navigating back to page)
  useEffect(() => {
    if (isInitialLoad) {
      setAnimationState('hidden');
      setHasAnimatedIn(false);
    }
  }, [isInitialLoad]);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    // Handle initial load animation
    if (isInitialLoad && !hasAnimatedIn) {
      const delay = getCardDelay(index);
      
      timeoutRef.current = setTimeout(() => {
        setAnimationState('entering');
        setHasAnimatedIn(true);
        
        // After animation completes, set to visible
        setTimeout(() => {
          setAnimationState('visible');
        }, FEED_ANIMATION_CONFIG.duration.fadeIn);
      }, delay);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }

    // If already animated in during initial load, skip intersection observer setup
    if (hasAnimatedIn) {
      setAnimationState('visible');
      return;
    }

    // Setup Intersection Observer for scroll-based animations
    const observerOptions = {
      threshold: FEED_ANIMATION_CONFIG.observer.threshold,
      rootMargin: FEED_ANIMATION_CONFIG.observer.rootMargin
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { boundingClientRect, isIntersecting } = entry;
        
        if (isIntersecting) {
          // Card is entering viewport from bottom
          if (!hasAnimatedIn) {
            setAnimationState('entering');
            setHasAnimatedIn(true);
            
            setTimeout(() => {
              setAnimationState('visible');
            }, FEED_ANIMATION_CONFIG.duration.fadeIn);
          } else {
            setAnimationState('visible');
          }
        } else if (hasAnimatedIn && boundingClientRect.top < 0) {
          // Card is leaving viewport at the top
          setAnimationState('exiting');
        }
      });
    }, observerOptions);

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [index, isInitialLoad, hasAnimatedIn]);

  // Generate inline styles for animation variables
  const animationStyles = {
    '--slide-distance': `${FEED_ANIMATION_CONFIG.distance.slideUp}px`,
    '--slide-distance-exit': `${FEED_ANIMATION_CONFIG.distance.slideUpExit}px`,
    '--duration-fade': `${FEED_ANIMATION_CONFIG.duration.fadeIn}ms`,
    '--duration-slide': `${FEED_ANIMATION_CONFIG.duration.slideUp}ms`,
    '--duration-fade-exit': `${FEED_ANIMATION_CONFIG.duration.fadeOut}ms`,
    '--duration-slide-exit': `${FEED_ANIMATION_CONFIG.duration.slideUpExit}ms`,
    '--easing-enter': FEED_ANIMATION_CONFIG.easing.enter,
    '--easing-exit': FEED_ANIMATION_CONFIG.easing.exit
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.animatedCard} ${styles[animationState]}`}
      style={animationStyles}
    >
      {children}
    </div>
  );
};

export default AnimatedFeedCard;
