import styles from './Tag.module.css';

const Tag = ({ label, variant = 'default', size = 'md' }) => {
  return (
    <span className={`${styles.tag} ${styles[variant]} ${styles[size]}`}>
      {label}
    </span>
  );
};

export default Tag;
