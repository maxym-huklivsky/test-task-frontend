import React from 'react';

import css from './AuthComponent.module.css';

const AuthComponent = ({ children, formType }) => {
  return (
    <div className={css.root}>
      <h2 className={css.title}>{formType} Form</h2>

      {children}
    </div>
  );
};

export default AuthComponent;
