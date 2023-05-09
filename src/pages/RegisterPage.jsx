import React from 'react';

import AuthComponent from '../components/AuthComponent/AuthComponent';
import RegisterForm from '../components/Forms/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthComponent formType={'Register'}>
      <RegisterForm />
    </AuthComponent>
  );
};

export default RegisterPage;
