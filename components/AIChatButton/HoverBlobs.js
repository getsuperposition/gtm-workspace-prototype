'use client';

import { motion } from 'framer-motion';

/**
 * Animated blob shapes for chat button hover state
 * Updated with Anita's refined settings:
 * - Reduced opacity (40-60%)
 * - Reduced blur (8px, 4px, 2px, 1px)
 * - Adjusted gradients
 */
const HoverBlobs = ({ className, isVisible }) => (
  <svg
    className={className}
    viewBox="0 0 37 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ overflow: 'visible' }}
  >
    <defs>
      {/* Glow filter - blur(8px) */}
      <filter id="filter_glow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="4" result="blur"/>
      </filter>
      {/* Back filter - blur(4px) */}
      <filter id="filter_back" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="2" result="blur"/>
      </filter>
      {/* Middle filter - blur(2px) */}
      <filter id="filter_middle" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="1" result="blur"/>
      </filter>
      {/* Front filter - blur(1px) */}
      <filter id="filter_front" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="0.5" result="blur"/>
      </filter>

      {/* Glow gradient - #EA1B15 @ 60% */}
      <linearGradient id="paint_glow" x1="34.0345" y1="32.9656" x2="6.64282" y2="4.28564" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EA1B15" stopOpacity="0.6"/>
        <stop offset="0.495192" stopColor="#C61267" stopOpacity="0.6"/>
        <stop offset="1" stopColor="#C61267" stopOpacity="0"/>
      </linearGradient>
      {/* Back/Middle gradient */}
      <linearGradient id="paint_back" x1="27.6428" y1="5.55151" x2="2.39438" y2="32.3593" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EA1B15" stopOpacity="0"/>
        <stop offset="0.498513" stopColor="#EA1B15"/>
        <stop offset="1" stopColor="#A109BA" stopOpacity="0.8"/>
      </linearGradient>
      {/* Front gradient - #A109BA @ 80% */}
      <linearGradient id="paint_front" x1="-4.05479" y1="12.4365" x2="35.1499" y2="23.6412" gradientUnits="userSpaceOnUse">
        <stop offset="0.5" stopColor="#EA1B15" stopOpacity="0.8"/>
        <stop offset="1" stopColor="#EA1B15" stopOpacity="0"/>
      </linearGradient>
    </defs>

    {/* Glow layer - opacity 40%, blur 8px */}
    <motion.g
      opacity="0.4"
      filter="url(#filter_glow)"
      style={{ transformOrigin: '18.5px 17.5px', transformBox: 'fill-box' }}
      animate={isVisible ? { rotate: 360 } : { rotate: 0 }}
      transition={isVisible ? { duration: 8, repeat: Infinity, ease: 'linear' } : { duration: 0.2 }}
    >
      <path
        d="M4.95322 13.877C2.85179 5.48659 9.52204 -0.308318 17.5843 2.89561C18.6709 3.32669 19.7732 3.78022 20.8913 4.25397C22.4629 4.9208 23.9941 5.59885 25.4826 6.28364C33.5515 9.99948 37.1729 20.3589 32.2426 25.7564C31.5264 26.5422 30.7564 27.3213 29.9302 28.0892C28.5853 29.3398 27.2158 30.4399 25.8553 31.4099C19.9124 35.6399 10.0452 30.7902 7.35999 22.3459C6.68196 20.2107 6.03088 17.9947 5.42245 15.7001C5.2608 15.0871 5.10364 14.4809 4.95322 13.8792V13.877Z"
        fill="url(#paint_glow)"
      />
    </motion.g>

    {/* Back layer - opacity 60%, blur 4px */}
    <motion.g
      opacity="0.6"
      filter="url(#filter_back)"
      style={{ transformOrigin: '18.5px 17.5px', transformBox: 'fill-box' }}
      animate={isVisible ? { rotate: -360 } : { rotate: 0 }}
      transition={isVisible ? { duration: 6, repeat: Infinity, ease: 'linear' } : { duration: 0.2 }}
    >
      <path
        d="M21.1246 3.42769C29.4898 1.22831 35.3623 7.83035 32.2529 15.9295C31.8345 17.0211 31.3939 18.1287 30.9333 19.2522C30.2848 20.8315 29.6247 22.3705 28.9574 23.8669C25.3361 31.9787 15.0198 35.721 9.56498 30.8541C8.77084 30.1472 7.9828 29.3862 7.20533 28.5691C5.9391 27.239 4.82301 25.8824 3.83724 24.5333C-0.461942 18.6403 4.27204 8.717 12.6843 5.9333C14.8115 5.23036 17.0197 4.55341 19.3071 3.9182C19.9181 3.7494 20.5224 3.58516 21.1223 3.42771L21.1246 3.42769Z"
        fill="url(#paint_back)"
      />
    </motion.g>

    {/* Middle layer - opacity 60%, blur 2px */}
    <motion.g
      opacity="0.6"
      filter="url(#filter_middle)"
      style={{ transformOrigin: '18.5px 17.5px', transformBox: 'fill-box' }}
      animate={isVisible ? { rotate: 360 } : { rotate: 0 }}
      transition={isVisible ? { duration: 10, repeat: Infinity, ease: 'linear' } : { duration: 0.2 }}
    >
      <path
        d="M30.1105 15.5813C35.601 22.2648 32.0529 30.357 23.3952 30.9122C22.2286 30.9877 21.0382 31.0497 19.825 31.1001C18.1192 31.1701 16.4452 31.2126 14.8068 31.2308C5.92387 31.3263 -1.78306 23.5138 0.36253 16.5254C0.673452 15.5086 1.03596 14.4749 1.45399 13.4273C2.13413 11.7215 2.90097 10.141 3.71543 8.68206C7.27586 2.31547 18.2694 2.47505 24.3104 8.95741C25.8371 10.5969 27.3741 12.321 28.9061 14.1344C29.3145 14.6192 29.716 15.0998 30.1095 15.5792L30.1105 15.5813Z"
        fill="url(#paint_front)"
      />
    </motion.g>

    {/* Center sparkle (white) - static, no rotation */}
    <path
      d="M16.8667 10.2272C16.9341 9.96214 17.3517 9.96209 17.4192 10.2272C18.5235 14.5659 20.5572 16.6112 24.9211 17.724C25.1859 17.7916 25.1859 18.2084 24.9211 18.2759C20.556 19.3887 18.5223 21.434 17.4189 25.7728C17.3515 26.0379 16.9339 26.0379 16.8664 25.7728C15.7622 21.4342 13.7287 19.388 9.36533 18.2759C9.10047 18.2084 9.10043 17.7914 9.36528 17.7239C13.7298 16.6111 15.7634 14.5657 16.8667 10.2272Z"
      fill="white"
    />
  </svg>
);

export default HoverBlobs;
