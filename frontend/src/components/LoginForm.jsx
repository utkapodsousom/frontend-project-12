import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import useAuthContext from "../contexts/AuthContext";
import axios from "axios";

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: yup
    .string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const LoginForm = () => {
  const [isSuccessAuth, setSuccessAuth] = useState(true);
  const { saveToken, token } = useAuthContext();
  const navigate = useNavigate();

  const login = async (values) => {
    try {
      const res = await axios.post("/api/v1/login", values);
      const { token: loginToken } = res.data;
      saveToken(loginToken);
    } catch (e) {
      setSuccessAuth(false);
    }
  };

  const onSubmit = (values) => {
    login(values);
  };

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema,
    onSubmit,
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token, isSuccessAuth]);

  return (
    <div className="dark:bg-slate-700 max-w-md space-y-8 p-10 rounded-md drop-shadow-lg">
      <div>
        <h2 className="dark:text-white text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
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
            </label>
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
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-700 dark:text-white"
            >
              Password:
            </label>
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
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-md font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
