import TotalBarIcon from 'assets/TotalBar.svg';
import ActiveBarIcon from 'assets/ActiveBar.svg';
import DeactivatedBarIcon from 'assets/DeactivatedBar.svg';
import DraftBarIcon from 'assets/DraftBar.svg';
import ActivePatternIcon from 'assets/ActivePattern.svg';
import TotalPatternIcon from 'assets/TotalPattern.svg';
import InactivePatternIcon from 'assets/InactivePattern.svg';
import PendingPatternIcon from 'assets/PendingPattern.svg';

const CAMPAIGNS = [
  {
    id: 1,
    title: 'Popularity Rating',
    subtitle: 'Segun Oroyo Presidential Campaign',
    stat: 'Popularity Rating',
    status: 'Ongoing',
    ccl: 'Damilola Madashiru',
    start_date: '6 Oct, 2021',
    end_date: '10 Nov, 2021',
    status_bg: '#DEECF9',
  },
  {
    id: 2,
    title: 'Popularity Rating',
    subtitle: 'Segun Oroyo Presidential Campaign',
    stat: 'Q2 Popularity Rating for South South Region',
    status: 'Completed',
    ccl: 'Damilola Madashiru',
    start_date: '6 Oct, 2021',
    end_date: '10 Nov, 2021',
    status_bg: '#5FD25533',
  },
  {
    id: 3,
    title: 'Popularity Rating',
    subtitle: 'Segun Oroyo Presidential Campaign',
    stat: 'Popularity Rating',
    status: 'Ongoing',
    ccl: 'Damilola Madashiru',
    start_date: '6 Oct, 2021',
    end_date: '10 Nov, 2021',
    status_bg: '#DEECF9',
  },
];

const POLLS = [
  {
    id: 1,
    title: 'Candidate Popularity',
    subtitle: 'Segun Oroyo Presidential Campaign',
    stat: 'Popularity Rating',
    status: 'Ongoing',
    ccl: 'Damilola Madashiru',
    start_date: '6 Oct, 2021',
    end_date: '10 Nov, 2021',
    status_bg: '#F0DAFB',
  },
  {
    id: 2,
    title: 'Candidate Popularity',
    subtitle: 'Segun Oroyo Presidential Campaign',
    stat: 'Q2 Popularity Rating for South South Region',
    status: 'Ongoing',
    ccl: 'Damilola Madashiru',
    start_date: '6 Oct, 2021',
    end_date: '10 Nov, 2021',
    status_bg: '#F0DAFB',
  },
  {
    id: 3,
    title: 'Candidate Popularity',
    subtitle: 'Segun Oroyo Presidential Campaign',
    stat: 'Popularity Rating',
    status: 'Ongoing',
    ccl: 'Damilola Madashiru',
    start_date: '6 Oct, 2021',
    end_date: '10 Nov, 2021',
    status_bg: '#F0DAFB',
  },
];

const POLLS_SUMMARY = [
  {
    id: '1',
    status: 'ongoing',
    label: 'ongoing',
    icon: TotalBarIcon,
    pattern: TotalPatternIcon,
  },
  {
    id: '2',
    status: 'draft',
    label: 'draft',
    icon: ActiveBarIcon,
    pattern: ActivePatternIcon,
  },
  {
    id: '3',
    status: 'completed',
    label: 'completed',
    icon: DeactivatedBarIcon,
    pattern: InactivePatternIcon,
  },
  {
    id: '4',
    status: 'not started',
    label: 'not_started',
    icon: DraftBarIcon,
    pattern: PendingPatternIcon,
  },
];

const POLLS_RESPONSE = [
  {
    id: 1,
    name: 'Oladimeji Banke Arole',
    userId: 123456,
  },
  {
    id: 2,
    name: 'Oladimeji Banke Arole',
    userId: 123456,
  },
  {
    id: 3,
    name: 'Oladimeji Banke Arole',
    userId: 123456,
  },
  {
    id: 4,
    name: 'Oladimeji Banke Arole',
    userId: 123456,
  },
  {
    id: 5,
    name: 'Oladimeji Banke Arole',
    userId: 123456,
  },
  {
    id: 6,
    name: 'Oladimeji Banke Arole',
    userId: 123456,
  },
  {
    id: 7,
    name: 'Oladimeji Banke Arole',
    userId: 123456,
  },
  {
    id: 8,
    name: 'Oladimeji Banke Arole',
    userId: 123456,
  },
  {
    id: 9,
    name: 'Oladimeji Banke Arole',
    userId: 123456,
  },
];

const POLL_STATUS = {
  NOT_STARTED: 'Not Started',
  GENERIC: 'Generic',
  ONGOING: 'Ongoing',
  DRAFT: 'Draft',
};

const POLL_TYPES = {
  APATHY: 'Apathy',
  NEEDS_ASSESSMENT: 'Needs Assessment',
  CANDIDATE_POPULARITY: 'Candidate Popularity',
  PARTY_POPULARITY: 'Party Popularity',
  GENERIC: 'Generic',
};

export {
  CAMPAIGNS,
  POLLS,
  POLLS_SUMMARY,
  POLLS_RESPONSE,
  POLL_STATUS,
  POLL_TYPES,
};
