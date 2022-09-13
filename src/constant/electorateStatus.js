import peopleIcon from 'assets/people.svg';
import bgFrame2 from 'assets/bgFrame2.svg';

const ELECTORATE_STATUS = (data) => [
  {
    id: '1',
    status: 'Total Voters',
    count: data?.data?.total || 0,
    icon: peopleIcon,
    bgFrame: bgFrame2,
  },
];

export default ELECTORATE_STATUS;
