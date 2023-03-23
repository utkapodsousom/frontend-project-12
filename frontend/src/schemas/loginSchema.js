import * as yup from 'yup';

const loginSchema = yup.object({
  username: yup.string().required('usernameRequired'),
  password: yup.string().required('passwordRequired'),
});

export default loginSchema;
