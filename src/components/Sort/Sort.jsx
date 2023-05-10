import React from 'react';
import { FaSort } from 'react-icons/fa';

import Button from '../Button/Button';
import Popup from '../Popup/Popup';

import css from './Sort.module.css';

const Sort = ({ sort, setSort }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={`${css.root} button_sort`}>
      <Button onClick={() => setOpen((state) => !state)}>
        <FaSort /> <span>Sort by: {sort}</span>
      </Button>

      {open && <Popup setSort={setSort} setOpen={setOpen} />}
    </div>
  );
};

export default Sort;
