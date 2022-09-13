const results = [
  {
    id: 1,
    title: '2022 Presidential Campaign for John Doe',
    type: 'Presidential',
    name: 'John Doe',
    year: '2023',
  },
  {
    id: 2,
    title: '2022 Presidential Campaign for John Doe',
    type: 'Presidential',
    name: 'John Doe',
    year: '2023',
  },
  {
    id: 3,
    title: '2022 Presidential Campaign for John Doe',
    type: 'Presidential',
    name: 'John Doe',
    year: '2023',
  },
  {
    id: 4,
    title: '2022 Presidential Campaign for John Doe',
    type: 'Presidential',
    name: 'John Doe',
    year: '2023',
  },
  {
    id: 5,
    title: '2022 Presidential Campaign for John Doe',
    type: 'Presidential',
    name: 'John Doe',
    year: '2023',
  },
  {
    id: 6,
    title: '2022 Presidential Campaign for John Doe',
    type: 'Presidential',
    name: 'John Doe',
    year: '2023',
  },
  {
    id: 7,
    title: '2022 Presidential Campaign for John Doe',
    type: 'Presidential',
    name: 'John Doe',
    year: '2023',
  },
  {
    id: 8,
    title: '2022 Presidential Campaign for John Doe',
    type: 'Presidential',
    name: 'John Doe',
    year: '2023',
  },
];

const resultsVoter = [
  {
    id: 1,
    name: 'Mona Kane',
    phone: '09083889233',
    location: 'Surelere, Surelere LGA, Lagos State, Nigeria',
    gender: 'Male',
    age: '18',
    religion: 'Christainity',
  },
  {
    id: 2,
    name: 'Mona Kane',
    phone: '09083889233',
    location: 'Surelere, Surelere LGA, Lagos State, Nigeria',
    gender: 'Male',
    age: '18',
    religion: 'Christainity',
  },
  {
    id: 3,
    name: 'Mona Kane',
    phone: '09083889233',
    location: 'Surelere, Surelere LGA, Lagos State, Nigeria',
    gender: 'Male',
    age: '18',
    religion: 'Christainity',
  },
  {
    id: 4,
    name: 'Mona Kane',
    phone: '09083889233',
    location: 'Surelere, Surelere LGA, Lagos State, Nigeria',
    gender: 'Male',
    age: '18',
    religion: 'Christainity',
  },
  {
    id: 5,
    name: 'Mona Kane',
    phone: '09083889233',
    location: 'Surelere, Surelere LGA, Lagos State, Nigeria',
    gender: 'Male',
    age: '18',
    religion: 'Christainity',
  },
  {
    id: 6,
    name: 'Mona Kane',
    phone: '09083889233',
    location: 'Surelere, Surelere LGA, Lagos State, Nigeria',
    gender: 'Male',
    age: '18',
    religion: 'Christainity',
  },
  {
    id: 7,
    name: 'Mona Kane',
    phone: '09083889233',
    location: 'Surelere, Surelere LGA, Lagos State, Nigeria',
    gender: 'Male',
    age: '18',
    religion: 'Christainity',
  },
  {
    id: 8,
    name: 'Mona Kane',
    phone: '09083889233',
    location: 'Surelere, Surelere LGA, Lagos State, Nigeria',
    gender: 'Male',
    age: '18',
    religion: 'Christainity',
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

const pollFilters = [
  {
    label: 'Status:Ongoing',
    options: [
      { id: 'Ongoing', value: 'Ongoing' },
      { id: 'Completed', value: 'Completed' },
    ],
  },
  {
    label: 'Call Type',
    options: [
      { id: 'ACTIVE', value: 'Popularity Rating' },
      { id: 'Needs', value: 'Needs' },
      { id: 'Apathy', value: 'Apathy' },
      { id: 'Incidence Response', value: 'Incidence Response' },
    ],
  },
];

const columns = [
  {
    label: 'Title',
    key: 'data',
    sort: true,
  },
  {
    label: 'Campaign Type',
    key: 'type',
    sort: true,
  },
  {
    label: 'Candidate"s Name',
    key: 'name',
  },
  {
    label: 'Year',
    key: 'year',
  },
];

const columnsVoter = [
  {
    label: 'Name',
    key: 'data',
    sort: true,
    minWidth: 250,
  },
  {
    label: 'Phone no',
    key: 'phone',
    minWidth: 170,
  },
  {
    label: 'Religion',
    key: 'religion',
    minWidth: 170,
  },
  {
    label: 'Location',
    key: 'location',
    minWidth: 170,
  },
  {
    label: 'State Code',
    key: 'stateCode',
    minWidth: '170',
  },
  {
    label: 'LGA code',
    key: 'lgaCode',
    minWidth: '170',
  },
  {
    label: 'Polling unit code',
    key: 'pollingUnitCode',
    minWidth: '170',
  },
  {
    label: 'Reg. area code',
    key: 'regAreaCode',
    minWidth: '170',
  },
];

const POLL_PROGRESS_STATUS_BG = {
  Ongoing: '#F0DAFB',
  Complete: 'rgba(95, 210, 85, 0.2)',
};

export {
  filters,
  columns,
  pollFilters,
  columnsVoter,
  resultsVoter,
  POLL_PROGRESS_STATUS_BG,
};

export default results;
