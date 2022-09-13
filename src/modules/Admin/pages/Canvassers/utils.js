import peopleIcon from 'assets/people.svg';
import bgFrame2 from 'assets/bgFrame2.svg';
import { format } from 'date-fns';

export const topStat = (data) => {
  return [
    {
      id: '1',
      status: 'Total Unverified Voters ',
      count: data?.total_unverified || 0,
      icon: peopleIcon,
      bgFrame: bgFrame2,
    },
    {
      id: '1',
      status: 'Total Verified Voters ',
      count: data?.total_verified || 0,
      icon: peopleIcon,
      bgFrame: bgFrame2,
    },
  ];
};

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
    key: 'state',
  },
  {
    label: 'LGA',
    key: 'lga',
  },
  {
    label: 'Ward',
    key: 'ward',
  },
  {
    label: 'Canvassers ID',
    key: 'canvasser_id',
  },
  {
    label: 'Status',
    key: 'status',
  },
];

export function partyTopStat(data) {
  return [
    {
      title: 'Date Registered',
      label:
        (data?.created_at &&
          format(new Date(data?.created_at), 'dd MMM yyyy')) ||
        '--',
    },
    { title: 'State', label: data?.voting_state?.name || '--' },
    { title: 'Local Government Area ', label: data?.voting_lga?.name || '--' },
    { title: 'Ward', label: data?.voting_ward?.name || '--' },
    { title: 'Polling Unit', label: data?.voting_polling_unit?.name || '--' },
  ];
}
