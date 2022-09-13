/* eslint-disable */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import useStyles from 'modules/Admin/pages/Campaign/AddNew/FormSteps/Preview/styled.preview';

import PartyFlag from 'assets/partyFlag.svg';

import { Card } from 'shared';

function Oppositions({ oppositionDetails }) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant="body2">Oppositions</Typography>
      <Grid container justifyContent="flex-start" spacing={4}>
        {oppositionDetails.map((opposition) => (
          <Grid item key={opposition.party} md={6}>
            <Card>
              <Grid container alignItems="flex-start">
                <Grid item>
                  <Typography variant="h5" style={{ paddingTop: '0px' }}>
                    {`${opposition.firstname} ${opposition.lastname}`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="flex-start">
                <Grid item>
                  <img
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'contain',
                    }}
                    src={opposition.flag}
                    alt="party flag"
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    sx={{ py: '0px !important' }}
                    color="primary"
                  >
                    {opposition.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ py: '0px !important' }}>
                    {opposition.alias}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Oppositions;
