import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdEventNote } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import EventsTable from '../EventsTable/EventsTable';
import Button from '../Button/Button';
import toastifyError from '../../helpers/toastifyError';
import Modal from '../Modal/Modal';
import CreateEventForm from '../Forms/CreateEventForm/CreateEventForm';
import { selectEvents, selectPage } from '../../redux/events/selectors';
import { getAllEvents } from '../../business-logic/events';
import { setEvents } from '../../redux/events/slice';
import PaginationForEvents from '../Pagination/PaginationForEvents';
import EmptyMessage from '../EmptyMessage/EmptyMessage';

import css from './Events.module.css';

const Events = () => {
  const { customerId } = useParams();

  const [activeModal, setActiveModal] = React.useState(false);
  const events = useSelector(selectEvents);
  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await getAllEvents({ customerId, page });

        dispatch(setEvents(data));
      } catch (error) {
        toastifyError(error);
      }
    };

    fetchEvents();
  }, [customerId, dispatch, page]);

  return (
    <>
      <div>
        <div className={css.buttonWrap}>
          <Button onClick={() => setActiveModal(true)}>
            <span>Create Event</span>
            <MdEventNote />
          </Button>
        </div>

        {events.length !== 0 ? (
          <>
            <div className={css.tableWrap}>
              <EventsTable centering events={events} />
            </div>
            <PaginationForEvents />
          </>
        ) : (
          <EmptyMessage>Create your first event!</EmptyMessage>
        )}
        <Link to="/customers" className={css.backButton}>
          <Button>
            <IoMdArrowRoundBack /> <span>Go back</span>
          </Button>
        </Link>
      </div>

      <Modal active={activeModal} setActive={setActiveModal}>
        <CreateEventForm setActive={setActiveModal} />
      </Modal>
    </>
  );
};

export default Events;
