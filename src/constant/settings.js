import partyIcon from 'assets/partyInfo.svg';
import incidenceReportIcon from 'assets/incidenceReport.svg';
import flagIcon from 'assets/svg/partyInfo.svg';
import shortAnswer from 'assets/svg/shortAnswer.svg';

import { AdminPaths } from './paths';

const SETTINGS = [
  {
    title: 'User Management',
    subTitle: 'Add, edit and review user types',
    icon: partyIcon,
    path: AdminPaths.ADMIN_USER_MANAGEMENT,
  },
  {
    title: 'Party Management',
    subTitle: 'Create questions for popularity rating',
    icon: flagIcon,
    path: '/admin/settings/party-management',
  },
  {
    title: 'Activity Log',
    subTitle: 'Monitor activities going on the system',
    icon: shortAnswer,
    path: '/admin/settings/party-management',
  },
  {
    title: 'Incidence Report',
    subTitle: 'Click to enter Incidence Report settings',
    icon: incidenceReportIcon,
    path: '/admin/settings/incidence-report',
  },
];

export default SETTINGS;
