import React from 'react';
import { useForm } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';
import { Si1Password } from 'react-icons/si';
import { SlLogin } from 'react-icons/sl';
import { useDispatch } from 'react-redux';
import { HiCursorClick } from 'react-icons/hi';

import { emailRegExp } from '../../consts/regexps';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Button from '../Button/Button';
import { maxLenghtOfPassword, minLenghtOfPassword } from '../../consts/length';
import { authLogin } from '../../business-logic/auth';
import { setAuthInfo } from '../../redux/auth/slice';
import toastifyError from '../../helpers/toastifyError';
import { setAuthHeader } from '../../helpers/setHeaders';

import css from './Form.module.css';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (e) => {
    try {
      setIsLoading(true);

      const { data } = await authLogin(e);

      dispatch(setAuthInfo(data));
      setAuthHeader(data.token);

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
        <span>Sign in</span> {isLoading ? <Loader /> : <SlLogin />}
      </Button>

      <div className={css.haveAccountBlock}>
        <span>Don't have account?</span>

        <div className={css.createAccWrap}>
          <div className={css.createAcc}>
            <Link className={css.createAccLink} to="/register">
              Create account <HiCursorClick />
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
