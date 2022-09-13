import * as Yup from 'yup';

const phoneRegExp = /^([0]{1})[0-9]{10}$/;

const schema = Yup.object({
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Invalid phone number.')
    .typeError('Required'),
  position: Yup.string().required('Required'),
  jurisdiction: Yup.string().required('Required'),
  zone: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  district: Yup.string().required('Required'),
  lga: Yup.string().required('Required'),
  ward: Yup.string().required('Required'),
});

export default schema;
