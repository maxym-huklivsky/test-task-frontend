import React from 'react';

import css from './EmptyMessage.module.css';

const EmptyMessage = ({ children }) => {
  return <div className={css.root}>{children}</div>;
};

export default EmptyMessage;
