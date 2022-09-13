import { format } from 'date-fns';

export function electorateTopStat(data) {
  return [
    {
      title: 'Date Registered',
      label:
        (data?.created_at &&
          format(new Date(data?.created_at), 'dd MMM yyyy')) ||
        '--',
    },
    { title: 'State', label: data?.state_of_residence?.name || '--' },
    {
      title: 'Local Government Area ',
      label: data?.residence_lga?.name || '--',
    },
    { title: 'Ward', label: data?.residence_ward?.name || '--' },
    { title: 'Polling Unit', label: data?.polling_unit?.name || '--' },
  ];
}

export const tet = {};
