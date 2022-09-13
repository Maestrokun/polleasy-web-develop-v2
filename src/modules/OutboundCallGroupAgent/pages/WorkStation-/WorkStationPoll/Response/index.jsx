import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import CardResponse from 'modules/CallGroupAgent/pages/WorkStation/WorkStationPoll/Response/Response';
import CardDetails from 'modules/OutboundCallGroupAgent/pages/WorkStation-/WorkStationPoll/Response/DetailsOutbound';
import CardCampaign from 'modules/OutboundCallGroupAgent/pages/WorkStation-/WorkStationPoll/Response/Campaign';

function Response() {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <CardResponse />
        </Grid>
        <Grid item md={6}>
          <CardDetails />
        </Grid>
        <Grid item md={3}>
          <CardCampaign />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Response;
