import styles from './modal.module.css';

export default function ModalOverlay({ handleClick }: { handleClick: () => void }) {
  return <div className={styles.overlay} onClick={handleClick} />;
}
