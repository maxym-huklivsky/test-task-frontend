import React from 'react';

import css from './Button.module.css';

const Button = ({ children, centering, ...props }) => {
  return (
    <button className={css.button} style={{ margin: centering ? '0 auto' : 0 }} {...props}>
      {children}
    </button>
  );
};

export default Button;
