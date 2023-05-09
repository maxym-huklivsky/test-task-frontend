import React from 'react';

import AuthComponent from '../components/AuthComponent/AuthComponent';
import LoginForm from '../components/Forms/LoginForm';

const LoginPage = () => {
  return (
    <AuthComponent formType="Login">
      <LoginForm />
    </AuthComponent>
  );
};

export default LoginPage;
