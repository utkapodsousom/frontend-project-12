import React, {
  useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthContext } from '../contexts/index';
import signupSchema from '../schemas/signupSchema';
import toastsParams from '../toastParams';

const SignupForm = () => {
  const { saveUser } = useAuthContext();
  const navigate = useNavigate();
  const [signupFailure, setSignupFailure] = useState(null);
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const onSubmit = async (values, { setSubmitting }) => {
    const { username, password } = values;
    try {
      setSubmitting(true);
      const res = await axios.post('/api/v1/signup', { username, password });
      const { token: loginToken, username: loginUsername } = res.data;
      saveUser(loginToken, loginUsername);
      navigate('/');
    } catch (e) {
      setSubmitting(false);
      if (e.isAxiosError && e.response?.status === 409) {
        setSignupFailure(t('form.usernameAlreadyExist'));
        throw new Error('name already exists');
      } else {
        toast.error(t('errors.connection'), toastsParams.getDefaultParams());
      }
    } finally {
      inputRef.current.select();
    }
  };

  const formik = useFormik({
    initialValues: { username: '', password: '', passwordConfirm: '' },
    validateOnMount: true,
    validationSchema: signupSchema,
    onSubmit,
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="dark:bg-slate-700 max-w-md space-y-8 p-10 rounded-md drop-shadow-lg">
      <div>
        <h2 className="dark:text-white text-center text-3xl font-bold tracking-tight text-gray-900">
          {t('label.register')}
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
              {t('form.username')}
              <input
                className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-md peer-invalid:border-pink-400 peer-invalid:text-pink-500"
                type="text"
                id="username"
                name="username"
                placeholder={t('form.usernamePlaceholder')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                ref={inputRef}
                required
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="absolute peer-invalid:visible text-pink-500 font-medium text-sm">
                  {t(`form.${formik.errors.username}`)}
                </div>
              ) : null}
              {!!signupFailure && (
                <div className="absolute peer-invalid:visible text-pink-500 font-medium text-sm">
                  {signupFailure}
                </div>
              )}
            </label>
          </div>
          <div className="relative">
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
          <div className="relative">
            <label
              htmlFor="passwordConfirm"
              className="block text-md font-medium text-gray-700 dark:text-white"
            >
              {t('form.passwordConfirmation')}
              <input
                className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-md  invalid:border-pink-400 invalid:text-pink-500"
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder={t('form.passwordConfirmation')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
                required
              />
              {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                <div className="absolute peer-invalid:visible text-pink-500 font-medium text-sm">
                  {t(`form.${formik.errors.passwordConfirm}`)}
                </div>
              ) : null}
            </label>
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={!formik.isValid}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-md font-medium text-white enabled:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75"
          >
            {t('form.signupButton')}
          </button>
        </div>
      </form>
      <p className="text-center text-white">
        {t('app.haveAccount')}
        &nbsp;
        <a
          href="/login"
          className="text-sky-600 underline"
        >
          {t('label.login')}
        </a>
      </p>
    </div>
  );
};

export default SignupForm;
