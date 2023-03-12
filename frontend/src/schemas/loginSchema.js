import * as yup from 'yup';

const loginSchema = yup.object().shape({
  username: yup.string().min(3, 'usernameMin3').max(20, 'usernameMax20').required('usernameRequired'),
  password: yup.string().min(4, 'passwordMin4').max(50, 'passwordMax50').required('passwordRequired'),
});

export default loginSchema;
