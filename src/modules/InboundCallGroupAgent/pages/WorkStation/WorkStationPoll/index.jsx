import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { format } from 'date-fns';

import { ReactComponent as SunIcon } from 'assets/sun.svg';
import { ReactComponent as CloudIcon } from 'assets/cloud.svg';

import Response from 'modules/CallGroupAgent/pages/WorkStation/WorkStationPoll/Response';

import useStyles from 'modules/CallGroupAgent/pages/WorkStation/WorkStationPoll/styled.workStationPoll';

function ViewPolls() {
  const classes = useStyles();
  return (
    <Box className={classes.root} sx={{ position: 'fixed', width: '80%' }}>
      <Grid container>
        <Grid item>
          <Breadcrumbs sx={{ p: 0, mb: 5 }}>
            <Link to="/call-agent/workstation">
              <Typography sx={{ p: 0 }}>Work Station</Typography>
            </Link>
            <Typography sx={{ p: 0 }}>
              {' '}
              Q1 Popularity Rating For South-South Territorial Region
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ mt: 0, mb: 4 }}>
        <Grid item md={1.2}>
          <Box
            sx={{
              border: '1px solid #0050C8',
              p: '3px',
              background: '#F0F5FF',
              borderRadius: '4px',
              ml: 5,
            }}
          >
            <Typography variant="subtitle1" color="primary">
              Apathy Poll{' '}
            </Typography>
          </Box>
        </Grid>
        <Grid md={8.8} />
        <Grid item md={2} className={classes.rate}>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Box
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <SunIcon style={{ width: 28, height: 28 }} />
              <Typography sx={{ mt: -9 }}>
                <CloudIcon style={{ width: 28, height: 28 }} />
              </Typography>
            </Box>
            <Box className={classes.dates}>
              <Typography variant="body2">
                {format(new Date(), 'eeee, MMMM dd ')}
              </Typography>
              <Typography variant="body2">
                {format(new Date(), 'hh:mm a')}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Response />
    </Box>
  );
}

export default ViewPolls;
