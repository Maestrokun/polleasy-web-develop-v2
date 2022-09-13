import * as Yup from 'yup';

const schema = Yup.object().shape({
  partyname: Yup.string().required('Party name is required'),
  partyalias: Yup.string().required('Party alias is required'),
  flag: Yup.mixed()
    .transform((v) => (!v ? undefined : v))
    .required('Party flag is required'),
});

export default schema;
