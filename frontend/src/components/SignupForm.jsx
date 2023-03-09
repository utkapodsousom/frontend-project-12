import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { useAuthContext } from '../contexts/index';
import signupSchema from '../schemas/signupSchema';

const SignupForm = () => {
  const [isSuccessSignup, setSuccessSignup] = useState(true);
  const { saveUser, user } = useAuthContext();
  const { token } = user;
  const navigate = useNavigate();

  const signup = async (values) => {
    const { username, password } = values;
    try {
      const res = await axios.post('/api/v1/signup', { username, password });
      const { token: loginToken, username: loginUsername } = res.data;
      saveUser(loginToken, loginUsername);
    } catch (e) {
      setSuccessSignup(false);
    }
  };

  const onSubmit = (values) => {
    console.log(values);
    signup(values);
  };

  const formik = useFormik({
    initialValues: { username: '', password: '', passwordConfirm: '' },
    validationSchema: signupSchema,
    onSubmit,
  });

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token, isSuccessSignup]);

  return (
    <div className="dark:bg-slate-700 max-w-md space-y-8 p-10 rounded-md drop-shadow-lg">
      <div>
        <h2 className="dark:text-white text-center text-3xl font-bold tracking-tight text-gray-900">
          Create new account
        </h2>
      </div>
      <form
        className="mt-8 space-y-6"
        onSubmit={formik.handleSubmit}
        method="POST"
      >
        <div className="rounded-md shadow-sm grid grid-cols-1 gap-6">
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-md font-medium text-gray-700 dark:text-white"
            >
              Username:
              <input
                className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-md peer-invalid:border-pink-400 peer-invalid:text-pink-500"
                type="text"
                name="username"
                placeholder="Username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                required
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="absolute peer-invalid:visible text-pink-500 font-medium">
                  {formik.errors.username}
                </div>
              ) : null}
            </label>
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-700 dark:text-white"
            >
              Password:
              <input
                className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-md  invalid:border-pink-400 invalid:text-pink-500"
                type="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="absolute peer-invalid:visible text-pink-500 font-medium">
                  {formik.errors.password}
                </div>
              ) : null}
            </label>
          </div>
          <div className="relative">
            <label
              htmlFor="passwordConfirm"
              className="block text-md font-medium text-gray-700 dark:text-white"
            >
              Confirm Password:
              <input
                className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-md  invalid:border-pink-400 invalid:text-pink-500"
                type="password"
                name="passwordConfirm"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
                required
              />
              {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                <div className="absolute peer-invalid:visible text-pink-500 font-medium">
                  {formik.errors.passwordConfirm}
                </div>
              ) : null}
            </label>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-md font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p className="text-center">
        Have an account?&nbsp;
        <a
          href="/login"
          className="text-sky-600 underline"
        >
          Login
        </a>
      </p>
    </div>
  );
};

export default SignupForm;
