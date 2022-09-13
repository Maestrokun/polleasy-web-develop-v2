import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Dashboard page
import Dashboard from 'modules/Admin/pages/Dashboard';

// Call group pages
import CallGroup from 'modules/Admin/pages/CallGroup';
import ViewCallGroup from 'modules/Admin/pages/CallGroup/ViewCallGroup';
import ViewPolls from 'modules/Admin/pages/CallGroup/ViewPolls';

// Campaign pages
import Campaign from 'modules/Admin/pages/Campaign';
import CampaignDetails from 'modules/Admin/pages/Campaign/CampaignDetails';
import AddCampaign from 'modules/Admin/pages/Campaign/AddNew';
import ViewPoll from 'modules/Admin/pages/Campaign/ViewPoll';
import Polls from 'modules/Admin/pages/Campaign/Polls';

// AddPoll pages
import AddPoll from 'modules/Admin/pages/Campaign/AddPoll';

// Form Steps Context provider
import CampaignStepperContextProvider from 'context/campaignStepperContext';

// Directory
import Directory from 'modules/Admin/pages/Directory';

// Electorate
import Electorate from 'modules/Admin/pages/Electorate';

// User management Pages
import UserManagement from 'modules/Admin/pages/UserManagement';

// Voters pages
import Voters from 'modules/Admin/pages/voters';

// voters 360
import Voters360 from 'modules/Admin/pages/voters360';
// import ViewVoter from 'modules/Admin/pages/voters/VoterDetails';
import ViewCampaign from 'modules/Admin/pages/voters/ViewPolls';

// Party Management Page
import PartyManagement from 'modules/Admin/pages/Settings/PartyManagement';

// Setting Pages
import Settings from 'modules/Admin/pages/Settings';
import PoliticalParties from 'modules/Admin/pages/Settings/PartyManagement/PoliticalParties';
import MyParty from 'modules/Admin/pages/Settings/PartyManagement/MyParty';
import AddExecutives from 'modules/Admin/pages/Settings/PartyManagement/MyParty/Executives/index';
import EditParty from 'modules/Admin/pages/Settings/PartyManagement/MyParty/EditParty/index';

import Admin from '..';
import VoterInfo from '../pages/voters360/VoterInfo';
import SingleElectorate from '../pages/Electorate/SingleElectorate';
import Party from '../pages/Party';
import SParty from '../pages/Party/Party';
import Canvasser from '../pages/Canvassers';
import SCanvasser from '../pages/Canvassers/Canvasser';

function CallGroupBuffer() {
  return <Outlet />;
}

function CreatePoll() {
  return (
    <CampaignStepperContextProvider>
      <AddPoll />
    </CampaignStepperContextProvider>
  );
}

function CCARouter() {
  return (
    <Routes>
      <Route element={<Admin />}>
        <Route path="/" element={<Navigate to="/admin/campaign" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="call-group" element={<CallGroupBuffer />}>
          <Route path="" element={<CallGroup />} />
          <Route path=":id" element={<CallGroupBuffer />}>
            <Route path="" element={<ViewCallGroup />} />
            <Route path=":pollId" element={<CallGroupBuffer />}>
              <Route path="view-poll" element={<ViewPolls />} />
            </Route>
          </Route>
        </Route>
        {/* <Route path="call-group/:id/:id" element={<ViewPolls />} /> */}
        <Route path="campaign" element={<Campaign />} />;
        <Route path="campaign/view/:id" element={<CampaignDetails />} />
        <Route path="campaign/view/:id/polls" element={<Polls />} />
        <Route
          path="campaign/view/:id/polls/:pollId/view"
          element={<ViewPoll />}
        />
        <Route
          path="campaign/add-new"
          element={
            <CampaignStepperContextProvider>
              <AddCampaign />
            </CampaignStepperContextProvider>
          }
        />
        <Route path="directory" element={<Directory />} />
        <Route path="campaign/view/:campaignId/add-poll">
          <Route path=":pollId" element={<CreatePoll />} />
          <Route path="" element={<CreatePoll />} />
        </Route>
        <Route path="database/electorate" element={<Electorate />} />
        <Route path="database/electorate/:id" element={<SingleElectorate />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="voters-360" element={<Voters360 />} />
        <Route path="voters-360/:id" element={<VoterInfo />} />
        <Route path="voter" element={<Voters />} />
        {/* <Route path="voter/:id" element={<ViewVoter />} /> */}
        <Route path="voter/:id" element={<ViewCampaign />} />
        <Route path="settings" element={<Settings />} />
        <Route path="settings/party-management" element={<PartyManagement />} />
        <Route
          path="settings/party-management/political-parties"
          element={<PoliticalParties />}
        />
        <Route
          path="settings/party-management/my-party"
          element={<MyParty />}
        />
        <Route
          path="settings/party-management/view-executives"
          element={<AddExecutives />}
        />
        <Route
          path="settings/party-management/edit-party/:id"
          element={<EditParty />}
        />
        <Route path="party" element={<Party />} />
        <Route path="party/:id" element={<SParty />} />
        <Route path="canvassers" element={<Canvasser />} />
        <Route path="canvassers/:id" element={<SCanvasser />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default CCARouter;
