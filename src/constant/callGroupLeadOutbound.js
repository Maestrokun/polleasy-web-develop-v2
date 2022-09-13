const filters = [
  {
    label: 'Poll type: All',
    backgrounColor: '#1E0A3C',
    options: [
      { id: 'Presidential', value: 'Presidential' },
      { id: 'Gubernatorial', value: 'Gubernatorial' },
      { id: 'Senatorial', value: 'Senatorial' },
      { id: 'House of Representatives', value: 'House of Representatives' },
      { id: 'House of Assembly', value: 'House of Assembly' },
      { id: 'Chairmanship', value: 'Chairmanship' },
      { id: 'Councilorship', value: 'Councilorship' },
    ],
  },
  {
    label: 'Status',
    options: [
      { id: 'ACTIVE', value: 'Active' },
      { id: 'DRAFT', value: 'Draft' },
      { id: 'DEACTIVATED', value: 'Deactivated' },
    ],
  },
  {
    label: 'Date Range:Till Date',
    options: [
      { id: 'ACTIVE', value: 'Active' },
      { id: 'DRAFT', value: 'Draft' },
      { id: 'DEACTIVATED', value: 'Deactivated' },
    ],
  },
];

export default filters;
