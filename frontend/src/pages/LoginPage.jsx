import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts';
import { LoginForm } from '../components';

const LoginPage = () => {
  const { user } = useAuthContext();
  const { token } = user;
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  if (!token) {
    return (
      <div className="w-full items-start flex justify-center py-20 bg-slate-600">
        <LoginForm />
      </div>
    );
  }

  return <div />;
};

export default LoginPage;
