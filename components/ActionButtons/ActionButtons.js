'use client';

import { motion } from 'framer-motion';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import styles from './ActionButtons.module.css';

const ActionButtons = ({ onActionClick, staggerDelay = 0 }) => {
  const buttons = [
    { label: 'Next best action', icon: TrackChangesOutlinedIcon },
    { label: 'View', icon: ViewListOutlinedIcon },
    { label: 'Meeting prep', icon: EventOutlinedIcon },
    { label: 'Email', icon: EmailOutlinedIcon },
    { label: 'Buyer engagement map', icon: GroupsOutlinedIcon },
  ];

  const handleButtonClick = (label) => {
    if (onActionClick) {
      onActionClick(label);
    }
  };

  // Animation variants for staggered fade-in
  const fadeInVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }
  };

  // Using transition variables from globals.css (--transition-base: 250ms)
  const transition = {
    duration: 0.25,
    ease: [0.075, 0.82, 0.165, 1]
  };

  return (
    <motion.div
      className={styles.actionButtonsContainer}
      variants={fadeInVariants}
      initial="initial"
      animate="animate"
      transition={{ ...transition, delay: staggerDelay }}
    >
      {buttons.map((button, index) => {
        const IconComponent = button.icon;
        return (
          <button
            key={index}
            className={styles.actionButton}
            aria-label={button.label}
            onClick={() => handleButtonClick(button.label)}
          >
            <span className={styles.buttonIcon}>
              <IconComponent sx={{ fontSize: 20 }} />
            </span>
            <span className={styles.buttonLabel}>{button.label}</span>
          </button>
        );
      })}
    </motion.div>
  );
};

export default ActionButtons;
