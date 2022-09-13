import React from 'react';
import Grid from '@mui/material/Grid';

import CardResponse from 'modules/Admin/pages/CallGroup/ViewPolls/Response/Response';
import CardDetails from 'modules/Admin/pages/CallGroup/ViewPolls/Response/Details';

function Response() {
  return (
    <Grid container>
      <Grid item md={4}>
        <CardResponse />
      </Grid>
      <Grid item md={8}>
        <CardDetails />
      </Grid>
    </Grid>
  );
}

export default Response;
