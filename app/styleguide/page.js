'use client';

import { useState, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styles from './page.module.css';

// Token data organized by category
const TOKENS = {
  colors: {
    title: 'Colors',
    description: 'Core color palette. Values adapt across themes.',
    tokens: [
      { name: '--color-logo', label: 'Logo', light: '#000000', ocean: '#284367', dark: '#FFFFFF' },
      { name: '--color-primary', label: 'Primary', light: '#1e293b', ocean: '#284367', dark: '#E8E8E8' },
      { name: '--color-action', label: 'Action (CTA)', light: '#1e293b', ocean: '#294F9F', dark: '#60A5FA' },
      { name: '--color-action-hover', label: 'Action Hover', light: '#334155', ocean: '#1e3d7a', dark: '#93C5FD' },
      { name: '--color-text-primary', label: 'Text Primary', light: '#2d2d2d', ocean: '#284367', dark: '#E5E5E5' },
      { name: '--color-text-secondary', label: 'Text Secondary', light: '#626367', ocean: '#4a6489', dark: '#A8A8A8' },
      { name: '--color-text-light', label: 'Text Light', light: '#aaacb0', ocean: '#8aa3c4', dark: '#6B6B6B' },
      { name: '--color-background', label: 'Background', light: '#fcfcfc', ocean: '#F7FCFF', dark: '#10141d' },
      { name: '--color-white', label: 'Surface', light: '#FFFFFF', ocean: '#FFFFFF', dark: '#131623' },
      { name: '--color-border', label: 'Border', light: '#E5E7EB', ocean: '#d4e4f1', dark: '#272b3b' },
      { name: '--color-border-light', label: 'Border Light', light: '#f2f3f6', ocean: '#e8f2fa', dark: '#212639' },
    ]
  },
  spacing: {
    title: 'Spacing',
    description: 'Consistent spacing scale for margins, padding, and gaps.',
    tokens: [
      { name: '--spacing-2xs', label: '2XS', value: '0.1rem', px: '2px' },
      { name: '--spacing-xs', label: 'XS', value: '0.25rem', px: '4px' },
      { name: '--spacing-sm', label: 'SM', value: '0.5rem', px: '8px' },
      { name: '--spacing-md', label: 'MD', value: '1rem', px: '16px' },
      { name: '--spacing-lg', label: 'LG', value: '1.5rem', px: '24px' },
      { name: '--spacing-xl', label: 'XL', value: '2rem', px: '32px' },
      { name: '--spacing-2xl', label: '2XL', value: '3rem', px: '48px' },
      { name: '--spacing-3xl', label: '3XL', value: '4rem', px: '64px' },
    ]
  },
  radius: {
    title: 'Border Radius',
    description: 'Corner radius scale for cards, buttons, and inputs.',
    tokens: [
      { name: '--radius-sm', label: 'SM', value: '0.25rem', px: '4px' },
      { name: '--radius-md', label: 'MD', value: '0.5rem', px: '8px' },
      { name: '--radius-lg', label: 'LG', value: '0.75rem', px: '12px' },
      { name: '--radius-xl', label: 'XL', value: '1rem', px: '16px' },
      { name: '--radius-full', label: 'Full', value: '9999px', px: 'Circle' },
    ]
  },
  typography: {
    title: 'Typography',
    description: 'Font sizes for consistent text hierarchy. Display tier (h1-h2) uses thin weight, content tier (h3-h6) uses normal.',
    tokens: [
      { name: '--font-size-2xs', label: '2XS', value: '0.6875rem', px: '11px' },
      { name: '--font-size-xs', label: 'XS', value: '0.75rem', px: '12px' },
      { name: '--font-size-sm', label: 'SM', value: '0.875rem', px: '14px' },
      { name: '--font-size-base', label: 'Base', value: '1rem', px: '16px' },
      { name: '--font-size-lg', label: 'LG', value: '1.125rem', px: '18px' },
      { name: '--font-size-xl', label: 'XL (Cards)', value: '1.3125rem', px: '21px' },
      { name: '--font-size-2xl', label: '2XL', value: '1.5rem', px: '24px' },
      { name: '--font-size-3xl', label: '3XL', value: '2rem', px: '32px' },
      { name: '--font-size-4xl', label: '4XL', value: '2.5rem', px: '40px' },
      { name: '--font-size-5xl', label: '5XL (Hero)', value: '3rem', px: '48px' },
      { name: '--font-size-6xl', label: '6XL (Display)', value: '3.5rem', px: '56px' },
    ]
  },
  weights: {
    title: 'Font Weights',
    description: 'Weight variations for emphasis and hierarchy. Thin/light for large display text.',
    tokens: [
      { name: '--font-weight-thin', label: 'Thin', value: '100' },
      { name: '--font-weight-light', label: 'Light', value: '300' },
      { name: '--font-weight-normal', label: 'Normal', value: '400' },
      { name: '--font-weight-medium', label: 'Medium', value: '500' },
      { name: '--font-weight-semibold', label: 'Semibold', value: '600' },
      { name: '--font-weight-bold', label: 'Bold', value: '700' },
    ]
  },
  shadows: {
    title: 'Shadows',
    description: 'Elevation and depth using subtle shadows.',
    tokens: [
      { name: '--shadow-sm', label: 'Small', value: '0 1px 2px 0 var(--color-shadow-light)' },
      { name: '--shadow-md', label: 'Medium', value: '0 4px 6px -1px var(--color-shadow-light)' },
      { name: '--shadow-lg', label: 'Large', value: '0 10px 15px -3px var(--color-shadow-light)' },
    ]
  },
  transitions: {
    title: 'Transitions',
    description: 'Animation timing for smooth interactions.',
    tokens: [
      { name: '--transition-fast', label: 'Fast', value: '150ms', desc: 'Micro interactions' },
      { name: '--transition-base', label: 'Base', value: '250ms', desc: 'Standard transitions' },
      { name: '--transition-slow', label: 'Slow', value: '500ms', desc: 'Page transitions' },
    ]
  },
};

// Copyable token component
function TokenItem({ token, type, currentTheme }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  const getDisplayValue = () => {
    if (token.light) {
      return token[currentTheme] || token.light;
    }
    return token.value;
  };

  const isColor = type === 'colors';
  const displayValue = getDisplayValue();

  return (
    <button
      className={`${styles.tokenItem} ${copied ? styles.copied : ''}`}
      onClick={() => handleCopy(token.name)}
      title={`Click to copy: ${token.name}`}
    >
      {isColor && (
        <div
          className={styles.colorSwatch}
          style={{ backgroundColor: `var(${token.name})` }}
        />
      )}
      <div className={styles.tokenInfo}>
        <span className={styles.tokenLabel}>{token.label}</span>
        <code className={styles.tokenName}>{token.name}</code>
        <span className={styles.tokenValue}>
          {displayValue}
          {token.px && <span className={styles.pxValue}> ({token.px})</span>}
        </span>
      </div>
      <div className={styles.copyIndicator}>
        {copied ? (
          <CheckIcon sx={{ fontSize: 16 }} />
        ) : (
          <ContentCopyIcon sx={{ fontSize: 14 }} />
        )}
      </div>
    </button>
  );
}

// Theme selector component
function ThemeSelector({ themes, currentTheme, onThemeChange }) {
  return (
    <div className={styles.themeSelector}>
      {themes.map((t) => (
        <button
          key={t.id}
          className={`${styles.themeButton} ${currentTheme === t.id ? styles.active : ''}`}
          onClick={() => onThemeChange(t.id)}
        >
          <span className={styles.themeIcon}>{t.icon}</span>
          <span className={styles.themeLabel}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function DesignSystemPage() {
  const { theme, themes, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('colors');

  const sections = Object.keys(TOKENS);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Design System</h1>
          <p className={styles.subtitle}>
            Token reference for GTM Workspace. Click any token to copy.
          </p>
        </div>
        <ThemeSelector
          themes={themes}
          currentTheme={theme}
          onThemeChange={setTheme}
        />
      </header>

      {/* Navigation */}
      <nav className={styles.nav}>
        {sections.map((section) => (
          <a
            key={section}
            href={`#${section}`}
            className={`${styles.navLink} ${activeSection === section ? styles.active : ''}`}
            onClick={() => setActiveSection(section)}
          >
            {TOKENS[section].title}
          </a>
        ))}
      </nav>

      {/* Main Content */}
      <main className={styles.main}>
        {sections.map((sectionKey) => {
          const section = TOKENS[sectionKey];
          return (
            <section key={sectionKey} id={sectionKey} className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <p className={styles.sectionDescription}>{section.description}</p>
              </div>

              <div className={`${styles.tokenGrid} ${styles[`grid${sectionKey}`]}`}>
                {section.tokens.map((token) => (
                  <TokenItem
                    key={token.name}
                    token={token}
                    type={sectionKey}
                    currentTheme={theme}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* Color Palette Preview */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Theme Preview</h2>
            <p className={styles.sectionDescription}>
              Current theme: <strong>{themes.find(t => t.id === theme)?.label}</strong>
            </p>
          </div>

          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <div className={styles.previewLogo}>Z</div>
              <span className={styles.previewTitle}>Sample Interface</span>
            </div>
            <div className={styles.previewBody}>
              <h3 className={styles.previewHeading}>Content Title</h3>
              <p className={styles.previewText}>
                This is secondary text that provides additional context. Notice how the colors adapt to the current theme.
              </p>
              <div className={styles.previewButtons}>
                <button className={styles.previewButtonPrimary}>Primary Action</button>
                <button className={styles.previewButtonSecondary}>Secondary</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>GTM Workspace Design System</p>
        <p className={styles.footerNote}>
          Tokens are defined in <code>globals.css</code>
        </p>
      </footer>
    </div>
  );
}
