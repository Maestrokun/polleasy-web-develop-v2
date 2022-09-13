import * as Yup from 'yup';

const schema = Yup.object({
  name: Yup.string().required('Required'),
  type: Yup.string().required('Required'),
  lead: Yup.string().required('Required'),
  agents: Yup.array().required('Call agents is required').min(1),
});

export default schema;
