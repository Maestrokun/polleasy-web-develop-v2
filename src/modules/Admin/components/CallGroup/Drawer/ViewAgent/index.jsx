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
import { underSCoreCapitalizeWord } from 'utils/stringTranform';

function ViewAgent() {
  const classes = useStyles();
  const [state] = useDrawer();
  const [agent, setAgents] = React.useState(null);

  React.useEffect(() => {
    if (state.data) {
      setAgents(state.data);
    }
  }, [state.data]);

  return (
    <Drawer
      drawerName="viewAgent"
      titleText="Agent's Details"
      secondaryButton="Close"
    >
      <Box className={classes.topInfo}>
        <Grid container spacing={4}>
          <Grid item>
            <Avatar>
              {nameInitial(`${agent?.firstname} ${agent?.lastname}`)}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h3">{`${agent?.firstname} ${agent?.lastname}`}</Typography>
            <Typography variant="h5">
              <img src={briefcaseIcon} alt="briefcase icon" />
              {underSCoreCapitalizeWord(agent?.role || '')}
              <span className="status">{agent?.status}</span>
            </Typography>
            <Typography variant="body1" color="primary">
              User ID: {agent?.id}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.bottomInfo}>
        <Box>
          <Typography variant="body1">Email Address</Typography>
          <Typography
            variant="h5"
            fontSize={16}
            color="text.primary"
            fontWeight={400}
          >
            {agent?.email}
          </Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body1">Phone Number</Typography>
          <Typography
            variant="h5"
            fontSize={16}
            color="text.primary"
            fontWeight={400}
          >
            {agent?.phone}
          </Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body1">Role</Typography>
          <Typography
            variant="h5"
            fontSize={16}
            color="text.primary"
            fontWeight={400}
          >
            {underSCoreCapitalizeWord(agent?.role || '')}
          </Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body1">Call Center</Typography>
          <Typography
            variant="h5"
            fontSize={16}
            color="text.primary"
            fontWeight={400}
          >
            {agent?.call_center || '---'}
          </Typography>
        </Box>
        <Divider />
      </Box>
    </Drawer>
  );
}

export default ViewAgent;
