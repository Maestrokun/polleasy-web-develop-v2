/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { format } from 'date-fns';

import { SearchAndFilters } from 'shared';

import { filters } from 'constant/electionData';

import { ReactComponent as SunIcon } from 'assets/sun.svg';
import { ReactComponent as CloudIcon } from 'assets/cloud.svg';

import useStyles from 'modules/CallGroupAgent/pages/WorkStation/styled.workstation';
import Workstation from './WorkStation';

function Index() {
  const classes = useStyles();
  const [filterValue, setFilterValue] = useState('');

  const renderGreetingTime = () => {
    const time = new Date().getHours();
    let greeting;
    if (time < 12) {
      // eslint-disable-next-line no-return-assign
      return (greeting = 'Good morning');
    }
    if (time > 12 && time < 17) {
      // eslint-disable-next-line no-return-assign
      return (greeting = 'Good Afternoon');
    }
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-return-assign
    return (greeting = 'Good evening');
  };

  return (
    <Box className={classes.root}>
      <Box className="topContainer">
        <Breadcrumbs sx={{ p: 0 }}>
          <Typography sx={{ p: 0 }}>Work Station</Typography>
        </Breadcrumbs>
        <Grid container>
          <Grid item md={3}>
            <Typography variant="h3">
              {renderGreetingTime()}, Morenike!
            </Typography>
          </Grid>
          <Grid md={7.5} />
          <Grid item md={0.5}>
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
          </Grid>
          <Grid md={1}>
            <Box
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="subtitle1">
                {format(new Date(), 'eeee, MMMM dd ')}
              </Typography>
              <Typography variant="body2">
                {format(new Date(), 'hh:mm a')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={8}>
            <SearchAndFilters
              showFilters
              getFilterValue={setFilterValue}
              filters={filters}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className="main">
        <Grid container justifyContent="space-between">
          <Grid item md={12} sx={{ paddingBottom: '3em' }}>
            <Workstation />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Index;
