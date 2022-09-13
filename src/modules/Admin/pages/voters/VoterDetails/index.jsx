import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

// import Table from 'modules/Admin/pages/voters/VoterDetails/Table';

import InfoCard from 'modules/Admin/pages/voters/ViewPolls/InfoCard';

import VoterDetail from 'modules/Admin/components/Voters/Drawer/VoterDetails';

import useStyles from 'modules/Admin/pages/voters/VoterDetails/styled.viewVoter';

function VoterDetails() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.topContainer}>
        <Breadcrumbs sx={{ p: 0, mb: 5 }}>
          <Link to="/admin/voter">
            <Typography sx={{ p: 0 }}>Voters</Typography>
          </Link>
          <Typography sx={{ p: 0 }}>Voter&lsquo;s Name</Typography>
        </Breadcrumbs>
        <InfoCard />
      </Box>
      {/* <Box style={{ paddingTop: '18em' }}>
        <Table />
      </Box> */}
      <VoterDetail />
    </Box>
  );
}

export default VoterDetails;
