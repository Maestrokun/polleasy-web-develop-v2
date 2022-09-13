import * as Yup from 'yup';

const phoneRegExp = /^([0]{1})[0-9]{10}$/;

const schema = Yup.object({
  firstname: Yup.string().required('First Name is required'),
  middlename: Yup.string().optional(),
  lastname: Yup.string().required('Last Name is required'),
  phone_number: Yup.string()
    .matches(phoneRegExp, 'Invalid phone number.')
    .typeError('Required'),
  designation: Yup.string().required('Designation is required'),
  state: Yup.string().required('State is required'),
  lga: Yup.string().required('LGA is required'),
});

export default schema;
