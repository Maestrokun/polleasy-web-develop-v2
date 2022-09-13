/*eslint-disable*/
import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import {
  SingleUserDrawer,
  MultipleUserDrawer,
} from 'modules/Admin/components/Agent/Drawer/AddAgent';
import SuccessModal from 'modules/Admin/components/Agent/Modal/SuccessModal';
import DeactivateModal from 'modules/Admin/components/Agent/Modal/DeactivateModal';
import ActivateModal from 'modules/Admin/components/Agent/Modal/ActivateModal';
import RemoveModal from 'modules/Admin/components/Agent/Modal/RemoveModal';
import ResendModal from 'modules/Admin/components/Agent/Modal/ResendModal';
import Table from 'modules/Admin/components/Agent/Table';
import ViewAgent from 'modules/Admin/components/Agent/Drawer/ViewAgent';
import EditAgent from 'modules/Admin/components/Agent/Drawer/EditAgent';
import { Button, Menu } from 'shared';

import useDrawer from 'hooks/useDrawer';

import { filters } from 'constant/agentData';
import USER_STATISTICS from 'constant/userStatistics';

import { fetchStats } from 'modules/Admin/services/userManagement';

import useStyles from 'modules/Admin/pages/UserManagement/styled.index';

function UserManagement() {
  const classes = useStyles();
  const [, setFilterValue] = useState('');
  const [state, setState] = useDrawer();
  const [anchorEl, setAnchorEl] = useState(null);

  const { data, isLoading, isSuccess } = useQuery(['userStats'], fetchStats);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSingle = useCallback(() => {
    setState({ ...state, drawerName: 'addSingleUser' });
    setAnchorEl(null);
  }, [state]);

  const handleBulk = useCallback(() => {
    setState({ ...state, drawerName: 'addMultipleUser' });
    setAnchorEl(null);
  }, [state]);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={classes.root}>
      <Box className="topWrapper">
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5" gutterBottom color="main" fontWeight={700}>
              User Management
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleClick}>
              Add New
              <KeyboardArrowDownIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={7} sx={{ mt: 1 }}>
          {isLoading && !isSuccess
            ? [0, 1, 2, 3].map((loader) => (
                <Grid
                  item
                  key={loader}
                  md={3}
                  sx={{
                    paddingTop: '0px !important',
                  }}
                >
                  <Grid container justifyContent="space-between">
                    <Grid item md={12}>
                      <Skeleton height={170} />
                    </Grid>
                  </Grid>
                </Grid>
              ))
            : USER_STATISTICS.map((stat) => (
                <Grid item key={stat.id} md={3}>
                  <Card elevation={0} width="max-content">
                    <Grid display="flex" container className={classes.card}>
                      <Grid item md={12}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          sx={{ padding: '15px 0px 15px 15px' }}
                        >
                          <Box>
                            <Grid item md={8}>
                              <Typography
                                variant="body1"
                                sx={{ textTransform: 'capitalize' }}
                              >
                                {stat.status}
                              </Typography>
                              <Typography variant="h3" sx={{ mt: 2 }}>
                                {data && data.data.data[stat.status]}
                              </Typography>
                            </Grid>
                          </Box>
                          <Box alignItems="flex-end">
                            <Grid item md={2} style={{ textAlign: 'end' }}>
                              <img src={stat.icon} alt="icon" />
                            </Grid>
                            <Grid sx={{ mt: 4 }}>
                              <img src={stat.bgFrame} alt="icon" />
                            </Grid>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Box>
      <Table />
      <SingleUserDrawer />
      <MultipleUserDrawer />
      <ViewAgent />
      <EditAgent />
      <SuccessModal />
      <DeactivateModal />
      <ActivateModal />
      <ResendModal />
      <RemoveModal />
      <Menu
        handlePopeverClose={handleClose}
        anchorEl={anchorEl}
        menuItems={[
          { className: 'other', name: 'Single', action: handleSingle },
          { className: 'other', name: 'Bulk Upload', action: handleBulk },
        ]}
      />
    </Box>
  );
}

export default UserManagement;
