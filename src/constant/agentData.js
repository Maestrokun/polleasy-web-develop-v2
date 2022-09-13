const filters = [
  {
    // label: 'Role',
    options: [
      { id: 'Campaign Manager', value: 'Campaign Manager' },
      { id: 'Call Group Lead', value: 'Call Group Lead' },
      { id: 'inbound Agent', value: 'Inbound Agent' },
      { id: 'Outbound Agent', value: 'Outbound Agent' },
      { id: 'Party Agent', value: 'Party Agent' },
      { id: 'Candidate', value: 'Candidate' },
    ],
  },
  // {
  //   label: 'Status',
  //   options: [
  //     { id: 'ACTIVE', value: 'Active' },
  //     { id: 'DEACTIVATED', value: 'Inactive' },
  //     { id: 'PENDING', value: 'Pending' },
  //   ],
  // },
];

const columns = [
  {
    label: 'Name',
    key: 'data',
    sort: true,
  },
  {
    label: 'Role Assigned',
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

const agentLanguage = [
  { title: 'English', value: 'English', key: 'English' },
  { title: 'Yoruba', value: 'Yoruba', key: 'Yoruba' },
  { title: 'Hausa', value: 'Hausa', key: 'Hausa' },
  { title: 'Igbo', value: 'Igbo', key: 'Igbo' },
  { title: 'French', value: 'French', key: 'French' },
];

export { filters, columns, agentLanguage };
