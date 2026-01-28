'use client';

import { useState } from 'react';
import { getCompanyLogo } from '@/utils/companyLogos';
import styles from './CompanyLogo.module.css';

/**
 * CompanyLogo - Displays company logo with automatic lookup and fallback
 * @param {string} name - Company name (required for initials fallback)
 * @param {string} logo - Optional explicit logo URL (overrides automatic lookup)
 * @param {string} size - Size variant: 'small' | 'medium' | 'large'
 */
const CompanyLogo = ({ name, logo, size = 'medium' }) => {
  const [imageError, setImageError] = useState(false);

  // Use explicit logo, or look up from utility, or null
  const logoUrl = logo || getCompanyLogo(name);

  // Get initials for placeholder
  const getInitials = () => {
    if (!name) return '?';
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const showPlaceholder = !logoUrl || imageError;

  return (
    <div className={`${styles.logoContainer} ${styles[size]}`}>
      {showPlaceholder ? (
        <div className={styles.placeholder}>
          {getInitials()}
        </div>
      ) : (
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className={styles.logo}
          onError={handleImageError}
        />
      )}
    </div>
  );
};

export default CompanyLogo;
