/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { format } from 'date-fns';
import useDebounce from 'hooks/useDebouncee';

import { SearchAndFilters } from 'shared';

import Workstation from 'modules/OutboundCallGroupAgent/pages/WorkStation-/WorkStation';

import { filters } from 'constant/electionData';
import { ReactComponent as CloudIcon } from 'assets/CloudIcon.svg';

import useStyles from 'modules/CallGroupAgent/pages/WorkStation/styled.workstation';
import useAuth from 'hooks/useAuth';

function Index() {
  const { auth } = useAuth();
  const classes = useStyles();
  const [filterValue, setFilterValue] = useState(null);
  const [date, setDate] = useState('');
  const [search, setSearch] = useState('');

  const searchTerm = useDebounce(search, 1000);

  function renderGreetingTime() {
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
  }

  return (
    <Box className={classes.root}>
      <Box>
        <Breadcrumbs sx={{ p: 0 }}>
          <Typography sx={{ p: 0 }}>Work Station</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="h3">
              {' '}
              {renderGreetingTime()}, {auth?.userObj?.firstname}{' '}
              {auth?.userObj?.lastname}
            </Typography>
          </Box>

          <Box
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                mr: 2,
              }}
            >
              <CloudIcon />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                {' '}
                <Typography variant="body2">
                  {format(new Date(), 'eeee, MMMM dd ')}
                </Typography>
              </Box>
              <Typography variant="body2">
                {format(new Date(), 'hh:mm a')}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Grid container sx={{ my: 8 }}>
          <Grid item md={8}>
            <SearchAndFilters
              getSearchValue={setSearch}
              showFilters
              getFilterValue={setFilterValue}
              isDate
              filters={filters}
              onChange={(value) => setDate(value)}
              date={date}
              showSelectedDate
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Workstation
          search={searchTerm}
          filterValue={filterValue}
          date={date}
        />
      </Box>
    </Box>
  );
}

export default Index;
