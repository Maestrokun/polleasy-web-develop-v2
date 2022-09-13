import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import briefcaseIcon from 'assets/briefcase.svg';

import { Drawer } from 'shared';

import useDrawer from 'hooks/useDrawer';

import nameInitial from 'utils/nameInitial';

import useStyles from 'modules/Admin/components/CallGroup/Drawer/ViewAgent/styled.viewAgent';

function ViewAgent() {
  const classes = useStyles();
  const [state] = useDrawer();

  return (
    <Drawer
      drawerName="viewPollAgent"
      titleText="Agent's Details"
      secondaryButton="Close"
    >
      <Box className={classes.topInfo}>
        <Grid container spacing={4}>
          <Grid item>
            <Avatar>{nameInitial(state.data?.name)}</Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h3">{state.data?.name}</Typography>
            <Typography variant="h5">
              <img src={briefcaseIcon} alt="briefcase icon" />
              {state?.data?.role}{' '}
              <span className="status">{state.data?.status}</span>
            </Typography>
            <Typography variant="body1" color="primary">
              User ID: {state.data?.user_ref || '---'}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.bottomInfo}>
        <Box>
          <Typography variant="body1">Email Address</Typography>
          <Typography variant="h5">{state.data?.email}</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body1">Phone Number</Typography>
          <Typography variant="h5">{state.data?.phone}</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body1">Role</Typography>
          <Typography variant="h5">{state.data?.role}</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body1">Call Center</Typography>
          <Typography variant="h5">{state?.data?.center || '---'}</Typography>
        </Box>
        <Divider />
      </Box>
    </Drawer>
  );
}

export default ViewAgent;
