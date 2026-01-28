'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styles from './ViewsDrawer.module.css';

const ViewsDrawer = ({
  title = "Views",
  items = [],
  isOpen = false,
  onToggle,
  selectedId = null,
  onSelectItem,
  showSearch = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const handleItemClick = (item) => {
    if (onSelectItem) {
      onSelectItem(item);
    }
  };

  // Filter items based on search query
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className={`${styles.drawer} ${isOpen ? styles.open : styles.collapsed}`}>
      {isOpen ? (
        <>
          {/* Drawer Header */}
          <div className={styles.header}>
            <h4>{title}</h4>
            <button
              className="btn btn-ghost btn-icon-only btn-sm"
              onClick={onToggle}
              aria-label="Collapse drawer"
            >
              <ChevronLeftOutlinedIcon sx={{ fontSize: 20 }} />
            </button>
          </div>

          {/* Search Input */}
          {showSearch && (
            <div className={styles.searchWrapper}>
              <div className={styles.searchInputWrapper}>
                <SearchOutlinedIcon 
                  className={styles.searchIcon} 
                  sx={{ fontSize: 16 }} 
                />
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Views List */}
          <div className={styles.listWrapper}>
            <ul className={styles.list}>
              {filteredItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/views/${item.id}`}
                    className={`${styles.listItem} ${
                      pathname === `/views/${item.id}` ? styles.active : ''
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.isShared && (
                      <span className={styles.sharedIcon}>
                        <GroupOutlinedIcon sx={{ fontSize: 14 }} />
                      </span>
                    )}
                    <span className={styles.itemName}>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        /* Collapsed State - Just the expand button */
        <div className={styles.collapsedContent}>
          <button
            className="btn btn-ghost btn-icon-only btn-sm"
            onClick={onToggle}
            aria-label="Expand drawer"
            style={{ backgroundColor: 'var(--color-white)', border: '0px solid var(--color-border)' }}
          >
            <ChevronRightOutlinedIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      )}
    </aside>
  );
};

export default ViewsDrawer;
