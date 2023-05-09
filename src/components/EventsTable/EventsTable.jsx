import React from 'react';
import { AiOutlineClear } from 'react-icons/ai';

import EventRow from '../EventRow/EventRow';

import css from './EventsTable.module.css';

const EventsTable = ({ centering, events }) => {
  return (
    <div className={css.root}>
      <table className={css.table} style={{ margin: centering ? '0 auto' : 0 }}>
        <thead>
          <tr>
            <th className={css.title}>Title</th>
            <th className={css.title}>Description</th>
            <th className={css.title}>Start Date</th>
            <th className={css.title}>End Date</th>
            <th className={css.iconBox}>
              <AiOutlineClear className={css.icon} />
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <EventRow key={event._id} {...event} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
