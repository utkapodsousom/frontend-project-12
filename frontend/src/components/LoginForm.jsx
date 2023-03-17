import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import axios from 'axios';
import { useAuthContext } from '../contexts/index';

const LoginForm = () => {
  const [isSuccessAuth, setSuccessAuth] = useState(true);
  const { saveUser, user } = useAuthContext();
  const { token } = user;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const login = async (values) => {
    try {
      const res = await axios.post('/api/v1/login', values);
      const { token: loginToken, username: loginUsername } = res.data;
      saveUser(loginToken, loginUsername);
    } catch (e) {
      setSuccessAuth(false);
    }
  };

  const onSubmit = (values) => {
    login(values);
  };

  const validate = (values) => {
    if (!values.username || !values.password) return 'usernameNotExist';
    return null;
  };

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validate,
    validateOnMount: true,
    onSubmit,
  });

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token, isSuccessAuth]);

  return (
    <div className="dark:bg-slate-700 w-full max-w-md p-10 rounded-md drop-shadow-lg">
      <div>
        <h2 className="dark:text-white text-center text-3xl font-bold tracking-tight text-gray-900">
          {t('app.enterChat')}
        </h2>
      </div>
      <form
        className="mt-6 relative"
        onSubmit={formik.handleSubmit}
        method="POST"
      >
        <div className="rounded-md shadow-sm flex flex-col">
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-md font-medium text-gray-700 dark:text-white"
            >
              {t('form.nickname')}
              <input
                className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-md peer-invalid:border-pink-400 peer-invalid:text-pink-500"
                type="text"
                id="username"
                name="username"
                placeholder={t('form.nicknamePlaceholder')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                required
              />
            </label>
          </div>
          <div className="relative mt-6">
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-700 dark:text-white"
            >
              {t('form.password')}
              <input
                className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-md  invalid:border-pink-400 invalid:text-pink-500"
                type="password"
                id="password"
                name="password"
                placeholder={t('form.passwordPlaceholder')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="absolute peer-invalid:visible text-pink-500 font-medium text-sm">
                  {t(`form.${formik.errors.password}`)}
                </div>
              ) : null}
            </label>
          </div>
        </div>
        <div className="w-full text-break">
          {formik.touched.username && formik.errors.username ? (
            <span className="peer-invalid:visible text-pink-500 font-medium text-sm mb-2 leading-none text-break">
              {t(`form.${formik.errors.username}`)}
            </span>
          ) : null}
          {!isSuccessAuth && (
            <span className="peer-invalid:visible text-pink-500 font-medium text-sm mb-2 leading-none text-break">
              {t('form.usernameNotExist')}
            </span>
          )}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            disabled={!formik.isValid}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-md font-medium text-white enabled:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75"
          >
            {t('label.login')}
          </button>
        </div>
      </form>
      <p className="text-center mt-4">
        <a
          href="/signup"
          className="text-sky-600 underline"
        >
          {t('label.register')}
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
