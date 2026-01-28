'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import AppIcon from './AppIcon';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Feed', path: '/', icon: PodcastsIcon },
    { name: 'Views', path: '/views', icon: GridViewOutlinedIcon },
    { name: 'Meetings', path: '/meetings', icon: EventOutlinedIcon },
    { name: 'Chats', path: '/chats', icon: ChatBubbleOutlineIcon },
    { name: 'Notes', path: '/notes', icon: StickyNote2OutlinedIcon },
  ];

  const handleNavClick = (e, item) => {
    // Special handling for Views - dispatch custom event to open drawer
    if (item.name === 'Views') {
      // Dispatch custom event that the Views page will listen for
      window.dispatchEvent(new CustomEvent('openViewsDrawer'));
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <AppIcon className={styles.appIcon} />
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            // Check if current path matches or starts with the nav item path
            const isActive = pathname === item.path ||
                           (item.path !== '/' && pathname.startsWith(item.path));
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`${styles.navItem} ${
                    isActive ? styles.active : ''
                  }`}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  <span className={styles.icon}>
                    <IconComponent sx={{ fontSize: 24 }} />
                  </span>
                  <span className={styles.label}>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.bottomSection}>
        <ThemeToggle />
        <div className={styles.userAvatar}>
          <span className={styles.avatarText}>RB</span>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
