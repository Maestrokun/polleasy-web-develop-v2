const filters = [
  {
    label: 'Gender',
    options: [
      { id: 'Male', value: 'Male' },
      { id: 'Female', value: 'Female' },
    ],
  },
  {
    label: 'STATE',
    options: [{ id: 'LAGOS', value: 'Lagos' }],
  },
  {
    label: 'LGA',
    options: [{ id: 'LAGOS-LGA1', value: 'Lagos1111' }],
  },
  {
    label: 'Registration Area',
    options: [{ id: 'LAGOS', value: 'Lagos' }],
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
    label: 'Gender',
    key: 'gender',
  },
  {
    label: 'State',
    key: 'voting_state',
  },
  {
    label: 'LGA',
    key: 'voting_lga',
  },
  {
    label: 'Ward',
    key: 'voting_ward',
  },
  {
    label: 'Polling Unit',
    key: 'voting_polling_unit',
  },
];

const hardResults = [
  {
    id: '1',
    name: 'Monalisa Adebubosun Olamilekan',
    phone: '08199977765',
    gender: 'Female',
    state: 'Adamawa',
    LGA: 'Ibeju Lekki',
    ward: 'Zone B, Alogba',
    polling_unit: 'Junction of Apeno Jimbo Phase I...',
  },
];

export { filters, columns, hardResults };
