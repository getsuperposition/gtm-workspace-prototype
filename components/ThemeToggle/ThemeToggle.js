'use client';

import { useTheme } from '@/contexts/ThemeContext';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import styles from './ThemeToggle.module.css';

const THEME_ICONS = {
  light: LightModeOutlinedIcon,
  ocean: WaterDropOutlinedIcon,
  dark: DarkModeOutlinedIcon,
};

export default function ThemeToggle() {
  const { theme, currentTheme, toggleTheme, themes } = useTheme();

  // Get the next theme for the tooltip
  const currentIndex = themes.findIndex(t => t.id === theme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];

  const IconComponent = THEME_ICONS[theme] || LightModeOutlinedIcon;

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme.label} theme`}
      className={`btn btn-ghost btn-icon-only btn-xl ${styles.toggleButton}`}
      title={`Current: ${currentTheme.label}. Click for ${nextTheme.label}`}
    >
      <IconComponent sx={{ fontSize: 20 }} />
    </button>
  );
}
