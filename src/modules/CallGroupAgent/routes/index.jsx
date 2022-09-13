import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Dashboard page
import Dashboard from 'modules/Admin/pages/Dashboard';

// WorkStation
import WorkStationPoll from 'modules/CallGroupAgent/pages/WorkStation/WorkStationPoll';
import Workstation from 'modules/CallGroupAgent/pages/WorkStation';

import CallAgent from '..';
import Agents from '../pages/Agents';
import Logs from '../pages/Logs';

function CallAgentRouter() {
  return (
    <Routes>
      <Route element={<CallAgent />}>
        <Route
          path="/"
          element={<Navigate to="/lead-call-agent/dashboard" replace />}
        />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="agents" element={<Agents />} />
        <Route path="logs" element={<Logs />} />
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
