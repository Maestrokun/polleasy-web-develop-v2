import TotalBarIcon from 'assets/TotalBar.svg';
import ActiveBarIcon from 'assets/ActiveBar.svg';
import DeactivatedBarIcon from 'assets/DeactivatedBar.svg';
import DraftBarIcon from 'assets/DraftBar.svg';
import ActivePatternIcon from 'assets/ActivePattern.svg';
import TotalPatternIcon from 'assets/TotalPattern.svg';
import InactivePatternIcon from 'assets/InactivePattern.svg';
import PendingPatternIcon from 'assets/PendingPattern.svg';

const CAMPAIGN_STATS = [
  {
    id: '1',
    status: 'Total',
    label: 'total',
    icon: TotalBarIcon,
    pattern: TotalPatternIcon,
  },
  {
    id: '2',
    status: 'Active',
    label: 'active',
    icon: ActiveBarIcon,
    pattern: ActivePatternIcon,
  },
  {
    id: '3',
    status: 'Deactivated',
    label: 'deactivated',
    icon: DeactivatedBarIcon,
    pattern: InactivePatternIcon,
  },
  {
    id: '4',
    status: 'Draft',
    label: 'draft',
    icon: DraftBarIcon,
    pattern: PendingPatternIcon,
  },
];

export default CAMPAIGN_STATS;
