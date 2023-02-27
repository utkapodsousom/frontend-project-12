import { Formik, Form, Field } from "formik";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: yup
    .string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Login = () => {
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <Field type="username" name="username" />
          <Field type="password" name="password" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
