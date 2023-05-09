import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';

import css from './ErrorMessage.module.css';

const ErrorMessage = ({ children }) => {
  return (
    <span className={css.message}>
      <BiErrorCircle />
      {children}
    </span>
  );
};

export default ErrorMessage;
