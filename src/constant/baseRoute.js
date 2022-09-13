import { lazy } from 'react';

import {
  ADMIN_SIDE_NAVS,
  CALL_GROUP_AGENT_SIDE_OUTBOUND_NAVS,
  CALL_GROUP_AGENT_SIDE_INBOUND_NAVS,
  CALL_GROUP_LEAD_SIDE_NAVS,
  CAMPAIGN_MANAGER_SIDE_NAVS,
  CALL_GROUP_LEAD_OUTBOUND_SIDE_NAVS,
} from 'constant/sidenav';

import { Layout as MainLayout } from 'shared';

import { BasePaths } from './paths';

const BaseRoutes = [
  {
    path: '/*',
    exact: true,
    component: lazy(() => import('pages/Auth/AuthRouter')),
    Layout: false,
    useAuth: false,
  },
  {
    path: `${BasePaths.ADMIN}/*`,
    exact: true,
    component: lazy(() => import('modules/Admin/routes')),
    Layout: MainLayout,
    useAuth: true,
    sidenavItems: ADMIN_SIDE_NAVS,
  },
  {
    path: `${BasePaths.SUPERADMIN}/*`,
    exact: true,
    component: null,
    Layout: null,
    useAuth: true,
    sidenavItems: null,
  },
  {
    path: `${BasePaths.CALL_AGENT}/*`,
    exact: true,
    component: lazy(() => import('modules/CallGroupAgent/routes')),
    Layout: MainLayout,
    useAuth: true,
    sidenavItems: CALL_GROUP_LEAD_SIDE_NAVS,
  },
  {
    path: `${BasePaths.CALL_AGENT_INBOUND}/*`,
    exact: true,
    component: lazy(() => import('modules/InboundCallGroupAgent/routes')),
    Layout: MainLayout,
    useAuth: true,
    sidenavItems: CALL_GROUP_AGENT_SIDE_OUTBOUND_NAVS,
  },
  {
    path: `${BasePaths.CALL_AGENT_OUTBOUND}/*`,
    exact: true,
    component: lazy(() => import('modules/OutboundCallGroupAgent/routes')),
    Layout: MainLayout,
    useAuth: true,
    sidenavItems: CALL_GROUP_AGENT_SIDE_INBOUND_NAVS,
  },
  {
    path: `${BasePaths.CAMPAIGN_MANAGER}/*`,
    exact: true,
    component: lazy(() => import('modules/CampaignManager/Routes')),
    Layout: MainLayout,
    useAuth: true,
    sidenavItems: CAMPAIGN_MANAGER_SIDE_NAVS,
  },
  {
    path: `${BasePaths.CALL_GROUP_LEAD_OUTBOUND}/*`,
    exact: true,
    component: lazy(() => import('modules/CallGroupLeadOutbound/routes')),
    Layout: MainLayout,
    useAuth: true,
    sidenavItems: CALL_GROUP_LEAD_OUTBOUND_SIDE_NAVS,
  },
  {
    path: `${BasePaths.CALL_GROUP_LEAD_OUTBOUND}/workstation/view-polls/unassigned`,
    exact: true,
    component: lazy(() =>
      import(
        'modules/CallGroupLeadOutbound/pages/WorkStation/ViewUnassignedPolls'
      )
    ),
    // Layout: MainLayout,
    useAuth: true,
    sidenavItems: CALL_GROUP_LEAD_OUTBOUND_SIDE_NAVS,
  },
];

export default BaseRoutes;
