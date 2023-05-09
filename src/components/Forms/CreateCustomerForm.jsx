import React from 'react';
import { useForm } from 'react-hook-form';
import { VscSaveAs } from 'react-icons/vsc';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AiFillPhone } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { emailRegExp, phoneRegExp } from '../../consts/regexps';
import toastifyError from '../../helpers/toastifyError';
import { createCustomer, getAllCustomers } from '../../business-logic/customers';
import { selectPage } from '../../redux/customer/selectors';
import { setCustomers } from '../../redux/customer/slice';

import css from './Form.module.css';

const CreateCustomerForm = ({ setActive }) => {
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (e) => {
    try {
      await createCustomer(e);

      const result = await getAllCustomers(page);
      const { data, totalPages } = result.data;

      dispatch(setCustomers({ data, totalPages }));

      setActive(false);
      reset();
    } catch (error) {
      toastifyError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={css.inputWrap}>
        <input
          placeholder=""
          className={css.input}
          id="1"
          {...register('name', {
            required: { value: true, message: 'Это поле обязательное' },
            minLength: { value: 3, message: 'минимум 3 символа' },
            maxLength: { value: 16, message: 'максимум 16 символов' },
          })}
        />
        <label className={css.label} htmlFor="1">
          Имя
        </label>
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        <FaUserAlt className={css.inputIcon} />
      </div>

      <div className={css.inputWrap}>
        <input
          placeholder=""
          className={css.input}
          id="2"
          {...register('surname', {
            required: { value: true, message: 'Это поле обязательное' },
            minLength: { value: 3, message: 'минимум 3 символа' },
            maxLength: { value: 16, message: 'максимум 16 символов' },
          })}
        />
        <label className={css.label} htmlFor="2">
          Фамилия
        </label>
        {errors.surname && <ErrorMessage>{errors.surname.message}</ErrorMessage>}
        <FaUserAlt className={css.inputIcon} />
      </div>

      <div className={css.inputWrap}>
        <input
          placeholder=""
          className={css.input}
          id="3"
          {...register('email', {
            required: { value: true, message: 'Это поле обязательное' },
            pattern: { value: emailRegExp, message: 'Введите корректную почту' },
          })}
        />
        <label className={css.label} htmlFor="3">
          Электронная почта
        </label>
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        <MdEmail className={css.inputIcon} />
      </div>

      <div className={css.inputWrap}>
        <input
          placeholder=""
          className={css.input}
          id="4"
          {...register('phone', {
            required: { value: true, message: 'Это поле обязательное' },
            pattern: { value: phoneRegExp, message: 'Введите корректный номер телефона' },
          })}
        />
        <label className={css.label} htmlFor="4">
          Номер телефона
        </label>
        {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        <AiFillPhone className={css.inputIcon} />
      </div>

      <Button type="submit">
        <span>Сохранить</span> <VscSaveAs />
      </Button>
    </form>
  );
};

export default CreateCustomerForm;
