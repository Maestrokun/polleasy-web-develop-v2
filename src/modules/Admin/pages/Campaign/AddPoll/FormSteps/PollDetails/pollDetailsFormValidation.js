import * as Yup from 'yup';

const schema = Yup.object({
  name: Yup.string().required('First name is required'),
  type: Yup.string().required('Type is required'),
  start_date: Yup.string().required('Start date is required'),
  end_date: Yup.string().required('End date is required'),
  //   callGroups: Yup.string().required('Call Groups is required'),
});

export default schema;
