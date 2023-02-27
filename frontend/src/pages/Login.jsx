import { Formik, Field, ErrorMessage, Form } from "formik";
import axios from "axios";
import * as yup from "yup";

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

const Login = () => {
  return (
    <div className="dark:bg-slate-700 flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="dark:text-white mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Formik
          initialValues={{ username: "", password: "", confirmPassword: "" }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            axios
              .post("/api/v1/login", {
                username: values.username,
                password: values.password,
              })
              .then((res) => {
                const { token, username } = res.data;
                localStorage.setItem("token", token);
                localStorage.setItem("login", username);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          {({ errors }) => (
            <Form className="mt-8 space-y-6" action="#" method="POST">
              <div className="rounded-md shadow-sm grid grid-cols-1 gap-6">
                <div className="relative">
                  <label htmlFor="username" className="block text-md font-medium text-gray-700 dark:text-white">
                    Username:
                  </label>
                  <Field
                    className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-md invalid:border-pink-400 invalid:text-pink-500"
                    type="username"
                    name="username"
                    placeholder="Username"
                    required
                  />
                  <ErrorMessage name="username">
                    {() => <div className="absolute peer-invalid:visible text-pink-500 font-medium">{errors.username}</div>}
                  </ErrorMessage>
                </div>
                <div className="relative">
                  <label htmlFor="password" className="block text-md font-medium text-gray-700 dark:text-white">
                    Password:
                  </label>
                  <Field
                    className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-md  invalid:border-pink-400 invalid:text-pink-500"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <ErrorMessage name="password">
                    {() => <div className="absolute peer-invalid:visible text-pink-500 font-medium">{errors.password}</div>}
                  </ErrorMessage>
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
