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
import Sort from '../Sort/Sort';

const Events = () => {
  const { customerId } = useParams();

  const [activeModal, setActiveModal] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('title');
  const [customer, setCustomer] = React.useState({});

  const events = useSelector(selectEvents);
  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await getAllEvents({ customerId, page, sortBy });

        dispatch(setEvents(data));
        setCustomer(data.customerInfo);
      } catch (error) {
        toastifyError(error);
      }
    };

    fetchEvents();
  }, [customerId, dispatch, page, sortBy]);

  return (
    <>
      <div>
        <div className={css.wrap}>
          <div className={css.buttonWrap}>
            <Button onClick={() => setActiveModal(true)}>
              <span>Create Event</span>
              <MdEventNote />
            </Button>
          </div>

          <Sort sort={sortBy} setSort={setSortBy} />
        </div>

        <div className={css.contentWrap}>
          <div className={css.customer}>
            <h2 className={css.customerTitle}>Customer Info:</h2>

            <div className={css.customerWrap}>
              <div className={css.customerInfo}>
                <span>Name: {customer?.name}</span>
                <span>Surname: {customer?.surname}</span>
                <span>Email: {customer?.email}</span>
                <span>Phone: {customer?.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {events.length !== 0 ? (
          <div>
            <div className={css.tableWrap}>
              <EventsTable centering events={events} />
            </div>
            <PaginationForEvents />
          </div>
        ) : (
          <EmptyMessage>Create your first event!</EmptyMessage>
        )}
      </div>

      <Link to="/customers" className={css.backButton}>
        <Button>
          <IoMdArrowRoundBack /> <span>Go back</span>
        </Button>
      </Link>

      <Modal active={activeModal} setActive={setActiveModal}>
        <CreateEventForm setActive={setActiveModal} />
      </Modal>
    </>
  );
};

export default Events;
