'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Available themes
export const THEMES = [
  { id: 'light', label: 'Light', icon: '☀️' },
  { id: 'ocean', label: 'Ocean', icon: '🌊' },
  { id: 'dark', label: 'Dark', icon: '🌙' },
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('ocean');
  const [mounted, setMounted] = useState(false);

  // On mount: Load theme from localStorage or default to ocean
  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme && THEMES.find(t => t.id === savedTheme)) {
      setTheme(savedTheme);
    }
    // Default stays as 'ocean' if no saved preference
  }, []);

  // When theme changes: Update DOM attribute and localStorage
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  // Cycle through themes
  const toggleTheme = () => {
    const currentIndex = THEMES.findIndex(t => t.id === theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex].id);
  };

  // Set specific theme
  const setThemeById = (themeId) => {
    if (THEMES.find(t => t.id === themeId)) {
      setTheme(themeId);
    }
  };

  // Get current theme object
  const currentTheme = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <ThemeContext.Provider value={{
      theme,
      themes: THEMES,
      currentTheme,
      toggleTheme,
      setTheme: setThemeById,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
