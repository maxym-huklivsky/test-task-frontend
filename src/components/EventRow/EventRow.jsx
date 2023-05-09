import React from 'react';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import { deleteEvent, getAllEvents } from '../../business-logic/events';
import toastifyError from '../../helpers/toastifyError';
import { selectPage } from '../../redux/events/selectors';
import { setEvents } from '../../redux/events/slice';

import css from './EventRow.module.css';

const EventRow = ({ title, description, startDate, endDate, _id }) => {
  const { customerId } = useParams();

  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  const formatStartDate = format(new Date(startDate), 'dd MMMM yyyy, HH:mm');
  const formatEndDate = format(new Date(endDate), 'dd MMMM yyyy, HH:mm');

  const fetchCustomers = async () => {
    const result = await getAllEvents({ customerId, page });
    const { data, totalPages } = result.data;

    dispatch(setEvents({ data, totalPages }));
  };

  const onDelete = async () => {
    try {
      await deleteEvent({ customerId, id: _id });

      await fetchCustomers();
    } catch (error) {
      toastifyError(error);
    }
  };

  return (
    <tr>
      <td className={css.drowers}>{title}</td>
      <td className={css.drowers}>
        <div className={css.description}>{description}</div>
      </td>
      <td className={css.drowers}>{formatStartDate}</td>
      <td className={css.drowers}>{formatEndDate}</td>
      <td className={css.iconBox}>
        <button onClick={onDelete} className={css.iconButton}>
          <MdDelete className={css.icon} />
        </button>
      </td>
    </tr>
  );
};

export default EventRow;
