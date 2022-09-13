export const BasePaths = {
  ADMIN: '/admin',
  SUPERADMIN: '/super',
  CALL_AGENT: '/lead-call-agent',
  CALL_AGENT_INBOUND: '/inbound-call-agent',
  CALL_AGENT_OUTBOUND: '/outbound-call-agent',
  CAMPAIGN_MANAGER: '/campaign-manager',
  CALL_GROUP_LEAD_OUTBOUND: '/call-group-lead-outbound',
};

export const AuthPaths = {
  SIGNIN: 'signin',
  SIGNUP: 'signup',
  FORGOT_PASSWORD: 'forgot-password',
  RESET_PASSWORD: 'verify-user/',
};

export const AdminPaths = {
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_CAMPAIGN: '/admin/campaign',
  ADMIN_CALL_GROUP: '/admin/call-group',
  ADMIN_DIRECTORY: '/admin/directory',
  ADMIN_ELECTORATE: '/admin/database/electorate',
  ADMIN_USER_MANAGEMENT: '/admin/user-management',
  ADMIN_VOTER: '/admin/voter',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_VOTERS_360: '/admin/voters-360',
  ADMIN_CANVASSER: '/admin/canvassers',
  ADMIN_PARTY: '/admin/party',
};

export const SuperAdminPaths = {};

export const LeadCallGroupPaths = {
  CALL_GROUP_DASHBOARD: '/lead-call-agent/dashboard',
  CALL_GROUP_WORK_STATION: '/lead-call-agent/workstation',
  CALL_GROUP_AGENT: '/lead-call-agent/agents',
  CALL_GROUP_LOG: '/lead-call-agent/logs',
};

export const InboundCallGroupPaths = {
  CALL_GROUP_DASHBOARD: '/inbound-call-agent/dashboard',
  CALL_GROUP_WORK_STATION: '/inbound-call-agent/workstation',
  CALL_GROUP_LOG: '/inbound-call-agent/log',
};
export const otboundCallGroupPaths = {
  CALL_GROUP_DASHBOARD: '/outbound-call-agent/dashboard',
  CALL_GROUP_WORK_STATION: '/outbound-call-agent/workstation',
  CALL_GROUP_LOG: '/outbound-call-agent/logs',
};

export const CampaignManagerPaths = {
  CAMPAIGN_MANAGER_DASHBOARD: '/campaign-manager/dashboard',
  CAMPAIGN_MANAGER_WARROOM: '/campaign-manager/war-room',
  CAMPAIGN_MANAGER_POLL: '/campaign-manager/poll',
};

export const CallGroupLeadOutboundPaths = {
  CALL_GROUP_LEAD_DASHBOARD: '/call-group-lead-outbound/dashboard',
  CALL_GROUP_LEAD_WORKSTATION: '/call-group-lead-outbound/workstation',
  CALL_GROUP_LEAD_AGENTS: '/call-group-lead-outbound/agents',
  CALL_GROUP_LEAD_LOG: '/call-group-lead-outbound/log',
};
