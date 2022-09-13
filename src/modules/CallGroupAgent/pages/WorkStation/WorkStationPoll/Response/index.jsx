import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import CardDetails from 'modules/CallGroupAgent/pages/WorkStation/WorkStationPoll/Response/Details';
import CardCampaign from 'modules/CallGroupAgent/pages/WorkStation/WorkStationPoll/Response/Campaign';

function Response() {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item md={9}>
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
