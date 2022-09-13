/* eslint-disable no-nested-ternary */
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import { capitalize } from 'lodash';

import { Button, Card, TableHeader } from 'shared';

import useDrawer from 'hooks/useDrawer';
import {
  useCallGroupStats,
  useFetchCallGroups,
} from 'hooks/queries/useCallGroup';

import CALL_CENTER_STATUS, {
  CALL_GROUP_STATUS_BGCOLOR,
  CALL_GROUP_STATUS_COLOR,
  CALL_GROUP_TYPE_BG_COLOR,
  CALL_GROUP_TYPE_BORDER,
  CALL_GROUP_TYPE_COLOR,
} from 'constant/callCenterStatus';

import EmptyCallCenter from 'assets/emptyCallCenter.svg';

import AddCallCenter from 'modules/Admin/components/CallGroup/Drawer/AddCallCenter';
import SuccessModal from 'modules/Admin/components/CallGroup/Modal/SuccessModal';

import useStyles from 'modules/Admin/pages/CallGroup/index.styled';
import useAlert from 'hooks/useAlert';

function CallGroup() {
  const classes = useStyles();
  const [state, setState] = useDrawer();
  const { showNotification } = useAlert();
  const [callGroupData, setcallGroupData] = React.useState([]);
  const [tableParams, setTableParams] = React.useState({
    search: '',
    sort: '-created_at',
    pagination: {
      pageSize: 10,
      pageNumber: 1,
      total: 0,
    },
    filterBy: 'none',
  });

  const params = {
    page: tableParams.pagination.pageNumber,
    page_size: tableParams.pagination.pageSize,
    search: tableParams.search,
    ordering: tableParams.sort,
    is_active:
      tableParams.filterBy === 'DEACTIVATED'
        ? false
        : tableParams.filterBy === 'ACTIVATED'
        ? true
        : null,
  };
  const { fetchingCallGroup: callGroupIsLoading } = useFetchCallGroups({
    setDataSource: setcallGroupData,
    setTableParams,
    params,
    showNotification,
  });
  const { callGroupStats, fetchingCallStats } = useCallGroupStats();

  const handleOpenDrawer = useCallback(() => {
    setState({ ...state, drawerName: 'createCallCenter' });
  }, [state]);

  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography>Call Group</Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleOpenDrawer}>Add New</Button>
          </Grid>
        </Grid>
        <Grid container spacing={7} sx={{ mt: 1 }}>
          {fetchingCallStats
            ? [0, 1, 2].map((loader) => (
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
            : CALL_CENTER_STATUS.map((stat) => (
                <Grid item key={stat.id} md={3}>
                  <Card>
                    <Grid container>
                      <Grid item md={12}>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="flex-start"
                        >
                          <Grid item md={8}>
                            <Typography
                              variant="body1"
                              sx={{ textTransform: 'capitalize' }}
                            >
                              {stat.status}
                            </Typography>
                            <Typography variant="h3" sx={{ mt: 2 }}>
                              {callGroupStats && callGroupStats[stat.status]}
                            </Typography>
                          </Grid>
                          <Grid item md={2} style={{ textAlign: 'end' }}>
                            <img src={stat.icon} alt="icon" />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
        </Grid>
        <Grid container alignItems="center" spacing={4} sx={{ mt: 4 }}>
          <Grid item md={8}>
            <TableHeader
              options={[
                { value: 'none', label: 'All' },
                { value: 'DEACTIVATED', label: 'Deactivated' },
                { value: 'ACTIVATED', label: 'Activated' },
              ]}
              setTableParams={setTableParams}
              tableParams={tableParams}
            />
          </Grid>
        </Grid>
      </Box>

      {callGroupIsLoading && (
        <Grid container className={classes.emptyState} spacing={3}>
          {[
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 21, 22,
            23,
          ].map((loader) => (
            <Grid item md={3} key={loader}>
              <Skeleton width={250} height={250} />
            </Grid>
          ))}
        </Grid>
      )}
      {!callGroupIsLoading && callGroupData && callGroupData.length === 0 && (
        <Box className={classes.callCenters_empty}>
          <img src={EmptyCallCenter} alt="An empty box" />
          <Typography variant="h2" sx={{ color: '#323130', py: 2 }}>
            No Call Group
          </Typography>
          <Typography variant="body1" sx={{ width: '30%', margin: 'auto' }}>
            You currently do not have any call group
          </Typography>
        </Box>
      )}
      {!callGroupIsLoading && callGroupData && callGroupData.length > 0 && (
        <Grid container spacing={5} className={classes.location}>
          {callGroupData.map((callGroup) => (
            <Grid item md={3} key={callGroup.id}>
              <Link
                to={`/admin/call-group/${callGroup.id}`}
                className={classes.preview}
              >
                <Card className={classes.test} style={{ height: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      component="span"
                      className={classes.status}
                      variant="subtitle1"
                      sx={{
                        background:
                          CALL_GROUP_TYPE_BG_COLOR[
                            callGroup.type?.toLowerCase() || 'inbound'
                          ],
                        color:
                          CALL_GROUP_TYPE_COLOR[
                            callGroup.type?.toLowerCase() || 'inbound'
                          ],
                        border: `1px solid ${
                          CALL_GROUP_TYPE_BORDER[
                            callGroup.type?.toLowerCase() || 'inbound'
                          ]
                        }`,
                        textTransform: 'capitalize',
                      }}
                    >
                      {capitalize(callGroup.type || 'Inbound')}
                    </Typography>
                    <Typography
                      component="span"
                      className={classes.status}
                      variant="subtitle1"
                      sx={{
                        background:
                          CALL_GROUP_STATUS_BGCOLOR[
                            callGroup.is_active ? 'Active' : 'Deactivate'
                          ],
                        color:
                          CALL_GROUP_STATUS_COLOR[
                            callGroup.is_active ? 'Active' : 'Deactivate'
                          ],
                      }}
                    >
                      {!callGroup.is_active ? 'Deactivated' : 'Activated'}
                    </Typography>
                  </Box>
                  <Grid
                    container
                    justifyContent="space-between"
                    className={classes.locationName}
                  >
                    <Grid item sm={10}>
                      <Typography variant="h5">{callGroup.name}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.role}>
                    <Grid item>
                      <Typography variant="subtitle1">
                        Call Group Lead
                      </Typography>
                    </Grid>
                    <Grid container>
                      <Grid item sx={{ mr: 2 }}>
                        <Avatar
                          src={callGroup?.lead?.image ?? null}
                          alt="profile image"
                          sx={{ width: 24, height: 24 }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body1"
                          sx={{ textTransform: 'capitalize' }}
                        >
                          {`${callGroup?.lead?.firstname}
                            ${callGroup?.lead?.lastname}`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}

      <AddCallCenter />
      <SuccessModal />
    </Box>
  );
}

export default CallGroup;
