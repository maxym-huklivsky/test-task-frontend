import React from 'react';
import { BiCalendarEvent } from 'react-icons/bi';
import { Outlet } from 'react-router-dom';
import { RxAvatar } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { clearAuthHeader } from '../../helpers/setHeaders';
import { logout } from '../../redux/auth/slice';
import toastifyError from '../../helpers/toastifyError';
import { authLogout } from '../../business-logic/auth';
import Button from '../Button/Button';

import css from './Layout.module.css';

const Layout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { name, email } = useSelector(selectUser);
  const dispatch = useDispatch();

  const onLogout = async () => {
    try {
      await authLogout();

      dispatch(logout());
      clearAuthHeader();
    } catch (error) {
      toastifyError(error);
    }
  };

  return (
    <>
      <div className={css.root}>
        {isLoggedIn && (
          <Button onClick={onLogout}>
            <span>LogOut</span>
          </Button>
        )}
        <h1 className={css.title}>
          Events Application <BiCalendarEvent />
        </h1>
        {isLoggedIn && (
          <div className={css.authRoot}>
            <div className={css.authInfo}>
              <span>Name: {name}</span>
              <span>Email: {email}</span>
            </div>
            <RxAvatar className={css.authIcon} />
          </div>
        )}
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
