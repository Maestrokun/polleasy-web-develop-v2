export const filters = [
  {
    label: 'State',
    options: [{ id: 'Campaign Manager', value: 'Campaign Manager' }],
  },
  {
    label: 'Education Level',
    options: [{ id: 'ACTIVE', value: 'Active' }],
  },
  {
    label: 'Gender',
    options: [
      { id: 'MALE', value: 'Male' },
      { id: 'FEMALE', value: 'Female' },
      { id: 'OTHER', value: 'Other' },
    ],
  },
];

export const columns = [
  {
    label: 'Full Name',
    key: 'fullname',
    sort: true,
  },
  {
    label: "Voter's Id",
    key: 'voter_ref',
    sort: true,
  },
  {
    label: 'Phone no',
    key: 'phone',
    sort: true,
  },
  {
    label: 'Gender',
    key: 'gender',
  },
  {
    label: 'LGA',
    key: 'voting_lga',
    sort: true,
  },
  {
    label: 'State',
    key: 'voting_state',
    sort: true,
  },
  {
    label: 'Polling Unit',
    key: 'voting_pu',
    sort: true,
  },
];
