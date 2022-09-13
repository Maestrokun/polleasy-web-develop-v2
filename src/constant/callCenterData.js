import Gender from 'assets/svg/Gender.svg';
import religion from 'assets/religion.svg';
import Group from 'assets/svg/Group.svg';

const TARGET_COUNT = [
  {
    id: 1,
    name: 'Male',
    icon: Gender,
    number: 2500,
  },
  {
    id: 2,
    name: 'Female',
    icon: Gender,
    number: 500,
  },
  {
    id: 3,
    name: 'Religion',
    icon: religion,
    number: 500,
  },
  {
    id: 1,
    name: 'Age Range',
    icon: Group,
    number: 5000,
  },
];

const results = [
  {
    id: 1001,
    name: 'Mona Kane',
    role: 'Call Center Agent',
    phone: '08100000000',
    email: 'monakane@example.com',
    status: 'Active',
  },
  {
    id: 1002,
    name: 'Mona Kane',
    role: 'Call Center Agent',
    phone: '08100000000',
    email: 'monakane@example.com',
    status: 'Deactivated',
  },
  {
    id: 1003,
    name: 'Mona Kane',
    role: 'Call Center Agent',
    phone: '08100000000',
    email: 'monakane@example.com',
    status: 'ACTIVE',
  },
  {
    id: 1004,
    name: 'Mona Kane',
    role: 'Call Center Agent',
    phone: '08100000000',
    email: 'monakane@example.com',
    status: 'INACTIVE',
  },
  {
    id: 1005,
    name: 'Mona Kane',
    role: 'Call Center Agent',
    phone: '08100000000',
    email: 'monakane@example.com',
    status: 'ACTIVE',
  },
  {
    id: 1006,
    name: 'Mona Kane',
    role: 'Call Center Agent',
    phone: '08100000000',
    email: 'monakane@example.com',
    status: 'INACTIVE',
  },
];

const filters = [
  {
    label: 'Role',
    options: [
      { id: 'Call Center Agent', value: 'Call Center Agent' },
      { id: 'Call Center Manager', value: 'Call Center Agent' },
      { id: 'Call Center Lead', value: 'Call Center Agent' },
    ],
  },
  {
    label: 'Status',
    options: [
      { id: 'ACTIVE', value: 'Active' },
      { id: 'DEACTIVATED', value: 'Inactive' },
      { id: 'PENDING', value: 'Pending' },
    ],
  },
];

const CALL_CENTER = [
  'Alimosho',
  'Abule-Egba',
  'Ikeja',
  'Surulere',
  'Berger',
  'Ikorodu',
  'Victoria-Island',
  'Ojuelegba',
  'Ogudu-GRA',
  'Oshodi-Oke',
];

const columns = [
  {
    label: 'Name',
    key: 'data',
    sort: true,
  },
  {
    label: 'Role',
    key: 'role',
  },
  {
    label: 'Phone no',
    key: 'phone',
  },
  {
    label: 'Email Address',
    key: 'email',
  },
  {
    label: 'Status',
    key: 'status',
  },
];
const pollAgentColumns = [
  {
    label: 'Agent Name',
    key: 'data',
    sort: true,
  },
  {
    label: 'Phone no',
    key: 'phone',
  },
  {
    label: 'Email Address',
    key: 'email',
  },
  {
    label: 'Total Calls',
    key: 'total_calls',
  },
  {
    label: 'Duration',
    key: 'duration',
  },
];

export { filters, columns, CALL_CENTER, TARGET_COUNT, pollAgentColumns };

export default results;
