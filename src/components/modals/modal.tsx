import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { type JSX, useEffect } from 'react';
import { createPortal } from 'react-dom';

import ModalOverlay from './modal-overlay';

import styles from './modal.module.css';

type ModalProps = {
  title?: string;
  children: JSX.Element;
  onClose: () => void;
};

function Modal({ children, title, onClose }: ModalProps) {
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay handleClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className="text text_type_main-medium">{title}</div>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </div>
    </>,
    document.body
  );
}

export default Modal;
