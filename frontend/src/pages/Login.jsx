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
        <Form>
          <h1>Logig Page</h1>
          <div>
            <Field type="username" name="username" placeholder="Login" />
            <label htmlFor="username">
              Username:
            </label>
            <ErrorMessage name="username">
              {() => <div>{errors.username}</div>}
            </ErrorMessage>
          </div>
          <div>
            <Field type="password" name="password" />
            <label htmlFor="password">
              Password:
            </label>
            <ErrorMessage name="password">
              {() => <div>{errors.password}</div>}
            </ErrorMessage>
          </div>
          <button type="submit">
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
