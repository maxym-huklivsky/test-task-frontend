import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectIsLoggedIn } from '../redux/auth/selectors';

const PrivateRoute = ({ component, redirect }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? component : <Navigate to={redirect} />;
};

export default PrivateRoute;
