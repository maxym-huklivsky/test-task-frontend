import React from 'react';

import sortArray from '../../consts/sort';

import css from './Popup.module.css';

const Popup = ({ setSort, setOpen }) => {
  React.useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.event_popup') && !e.target.closest('.button_sort')) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handler);

    return () => {
      document.body.removeEventListener('click', handler);
    };
  }, [setOpen]);

  const handleClick = (i) => {
    setSort(sortArray[i]);
    setOpen(false);
  };

  return (
    <div className={`${css.popup} event_popup`}>
      {sortArray.map((value, ind) => (
        <div key={ind} className={css.sortItem} onClick={() => handleClick(ind)}>
          {value}
        </div>
      ))}
    </div>
  );
};

export default Popup;
