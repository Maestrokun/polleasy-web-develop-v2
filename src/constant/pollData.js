const results = [
  {
    id: '01234561',
    name: 'Mona Kane',
    fullname: 'Mona McDonalds Kane',
    phone: '08100000000',
    email: 'mona.kane@example.com',
    calls: '50,100',
    time: '31:01:24',
    role: 'Call Group Lead',
    status: 'Active',
  },
  {
    id: '01234562',
    name: 'Mona Kane',
    fullname: 'Mona McDonalds Kane',
    phone: '08100000000',
    email: 'mona.kane@example.com',
    calls: '50,100',
    time: '31:01:24',
    role: 'Call Group Manager',
    status: 'Deactivated',
  },
  {
    id: '01234563',
    name: 'Mona Kane',
    fullname: 'Mona McDonalds Kane',
    phone: '08100000000',
    email: 'mona.kane@example.com',
    calls: '50,100',
    time: '31:01:24',
    role: 'Call Group Agent',
  },
  {
    id: '01234564',
    name: 'Mona Kane',
    fullname: 'Mona McDonalds Kane',
    phone: '08100000000',
    email: 'mona.kane@example.com',
    calls: '50,100',
    time: '31:01:24',
    role: 'Call Group Lead',
  },
  {
    id: '01234565',
    name: 'Mona Kane',
    fullname: 'Mona McDonalds Kane',
    phone: '08100000000',
    email: 'mona.kane@example.com',
    calls: '50,100',
    time: '31:01:24',
    role: 'Call Group Lead',
  },
  {
    id: '01234566',
    name: 'Mona Kane',
    fullname: 'Mona McDonalds Kane',
    phone: '08100000000',
    email: 'mona.kane@example.com',
    calls: '50,100',
    time: '31:01:24',
    role: 'Call Group Lead',
  },
  {
    id: '01234567',
    name: 'Mona Kane',
    fullname: 'Mona McDonalds Kane',
    phone: '08100000000',
    email: 'mona.kane@example.com',
    calls: '50,100',
    time: '31:01:24',
    role: 'Call Group Lead',
  },
  {
    id: '01234568',
    name: 'Mona Kane',
    fullname: 'Mona McDonalds Kane',
    phone: '08100000000',
    email: 'mona.kane@example.com',
    calls: '50,100',
    time: '31:01:24',
    role: 'Call Group Lead',
  },
  {
    id: '01234567',
    name: 'Mona Kane',
    fullname: 'Mona McDonalds Kane',
    phone: '08100000000',
    email: 'mona.kane@example.com',
    calls: '50,100',
    time: '31:01:24',
    role: 'Call Group Lead',
  },
  {
    id: '01234568',
    name: 'Mona Kane',
    fullname: 'Mona McDonalds Kane',
    phone: '08100000000',
    email: 'mona.kane@example.com',
    calls: '50,100',
    time: '31:01:24',
    role: 'Call Group Lead',
  },
  {
    id: '01234567',
    name: 'Mona Kane',
    fullname: 'Mona McDonalds Kane',
    phone: '08100000000',
    email: 'mona.kane@example.com',
    calls: '50,100',
    time: '31:01:24',
    role: 'Call Group Lead',
  },
  {
    id: '01234568',
    name: 'Mona Kane',
    fullname: 'Mona McDonalds Kane',
    phone: '08100000000',
    email: 'mona.kane@example.com',
    calls: '50,100',
    time: '31:01:24',
    role: 'Call Group Lead',
  },
];

const columns = [
  {
    label: 'Name',
    key: 'data',
    sort: true,
  },
  {
    label: 'Phone no',
    key: 'phone',
  },
  {
    label: 'Email address',
    key: 'email',
  },
  {
    label: 'Total Calls',
    key: 'calls',
    sort: true,
  },
  {
    label: 'Duration',
    key: 'time',
    sort: true,
  },
];

const agentColumns = [
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

const POLLNAME = [
  {
    id: 1,
    title: 'Title',
    stat: 'Q1 Popularity Rating for South South Territorial Region',
    status: 'Completed',
    ccl: 'Damilola Madashiru',
    location: 'Toll Gate Agbado',
    start_date: '6 Oct, 2021',
    end_date: '10 Nov, 2021',
    status_bg: '#D4F7DC',
  },
];

const filters = [
  {
    label: 'Role',
    options: [
      { id: 'Call Group Agent', value: 'Call Group Agent' },
      { id: 'Call Group Manager', value: 'Call Group Agent' },
      { id: 'Call Group Lead', value: 'Call Group Agent' },
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

export { results, columns, agentColumns, filters, POLLNAME };

// export default results;
