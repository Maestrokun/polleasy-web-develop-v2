import callCenterTotalIcon from 'assets/callCenterTotal.svg';
import callCenterActiveIcon from 'assets/callCenterActive.svg';
import callCenterInactiveIcon from 'assets/callCenterInactive.svg';

const CALL_CENTER_STATUS = [
  {
    id: '1',
    status: 'total',
    count: '2000',
    icon: callCenterTotalIcon,
  },
  {
    id: '2',
    status: 'active',
    count: '560',
    icon: callCenterActiveIcon,
  },
  {
    id: '3',
    status: 'deactivated',
    count: '700',
    icon: callCenterInactiveIcon,
  },
];

export const CALL_GROUP_STATUS_BGCOLOR = {
  Active: '#D4F7DC',
  Inactive: '#E5E5EA',
  Deactivate: '#FFD4D2',
};

export const CALL_GROUP_STATUS_COLOR = {
  Active: '#15692A',
  Inactive: '#1E0A3C',
  Deactivate: '#9F1F17',
};

export const CALL_GROUP_TYPE_COLOR = {
  inbound: '#0047BD',
  outbound: '#0047BD',
};
export const CALL_GROUP_TYPE_BG_COLOR = {
  inbound: '#F0F5FF',
  outbound: '#F0F5FF',
};
export const CALL_GROUP_TYPE_BORDER = {
  inbound: '#0047BD',
  outbound: '#0047BD',
};

export const CALL_GROUP_POLL_BG_COLOR = {
  ongoing: '#F0DAFB',
  completed: '#D4F7DC',
  default: '#F1F2F6',
};

export const CALL_GROUP_POLL_COLOR = {
  ongoing: '#592474',
  completed: '#15692A',
  default: '#6B6C7E',
};

export default CALL_CENTER_STATUS;
