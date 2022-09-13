import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// WorkStation
import WorkStationPoll from 'modules/OutboundCallGroupAgent/pages/WorkStation/WorkStationPoll';
import Workstation from 'modules/OutboundCallGroupAgent/pages/WorkStation';

import Dashboard from '../pages/Dashboard';
import CallAgent from '..';

function CallAgentRouter() {
  return (
    <Routes>
      <Route element={<CallAgent />}>
        <Route
          path="/"
          element={<Navigate to="/outbound-call-agent/workstation" replace />}
        />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="logs" element={<Dashboard />} />
        <Route
          path="/workstation/view-poll/:id"
          element={<WorkStationPoll />}
        />
        <Route path="workstation" element={<Workstation />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default CallAgentRouter;
