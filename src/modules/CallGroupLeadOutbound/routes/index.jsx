import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from 'modules/CallGroupLeadOutbound/pages/Dashboard';
import WorkStation from 'modules/CallGroupLeadOutbound/pages/WorkStation';
import ViewPolls from 'modules/CallGroupLeadOutbound/pages/WorkStation/ViewPolls/ViewPolls';
import ViewUnassignedPolls from 'modules/CallGroupLeadOutbound/pages/WorkStation/ViewUnassignedPolls';

import CallGroupLeadOutbound from '..';

function CallGroupLeadOutboundRouter() {
  return (
    <Routes>
      <Route element={<CallGroupLeadOutbound />}>
        <Route
          path="/"
          element={
            <Navigate to="/call-group-lead-outbound/workstation" replace />
          }
        />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="workstation" element={<WorkStation />} />
        <Route path="workstation/view-polls/:pollId" element={<ViewPolls />} />
        <Route
          path="workstation/view-polls/unassigned"
          element={<ViewUnassignedPolls />}
        />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default CallGroupLeadOutboundRouter;
