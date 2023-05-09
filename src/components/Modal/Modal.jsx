import React from 'react';
import { RiCloseLine } from 'react-icons/ri';

import css from './Modal.module.css';

const Modal = ({ children, active, setActive }) => {
  React.useEffect(() => {
    const onPressEsc = (e) => {
      if (e.code === 'Escape') {
        setActive(false);
      }
    };
    document.body.addEventListener('keydown', onPressEsc);

    return () => {
      document.body.removeEventListener('keydown', onPressEsc);
    };
  }, [setActive]);

  const onClickOnBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      setActive(false);
    }
  };

  return (
    <div className={`${css.backdrop} ${active ? css.active : ''}`} onClick={onClickOnBackdrop}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={() => setActive(false)}>
          <RiCloseLine className={css.closeIcon} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
