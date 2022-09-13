import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { SearchAndFilters } from 'shared';

import { pollFilters } from 'constant/voterData';

import InfoCard from 'modules/Admin/pages/voters/ViewPolls/InfoCard';

import PollCard from 'modules/Admin/pages/voters/ViewPolls/PollCard';
import Score from 'modules/Admin/pages/voters/ViewPolls/Score';

import PollDetail from 'modules/Admin/components/Voters/Drawer/PollResponse';
import VoterDetail from 'modules/Admin/components/Voters/Drawer/VoterDetails';

import useStyles from 'modules/Admin/pages/voters/ViewPolls/styled.viewPolls';

function ViewPolls() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className="topContainer">
        <Breadcrumbs sx={{ p: 0, mb: 5 }}>
          <Link to="/admin/voter">
            <Typography sx={{ p: 0 }}>Voters</Typography>
          </Link>
          <Typography sx={{ p: 0 }}>Voter&lsquo;s Name</Typography>
        </Breadcrumbs>
        <InfoCard sx={{ paddingBottom: '10em' }} />
        <Grid container sx={{ paddingTop: '3em' }}>
          <Grid item md={8}>
            <SearchAndFilters showFilters filters={pollFilters} />
          </Grid>
        </Grid>
      </Box>
      <Box className="main">
        <Grid
          container
          justifyContent="space-between"
          sx={{ paddingTop: '13em' }}
        >
          <Grid item md={8.5} sx={{ paddingBottom: '3em' }}>
            <PollCard />
          </Grid>
          <Grid item md={3}>
            <Box className="score">
              <Score />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <PollDetail />
      <VoterDetail />
    </Box>
  );
}

export default ViewPolls;
