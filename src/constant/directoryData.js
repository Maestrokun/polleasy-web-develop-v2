const results = [
  {
    id: 1,
    name: 'Ola Saliu',
    phone: '08030001001',
    designation: 'INEC Official',
    state: 'Lagos',
    LGA: 'Surulere LGA, Lagos State',
  },
  {
    id: 2,
    name: 'Olabisi Sal',
    phone: '08030001001',
    designation: 'Police Official',
    state: 'Lagos',
    LGA: 'Surulere LGA, Lagos State',
  },
  {
    id: 3,
    name: 'bisi Saliu',
    phone: '08030001001',
    designation: 'Party Official',
    state: 'Lagos',
    LGA: 'Surulere LGA, Lagos State',
  },
  {
    id: 4,
    name: 'Olabi aliu',
    phone: '08030001001',
    designation: 'Party Official',
    state: 'Lagos',
    LGA: 'Surulere LGA, Lagos State',
  },
  {
    id: 5,
    name: 'Olabisi Saliu',
    phone: '08030001001',
    designation: 'Security Agent',
    state: 'Lagos',
    LGA: 'Surulere LGA, Lagos State',
  },
  {
    id: 6,
    name: 'Olabisi Saliu',
    phone: '08030001001',
    designation: 'INEC Official',
    state: 'Lagos',
    LGA: 'Surulere LGA, Lagos State',
  },
  {
    id: 7,
    name: 'Olabisi Saliu',
    phone: '08030001001',
    designation: 'Police Official',
    state: 'Lagos',
    LGA: 'Surulere LGA, Lagos State',
  },
  {
    id: 8,
    name: 'Olabisi Saliu',
    phone: '08030001001',
    designation: 'Security Agent',
    state: 'Lagos',
    LGA: 'Surulere LGA, Lagos State',
  },
];
const archived = [
  {
    id: 1,
    name: 'Olabisi Saliu',
    phone: '08030001001',
    designation: 'INEC Official',
    state: 'Lagos',
    LGA: 'Surulere LGA, Lagos State',
  },
];

const filters = [
  {
    label: 'Designation',
    backgrounColor: '#1E0A3C',
    options: [
      { id: 'INEC Official', value: 'INEC Official' },
      { id: 'Police Official', value: 'Police Official' },
      { id: 'Party Official', value: 'Party Official' },
      { id: 'Security Agent', value: 'Security Agent' },
    ],
  },
  {
    label: 'State',
    options: [],
  },
  {
    label: 'LGA',
    options: [],
  },
];
const columns = [
  {
    label: 'Name',
    key: 'name',
    sort: true,
  },
  {
    label: 'Phone no',
    key: 'phone',
  },
  {
    label: 'Designation',
    key: 'designation',
  },
  {
    label: 'State',
    key: 'state',
  },
  {
    label: 'Local Government',
    key: 'LGA',
  },
];

const ELECTION_YEAR = ['2021', '2022', '2023', '2024', '2024', '2025'];

const MANAGE_ELECTION_COUNTER = [
  { id: 1, name: 'Election Details' },
  { id: 2, name: 'Candidate Details' },
  { id: 3, name: 'Opposition Details' },
  { id: 4, name: 'Preview' },
];

const userDesignation = [
  { title: 'INEC Official', value: 'INEC Official', key: 'INEC Official' },
  {
    title: 'Police Official',
    value: 'Police Official',
    key: 'Police Official',
  },
  { title: 'Party Official', value: 'Party Official', key: 'Party Official' },
  { title: 'Security Agent', value: 'Security Agent', key: 'Security Agent' },
];

const userStates = [
  { title: 'Abia', value: 'Abia', key: 'Abia' },
  { title: 'Adamawa', value: 'Adamawa', key: 'Adamawa' },
  { title: 'Awka', value: 'Awka', key: 'Awka' },
];

const userLGA = [
  { title: 'Ado-Ekiti', value: 'Ado-Ekiti', key: 'Ado-Ekiti' },
  { title: 'Ikere', value: 'Ikere', key: 'Ikere' },
  { title: 'Oyo', value: 'Oyo', key: 'Oyo' },
];

export {
  userStates,
  userLGA,
  ELECTION_YEAR,
  MANAGE_ELECTION_COUNTER,
  filters,
  columns,
  archived,
  userDesignation,
};

export default results;
