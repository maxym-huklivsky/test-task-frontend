import React from 'react';
import { MdDelete } from 'react-icons/md';
import { RxUpdate } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsSave } from 'react-icons/bs';
import { GiClick } from 'react-icons/gi';
import { format } from 'date-fns';

import { deleteCustomer, getAllCustomers, updateCustomer } from '../../business-logic/customers';
import toastifyError from '../../helpers/toastifyError';
import { selectPage } from '../../redux/customer/selectors';
import { setCustomers } from '../../redux/customer/slice';
import Loader from '../Loader';

import css from './CustomerRow.module.css';

const CustomerRow = ({ name, surname, email, phone, eventsCount, nextEventDate, _id }) => {
  const [updateRegime, setUpdateRegime] = React.useState(false);
  const [nameValue, setNameValue] = React.useState(name);
  const [surnameValue, setSurNameValue] = React.useState(surname);
  const [phoneValue, setPhoneValue] = React.useState(phone);
  const [emailValue, setEmailValue] = React.useState(email);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = React.useState(false);

  const formatNextEventDate =
    nextEventDate !== 'no date'
      ? format(new Date(nextEventDate), 'dd MMMM yyyy, HH:mm')
      : 'no date';

  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  const fetchCustomers = async () => {
    const result = await getAllCustomers(page);
    const { data, totalPages } = result.data;

    dispatch(setCustomers({ data, totalPages }));
  };

  const onDelete = async () => {
    try {
      setIsDeleteLoading(true);

      await deleteCustomer(_id);

      await fetchCustomers();
    } catch (error) {
      toastifyError(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const onUpdate = () => {
    setUpdateRegime((state) => !state);
  };

  const onSave = async () => {
    try {
      setIsUpdateLoading(true);

      const data = {
        name: nameValue.trim(),
        surname: surnameValue.trim(),
        phone: phoneValue.trim(),
        email: emailValue.trim(),
      };

      await updateCustomer({
        id: _id,
        data,
      });

      await fetchCustomers();

      setUpdateRegime(false);
    } catch (error) {
      toastifyError(error);
    } finally {
      setIsUpdateLoading(false);
    }
  };

  return (
    <tr>
      <td className={css.nameDrawer}>
        {updateRegime ? (
          <>
            <input
              placeholder="Name"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            />
            <input
              placeholder="Surname"
              value={surnameValue}
              onChange={(e) => setSurNameValue(e.target.value)}
            />
          </>
        ) : (
          <Link className={css.link} to={`${_id}`}>
            {`${name} ${surname}`} <GiClick />
          </Link>
        )}
      </td>
      <td className={css.drawer}>
        {updateRegime ? (
          <input
            placeholder="Email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        ) : (
          email
        )}
      </td>
      <td className={css.drawer}>
        {updateRegime ? (
          <input
            placeholder="Phone"
            value={phoneValue}
            onChange={(e) => setPhoneValue(e.target.value)}
          />
        ) : (
          phone
        )}
      </td>
      <td className={css.drawer}>{eventsCount}</td>
      <td className={css.drawer}>{formatNextEventDate}</td>
      <td className={css.iconBox}>
        {nameValue !== name ||
        surnameValue !== surname ||
        phoneValue !== phone ||
        emailValue !== email ? (
          <button className={css.iconButton} onClick={onSave}>
            {isUpdateLoading ? <Loader /> : <BsSave className={css.icon} />}
          </button>
        ) : (
          <button className={css.iconButton} onClick={onUpdate}>
            <RxUpdate className={css.icon} />
          </button>
        )}
      </td>
      <td className={css.iconBox}>
        <button className={css.iconButton} onClick={onDelete}>
          {isDeleteLoading ? <Loader /> : <MdDelete className={css.icon} />}
        </button>
      </td>
    </tr>
  );
};

export default CustomerRow;
