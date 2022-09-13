import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import { Drawer } from 'shared';

import useDrawer from 'hooks/useDrawer';

import nameInitial from 'utils/nameInitial';

import useStyles from 'modules/Admin/components/Voters/Drawer/VoterDetails/styled.voterDetails';

import { getVoterId } from 'modules/Admin/pages/voters/services';

function PollDetail() {
  const classes = useStyles();
  const [state, setState] = useDrawer();
  const { id } = useParams();
  const { data: voterData } = useQuery(['voterId', { id }], getVoterId);

  const handleCloseDrawer = useCallback(() => {
    setState({ ...state, drawerName: '' });
  }, [state]);

  return (
    <Drawer
      drawerName="voterDetail"
      titleText="Voters Details"
      primaryButton="Close"
      handleSubmit={handleCloseDrawer}
    >
      <Box className={classes.topInfo}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item md={3}>
            <Avatar variant="square">
              {voterData &&
                nameInitial(
                  `${voterData.data.data.firstName} ${voterData.data.data.lastName}`
                )}
            </Avatar>
          </Grid>
          <Grid item md={9}>
            <Typography variant="body1">
              {voterData &&
                `${voterData.data.data.firstName} ${
                  voterData.data.data.middleName ?? ' '
                } ${voterData.data.data.lastName}`}
            </Typography>
            <Typography variant="subtitle1">
              Email: {voterData && voterData.data.data.email}
            </Typography>
            <Typography variant="subtitle1">
              Mobile: {voterData && voterData.data.data.phoneNumber}
            </Typography>
            <Typography variant="subtitle1">
              Location: {voterData && voterData.data.data.state}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.information}>
        <Typography variant="body2">Information</Typography>
      </Box>
      <Box className={classes.bottomInfo}>
        <Typography variant="subtitle1">Religion</Typography>
        <Typography variant="body2">
          {voterData && voterData.data.data.religion}
        </Typography>
        <Typography variant="subtitle1">Location</Typography>
        <Typography variant="body2">
          {voterData && voterData.data.data.location}
        </Typography>
        <Typography variant="subtitle1">State Code</Typography>
        <Typography variant="body2">
          {voterData && voterData.data.data.stateCode}
        </Typography>
        <Typography variant="subtitle1">LGA Code</Typography>
        <Typography variant="body2">
          {voterData && voterData.data.data.lgaCode}
        </Typography>
        <Typography variant="subtitle1">Polling Unit Code</Typography>
        <Typography variant="body2">
          {voterData && voterData.data.data.pollingUnitCode}
        </Typography>
        <Typography variant="subtitle1">Reg. Area Code</Typography>
        <Typography variant="body2">
          {voterData && voterData.data.data.regAreaCode}
        </Typography>
      </Box>
    </Drawer>
  );
}

export default PollDetail;
