/**
 * LoadingSquare Component
 * 
 * A simple loading animation using a single SVG square that animates opacity.
 * The square continuously loops (0 → 1 → 0) while loading, and gracefully
 * completes the current cycle before stopping when loading ends.
 * 
 * @param {boolean} isLoading - Controls whether the animation is running
 * @param {number} size - Square size in pixels (default: 40)
 * @param {string} color - Fill color for the square (default: var(--color-brand))
 * @param {number} cornerRadius - Corner radius for the square (default: 4)
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getLoadingConfig } from './motionConfig';
import styles from './LoadingSquare.module.css';

export default function LoadingSquare({
  isLoading = true,
  size,
  color = 'var(--color-primary)',
  cornerRadius,
}) {
  const config = getLoadingConfig('square');
  
  // Use config defaults if not provided
  const finalSize = size ?? config.defaultSize;
  const finalCornerRadius = cornerRadius ?? config.defaultCornerRadius;
  const [animationState, setAnimationState] = useState('loading');

  useEffect(() => {
    if (isLoading) {
      setAnimationState('loading');
    } else {
      setAnimationState('completing');
    }
  }, [isLoading]);

  // Animation variants for different states
  const variants = {
    loading: {
      opacity: config.opacityKeyframes,
      transition: {
        duration: config.duration / 1000, // Convert milliseconds to seconds for Framer Motion
        ease: config.ease,
        repeat: Infinity,
        repeatType: "loop"
      }
    },
    completing: {
      opacity: 0,
      transition: {
        duration: config.fadeOutDuration / 1000, // Fixed 500ms fade-out (ms to seconds)
        ease: config.ease
      }
    }
  };

  return (
    <div className={styles.container}>
      <svg
        width={finalSize}
        height={finalSize}
        viewBox={`0 0 ${finalSize} ${finalSize}`}
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <motion.rect
          x="0"
          y="0"
          width={finalSize}
          height={finalSize}
          rx={finalCornerRadius}
          ry={finalCornerRadius}
          fill={color}
          variants={variants}
          animate={animationState}
          initial={{ opacity: 0 }}
        />
      </svg>
    </div>
  );
}
