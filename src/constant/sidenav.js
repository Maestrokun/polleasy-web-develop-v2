import homeIcon from 'assets/home.svg';
import campaignIcon from 'assets/campaign.svg';
import warroomIcon from 'assets/svg/warrroom.svg';
import directoryIcon from 'assets/directory.svg';
import database from 'assets/svg/database.svg';
import voterIcon from 'assets/voters.svg';
import callCenterIcon from 'assets/call_center.svg';

import {
  AdminPaths,
  // CallGroupPaths,
  InboundCallGroupPaths,
  otboundCallGroupPaths,
  CampaignManagerPaths,
  LeadCallGroupPaths,
  CallGroupLeadOutboundPaths,
} from 'constant/paths';

const ADMIN_SIDE_NAVS = [
  { name: 'Dashboard', path: AdminPaths.ADMIN_DASHBOARD, icon: homeIcon },
  { name: 'Campaign', path: AdminPaths.ADMIN_CAMPAIGN, icon: campaignIcon },
  {
    name: 'Call Group',
    path: AdminPaths.ADMIN_CALL_GROUP,
    icon: callCenterIcon,
  },
  { name: 'Voters 360', path: AdminPaths.ADMIN_VOTERS_360, icon: voterIcon },
  { isHeader: true, name: 'DATABASE' },
  { name: 'Directory', path: AdminPaths.ADMIN_DIRECTORY, icon: directoryIcon },
  { name: 'Canvassers', path: AdminPaths.ADMIN_CANVASSER, icon: database },
  { name: 'Party', path: AdminPaths.ADMIN_PARTY, icon: database },

  {
    name: 'Electorate',
    path: AdminPaths.ADMIN_ELECTORATE,
    icon: database,
  },
  // { name: 'Voters', path: AdminPaths.ADMIN_VOTER, icon: voterIcon },
];

const CALL_GROUP_AGENT_SIDE_INBOUND_NAVS = [
  {
    name: 'Dashboard',
    path: InboundCallGroupPaths.CALL_GROUP_DASHBOARD,
    icon: homeIcon,
  },
  {
    name: 'Work Station',
    path: InboundCallGroupPaths.CALL_GROUP_WORK_STATION,
    icon: voterIcon,
  },
  {
    name: 'Log',
    path: InboundCallGroupPaths.CALL_GROUP_LOG,
    icon: callCenterIcon,
  },
];

const CALL_GROUP_AGENT_SIDE_OUTBOUND_NAVS = [
  {
    name: 'Dashboard',
    path: otboundCallGroupPaths.CALL_GROUP_DASHBOARD,
    icon: homeIcon,
  },
  {
    name: 'Work Station',
    path: otboundCallGroupPaths.CALL_GROUP_WORK_STATION,
    icon: voterIcon,
  },
  {
    name: 'Log',
    path: otboundCallGroupPaths.CALL_GROUP_LOG,
    icon: callCenterIcon,
  },
];

const CALL_GROUP_LEAD_SIDE_NAVS = [
  {
    name: 'Dashboard',
    path: LeadCallGroupPaths.CALL_GROUP_DASHBOARD,
    icon: homeIcon,
  },
  {
    name: 'Work Station',
    path: LeadCallGroupPaths.CALL_GROUP_WORK_STATION,
    icon: voterIcon,
  },
  {
    name: 'Agents',
    path: LeadCallGroupPaths.CALL_GROUP_AGENT,
    icon: homeIcon,
  },
  {
    name: 'Logs',
    path: LeadCallGroupPaths.CALL_GROUP_LOG,
    icon: callCenterIcon,
  },
];

const CAMPAIGN_MANAGER_SIDE_NAVS = [
  {
    name: 'Dashboard',
    path: CampaignManagerPaths.CAMPAIGN_MANAGER_DASHBOARD,
    icon: homeIcon,
  },
  {
    name: 'War Room',
    path: CampaignManagerPaths.CAMPAIGN_MANAGER_WARROOM,
    icon: warroomIcon,
  },
  {
    name: 'Poll',
    path: CampaignManagerPaths.CAMPAIGN_MANAGER_POLL,
    icon: campaignIcon,
  },
];

const CALL_GROUP_LEAD_OUTBOUND_SIDE_NAVS = [
  {
    name: 'Dashboard',
    path: CallGroupLeadOutboundPaths.CALL_GROUP_LEAD_DASHBOARD,
    icon: homeIcon,
  },
  {
    name: 'Work Station',
    path: CallGroupLeadOutboundPaths.CALL_GROUP_LEAD_WORKSTATION,
    icon: warroomIcon,
  },
  {
    name: 'Agents',
    path: CallGroupLeadOutboundPaths.CALL_GROUP_LEAD_AGENTS,
    icon: campaignIcon,
  },
  {
    name: 'Log',
    path: CallGroupLeadOutboundPaths.CALL_GROUP_LEAD_LOG,
    icon: campaignIcon,
  },
];

export {
  ADMIN_SIDE_NAVS,
  CAMPAIGN_MANAGER_SIDE_NAVS,
  CALL_GROUP_LEAD_SIDE_NAVS,
  CALL_GROUP_AGENT_SIDE_OUTBOUND_NAVS,
  CALL_GROUP_AGENT_SIDE_INBOUND_NAVS,
  CALL_GROUP_LEAD_OUTBOUND_SIDE_NAVS,
};
