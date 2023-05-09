import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Si1Password } from 'react-icons/si';
import { GiArchiveRegister } from 'react-icons/gi';

import { useDispatch } from 'react-redux';

import Button from '../Button/Button';
import { emailRegExp } from '../../consts/regexps';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import {
  maxLenghtOfPassword,
  maxLengthOfName,
  minLenghtOfPassword,
  minLengthOfName,
} from '../../consts/length';
import { authRegister } from '../../business-logic/auth';
import toastifyError from '../../helpers/toastifyError';
import { setAuthInfo } from '../../redux/auth/slice';
import { setAuthHeader } from '../../helpers/setHeaders';

import css from './Form.module.css';

const RegisterForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (e) => {
    try {
      const { data } = await authRegister(e);

      dispatch(setAuthInfo(data));
      setAuthHeader(data.token);

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
            required: { value: true, message: 'name is required' },
            minLength: {
              value: minLengthOfName,
              message: `minimum length is ${minLengthOfName} characters`,
            },
            maxLength: {
              value: maxLengthOfName,
              message: `maximum length is ${maxLengthOfName} characters`,
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
          type="email"
          placeholder=""
          className={css.input}
          id="3"
          {...register('email', {
            required: { value: true, message: 'email is required' },
            pattern: { value: emailRegExp, message: 'enter a valid email' },
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
          type="password"
          placeholder=""
          className={css.input}
          id="4"
          {...register('password', {
            required: { value: true, message: 'password is required' },
            minLength: {
              value: minLenghtOfPassword,
              message: `minimum length is ${minLenghtOfPassword} characters`,
            },
            maxLength: {
              value: maxLenghtOfPassword,
              message: `maximum length is ${maxLenghtOfPassword} characters `,
            },
          })}
        />
        <label className={css.label} htmlFor="4">
          Password
        </label>
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        <Si1Password className={css.inputIcon} />
      </div>

      <Button type="submit">
        <span>Sign up</span> <GiArchiveRegister />
      </Button>
    </form>
  );
};

export default RegisterForm;
