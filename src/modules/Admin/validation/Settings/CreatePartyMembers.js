import * as Yup from 'yup';

// const phoneRegExp = /^([0]{1})[0-9]{10}$/;

const schema = Yup.object({
  firstname: Yup.string().required('Firstname is required'),
  lastname: Yup.string().required('Lastname is required'),
  phone: Yup.string().required('Lastname is required'),
  // .matches(phoneRegExp, 'Invalid phone number.')
  // .typeError('Phone no is required'),
  position: Yup.string().required('Position is required'),
  jurisdiction: Yup.string().required('Jurisdiction is required'),
  zone: Yup.string().required('Zone is required'),
  state: Yup.string().required('State is required'),
  district: Yup.string().required('District is required'),
  lga: Yup.string().required('Lga is required'),
  ward: Yup.string().required('Ward is required'),
});

export default schema;
