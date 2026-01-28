'use client';

import styles from './Icon.module.css';

/**
 * Icon - A reusable icon wrapper component
 * Provides consistent styling and hover behavior for icons across the app
 * 
 * @param {ReactNode} children - The icon component to render (e.g., MUI icon)
 * @param {string} size - Size variant: 'sm' (32px), 'md' (36px), 'lg' (40px)
 * @param {string} className - Additional CSS classes to apply
 * @param {string} align - Alignment: 'center' (default), 'flex-start'
 */
const Icon = ({ 
  children,
  size = 'md',
  className = '',
  align = 'center'
}) => {
  const sizeClass = styles[`size-${size}`] || styles['size-md'];
  const alignClass = styles[`align-${align}`] || styles['align-center'];
  
  return (
    <div className={`${styles.iconWrapper} ${sizeClass} ${alignClass} ${className}`}>
      {children}
    </div>
  );
};

export default Icon;
