import { Portal } from '../portal';

import styles from './custom-modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: string;
}

export const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, variant }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <span className={styles.closeButton} onClick={onClose}>
            &times;
          </span>
          <h2>Selected Variant</h2>
          <p>{variant}</p>
        </div>
      </div>
    </Portal>
  );
};
