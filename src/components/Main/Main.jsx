import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button/Button';
import CreateUserForm from '../Forms/CreateCustomerForm';
import Modal from '../Modal/Modal';
import UsersTable from '../CustomersTable/CustomersTable';
import PaginationForCustomers from '../Pagination/PaginationForCustomers';
import { getAllCustomers } from '../../business-logic/customers';
import { selectCustomers, selectPage } from '../../redux/customer/selectors';
import { setCustomers } from '../../redux/customer/slice';
import EmptyMessage from '../EmptyMessage/EmptyMessage';

import css from './Main.module.css';

const Main = () => {
  const [activeModal, setActiveModal] = React.useState(false);
  const customers = useSelector(selectCustomers);
  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchCustomers = async () => {
      const result = await getAllCustomers(page);
      const { data, totalPages } = result.data;

      dispatch(setCustomers({ data, totalPages }));
    };

    fetchCustomers();
  }, [dispatch, page]);

  return (
    <>
      <div>
        <div className={css.buttonWrap}>
          <Button centering type="button" onClick={() => setActiveModal(true)}>
            <span>Create customer</span>
            <AiOutlinePlus />
          </Button>
        </div>
        {customers.length !== 0 ? (
          <>
            <UsersTable centering customers={customers} />
            <PaginationForCustomers />
          </>
        ) : (
          <EmptyMessage>Create your first customer!</EmptyMessage>
        )}
      </div>

      <Modal active={activeModal} setActive={setActiveModal}>
        <CreateUserForm setActive={setActiveModal} />
      </Modal>
    </>
  );
};

export default Main;
