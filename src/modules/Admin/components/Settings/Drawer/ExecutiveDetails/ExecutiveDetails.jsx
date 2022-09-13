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
import useStyles from 'modules/Admin/components/Settings/Drawer/ExecutiveDetails/styled.executiveDetails';
import EditIcon from 'assets/EditIcon.svg';
import PropTypes from 'prop-types';

function ExecutiveDetails({ editMemberDetail }) {
  const classes = useStyles();
  const [state] = useDrawer();

  return (
    <Drawer
      drawerName="executiveDetails"
      titleText="Executive Details"
      secondaryButton="Close"
    >
      <Box className={classes.topInfo}>
        <Grid container spacing={4}>
          <Grid item>
            <Avatar>
              {nameInitial(`${state.data?.firstname} ${state.data?.lastname}`)}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h3">{state.data?.name}</Typography>
            <Typography variant="h5">
              <img src={briefcaseIcon} alt="briefcase icon" />
              <span className="status">{state.data?.position}</span>
            </Typography>
            <Typography
              variant="h6"
              color="primary"
              style={{ cursor: 'pointer', fontSize: '.9rem' }}
              onClick={() => editMemberDetail(state.data?.id)}
            >
              Edit:{' '}
              <img style={{ height: '15px' }} src={EditIcon} alt="Edit icon" />
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.bottomInfo}>
        <Box>
          <Typography variant="body1">Phone Number</Typography>
          <Typography variant="h5">{state.data?.phone}</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body1">Level</Typography>
          <Typography variant="h5">{state.data?.level}</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body1">Jurisdiction</Typography>
          <Typography variant="h5">{state.data?.jurisdiction}</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body1">Zone</Typography>
          <Typography variant="h5">{state.data?.zone}</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body1">Senatorial District</Typography>
          <Typography variant="h5">
            {state.data?.senatorial_district}
          </Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body1">State</Typography>
          <Typography variant="h5">{state.data?.state}</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body1">L.G.A</Typography>
          <Typography variant="h5">{state.data?.lga}</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body1">Ward</Typography>
          <Typography variant="h5">{state.data?.ward}</Typography>
        </Box>
        <Divider />
      </Box>
    </Drawer>
  );
}
ExecutiveDetails.propTypes = {
  editMemberDetail: PropTypes.func,
};

ExecutiveDetails.defaultProps = {
  editMemberDetail: {},
};

export default ExecutiveDetails;
