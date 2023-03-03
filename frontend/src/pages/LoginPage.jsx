import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { LoginForm } from "../components";

const LoginPage = () => {
  const { token } = useAuthContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  if (!token) {
    return (
      <div className="w-full flex justify-center py-20 bg-slate-600">
        <LoginForm />
      </div>
    );
  }

  return <div />;
};

export default LoginPage;
