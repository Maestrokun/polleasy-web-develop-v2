import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Dashboard page
import Dashboard from 'modules/CampaignManager/Pages/DashBoard/Dashboard';

// WAR Room
import WarRoom from 'modules/CampaignManager/Pages/WarRoom';

import CampaignManager from '..';
import POll from '../Pages/Poll';

function CampaignMnagerRouter() {
  return (
    <Routes>
      <Route element={<CampaignManager />}>
        <Route
          path="/"
          element={<Navigate to="/campaign-manager/dashboard" replace />}
        />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="war-room" element={<WarRoom />} />
        <Route path="poll" element={<POll />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default CampaignMnagerRouter;
