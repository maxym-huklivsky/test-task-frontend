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
import { maxLengthOfName, minLengthOfName } from '../../consts/length';
import Loader from '../Loader';

const CreateCustomerForm = ({ setActive }) => {
  const page = useSelector(selectPage);
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (e) => {
    try {
      setIsLoading(true);

      await createCustomer(e);

      const result = await getAllCustomers(page);
      const { data, totalPages } = result.data;

      dispatch(setCustomers({ data, totalPages }));

      setActive(false);
      reset();
    } catch (error) {
      toastifyError(error);
    } finally {
      setIsLoading(false);
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
            required: { value: true, message: 'This field is required' },
            minLength: { value: minLengthOfName, message: `Minimum ${minLengthOfName} characters` },
            maxLength: {
              value: maxLengthOfName,
              message: `Maximum ${maxLengthOfName} characters`,
            },
          })}
        />
        <label className={css.label} htmlFor="1">
          Name
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
            required: { value: true, message: 'This field is required' },
            minLength: { value: minLengthOfName, message: `Minimum ${minLengthOfName} characters` },
            maxLength: {
              value: 15,
              message: `Maximum ${15} characters`,
            },
          })}
        />
        <label className={css.label} htmlFor="2">
          Surname
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
            required: { value: true, message: 'This field is required' },
            pattern: { value: emailRegExp, message: 'Input correct email addres' },
          })}
        />
        <label className={css.label} htmlFor="3">
          Email
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
            required: { value: true, message: 'This field is required' },
            pattern: {
              value: phoneRegExp,
              message: 'Input correct phone number. Example: 1234567890',
            },
          })}
        />
        <label className={css.label} htmlFor="4">
          Phone
        </label>
        {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        <AiFillPhone className={css.inputIcon} />
      </div>

      <Button type="submit">
        <span>Save</span> {isLoading ? <Loader /> : <VscSaveAs />}
      </Button>
    </form>
  );
};

export default CreateCustomerForm;
