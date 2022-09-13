import * as Yup from 'yup';

const phoneRegExp = /^([0]{1})[0-9]{10}$/;

const schema = Yup.object({
  firstname: Yup.string().required('First Name is required'),
  middle_name: Yup.string().optional(),
  lastname: Yup.string().required('Last Name is required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Invalid phone number.')
    .typeError('Required'),
  email: Yup.string()
    .email('Invalid Email address')
    .required('Email is required'),
  role: Yup.string().required('Role is required'),
});

export default schema;
