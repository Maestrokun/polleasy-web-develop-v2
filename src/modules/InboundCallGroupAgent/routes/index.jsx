import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Dashboard page
import Dashboard from 'modules/Admin/pages/Dashboard';

// WorkStation
import WorkStationPoll from 'modules/CallGroupAgent/pages/WorkStation/WorkStationPoll';

import CallAgent from '..';
import Workstation from '../pages/WorkStation';

function CallAgentRouter() {
  return (
    <Routes>
      <Route element={<CallAgent />}>
        <Route
          path="/"
          element={<Navigate to="/inbound-call-agent/dashboard" replace />}
        />
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="/workstation/workstation-poll"
          element={<WorkStationPoll />}
        />
        <Route path="workstation" element={<Workstation />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default CallAgentRouter;
