import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import briefcaseIcon from 'assets/briefcase.svg';

import { Drawer } from 'shared';

import useDrawer from 'hooks/useDrawer';

import nameInitial from 'utils/nameInitial';

import useStyles from 'modules/Admin/components/Agent/Drawer/ViewAgent/styled.viewAgent';

function ViewAgent() {
  const classes = useStyles();
  const [state] = useDrawer();

  return (
    <Drawer
      drawerName="userDetail"
      titleText="User's Details"
      secondaryButton="Close"
    >
      <Box className={classes.topInfo}>
        <Grid container spacing={4}>
          <Grid item>
            <Avatar>{nameInitial(state?.name)}</Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h3" sx={{ textTransform: 'capitalize' }}>
              {state?.name}
            </Typography>
            <Typography variant="h5">
              <img src={briefcaseIcon} alt="briefcase icon" />
              {state?.role} <span className="status">{state?.status}</span>
            </Typography>
            <Typography variant="body1" color="primary">
              User ID: {state?.temp_identifier}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.bottomInfo}>
        <Box>
          <Typography variant="body1">Email Address</Typography>
          <Typography variant="h5">{state?.email}</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body1">Phone Number</Typography>
          <Typography variant="h5">{state?.phone}</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body1">Role</Typography>
          <Typography variant="h5">{state?.role}</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body1">Language Spoken</Typography>
          {state?.languages?.split(',').map((language) => (
            <Box className={classes.selectedLanguages}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    paddingRight: '1em',
                    textTransform: 'capitalize',
                  }}
                >
                  {language}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
}

export default ViewAgent;
