import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts';
import { SignupForm } from '../components';

const SignupPage = () => {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  if (!token) {
    return (
      <div className="w-full flex justify-center py-20 bg-slate-600">
        <SignupForm />
      </div>
    );
  }

  return <div />;
};

export default SignupPage;
