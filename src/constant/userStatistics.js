import UserIconTotal from 'assets/svg/UserIconTotal.svg';
import UserIconActive from 'assets/svg/UserIconActive.svg';
import UserIconDeactivated from 'assets/svg/UserIconDeactivated.svg';
import UserIconPending from 'assets/svg/UserIconPending.svg';

import bgFrame1 from 'assets/bgFrame1.svg';
import bgFrame2 from 'assets/bgFrame2.svg';
import bgFrame3 from 'assets/bgFrame3.svg';
import bgFrame4 from 'assets/bgFrame4.svg';

const USER_STATISTICS = [
  {
    id: '1',
    status: 'total',
    count: '2000',
    icon: UserIconTotal,
    bgFrame: bgFrame1,
  },
  {
    id: '2',
    status: 'active',
    count: '560',
    icon: UserIconActive,
    bgFrame: bgFrame2,
  },
  {
    id: '3',
    status: 'deactivated',
    count: '700',
    icon: UserIconDeactivated,
    bgFrame: bgFrame3,
  },
  {
    id: '4',
    status: 'pending',
    count: '740',
    icon: UserIconPending,
    bgFrame: bgFrame4,
  },
];

export default USER_STATISTICS;
