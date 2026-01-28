'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import { useChatContext } from '@/contexts/ChatContext';
import styles from './SearchBox.module.css';

const SearchBox = ({ staggerDelay = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { createChat } = useChatContext();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      // Create new chat with search source
      const newChatId = createChat(searchQuery.trim(), {
        type: 'search',
        actionLabel: null
      });
      
      // Clear input
      setSearchQuery('');
      
      // Navigate to chat detail page
      if (newChatId) {
        router.push(`/chats/${newChatId}`);
      }
    }
  };

  // Animation variants for staggered fade-in
  const fadeInVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }
  };

  // Using transition variables from globals.css (--transition-base: 250ms)
  const transition = {
    duration: 1.5,
    ease: [0.075, 0.82, 0.165, 1]
  };

  return (
    <div className={styles.searchContainer}>
      <div className="hero">
        <motion.span
          className="hero-eyebrow"
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
          transition={{ ...transition, delay: staggerDelay }}
        >
          Good morning, Katie
        </motion.span>
        <motion.h1
          className="hero-heading"
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
          transition={{ ...transition, delay: staggerDelay + 0.1 }}
        >
          What do you want to achieve today?
        </motion.h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <motion.div
          className={styles.inputWrapper}
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
          transition={{ ...transition, delay: staggerDelay + 0.2 }}
        >
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Ask anything about your accounts or contacts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-ghost btn-icon-only btn-xl" aria-label="Submit search" style={{ backgroundColor: 'var(--color-border-light)', color: 'var(--color-text-secondary)' }}>
            <ArrowUpwardOutlinedIcon sx={{ fontSize: 20 }} />
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default SearchBox;
