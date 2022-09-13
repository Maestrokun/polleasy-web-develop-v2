export const columns = [
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
    label: 'Canvassers ID',
    key: 'canvasser_ref',
  },
  {
    label: 'Status',
    key: 'status',
  },
];

export function partyTopStat(data) {
  return [
    { title: 'Date Registered', label: data?.registration_date || '--' },
    { title: 'State', label: data?.state || '--' },
    { title: 'Local Government Area ', label: data?.lga || '--' },
    { title: 'Ward', label: data?.Ward || '--' },
    { title: 'Polling Unit', label: data?.polling_unit?.name || '--' },
  ];
}
