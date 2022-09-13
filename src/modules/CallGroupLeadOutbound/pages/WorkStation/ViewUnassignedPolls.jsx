import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { makeStyles } from '@mui/styles';

import nameInitial from 'utils/nameInitial';

import Logo from 'assets/logo.svg';

import useAuth from 'hooks/useAuth';

import AssignPoll from 'modules/CallGroupLeadOutbound/pages/WorkStation/AssignPoll';
import { Box } from '@mui/material';

const useStyles = makeStyles({
  root: {
    '& .MuiAppBar-root': {
      boxShadow: 'inset 0px -1px 0px #E5E5EA;',
      background: '#fff',
    },
  },
});
function ViewUnassignedPolls() {
  const { auth } = useAuth();
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.root}>
      <AppBar position="fixed" color="transparent">
        <Toolbar>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            sx={{ mx: 4 }}
          >
            <Grid item md={4}>
              <img src={Logo} alt="polleasy logo" />
            </Grid>
            <Grid item md={8}>
              <Grid
                container
                spacing={6}
                justifyContent="flex-end"
                alignItems="center"
              >
                <Grid item className="gear">
                  <Link to="/admin/settings">
                    <SettingsIcon />
                  </Link>
                </Grid>
                <Grid item>
                  <Badge
                    variant="dot"
                    color="error"
                    overlap="circular"
                    badgeContent="  "
                  >
                    <NotificationsNoneIcon />
                  </Badge>
                </Grid>
                <Grid item>
                  <Avatar
                    onClick={() => {
                      auth.signOut();
                      navigate('/');
                    }}
                    sx={{ width: 30, height: 30 }}
                  >
                    <Typography variant="body2">
                      {nameInitial('Mona Kane')}
                    </Typography>
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AssignPoll />
    </Box>
  );
}

export default ViewUnassignedPolls;
