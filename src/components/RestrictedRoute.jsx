import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectIsLoggedIn } from '../redux/auth/selectors';

const RestrictedRoute = ({ component, redirect }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirect} /> : component;
};

export default RestrictedRoute;
