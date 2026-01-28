'use client';

import styles from './ContactAvatar.module.css';

/**
 * Circular avatar component with initials
 * Features color-coded background based on name hash
 * 
 * @param {string} name - The contact name to display initials for
 * @param {string} size - Size variant ('sm', 'md', 'lg')
 */
export default function ContactAvatar({ name, size = 'md' }) {
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (name) => {
    // Hash name to consistent color using existing CSS variables
    const colors = [
      { bg: 'var(--color-brand-tint-medium)', text: 'var(--color-brand)' },           // Brand red tint
      { bg: 'var(--color-brand-purple-tint-medium)', text: 'var(--color-brand-purple)' },    // Brand purple tint
      { bg: 'var(--color-primary-tint-medium)', text: 'var(--color-primary)' },          // Primary dark tint
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const initials = getInitials(name);
  const colors = getAvatarColor(name);

  return (
    <div 
      className={`${styles.avatar} ${styles[size]}`}
      style={{
        backgroundColor: colors.bg,
        color: colors.text
      }}
      title={name}
    >
      {initials}
    </div>
  );
}
