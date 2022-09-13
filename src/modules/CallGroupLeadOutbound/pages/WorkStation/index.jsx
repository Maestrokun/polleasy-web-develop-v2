import React from 'react';
import { useQuery } from 'react-query';
import { CircularProgressbar } from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { ReactComponent as DateRange } from 'assets/svg/date_range.svg';

import avatarColor from 'utils/avatarColor';

import { SearchAndFilters, Card, Spinner } from 'shared';

import filters from 'constant/callGroupLeadOutbound';

import TimeLine from 'modules/Admin/components/CallGroup/TimeLine';

import services from 'modules/CallGroupLeadOutbound/services';

import useStyles from 'modules/CallGroupLeadOutbound/pages/WorkStation/styled.workstation';
import EmptyState from 'shared/NewTable/EmptyState';
import { AvatarGroup } from '@mui/material';
import renderGreetingTime from 'utils/renderTime';
import useAuth from 'hooks/useAuth';
import getDate from 'utils/getDate';

function WorkStation() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const { pathname } = useLocation();

  const { data, isLoading } = useQuery(
    ['assignedpoll'],
    services.geAssignedPOll
  );

  const { data: unassignedpollData, isLoading: isLoadingUnassignedPollData } =
    useQuery(['unassignedpoll'], services.getUnassignedPOll);

  if (data && isLoading) return <Typography>Loading...</Typography>;

  const handleViewPoll = (id) => {
    navigate(`${pathname}/view-polls/${id}`);
  };

  const handleViewUnassigned = (poll) => () => {
    navigate('/call-group-lead-outbound/workstation/view-polls/unassigned', {
      state: poll,
    });
  };

  const statusObj = {
    ONGOING: 'Ongoing',
    NOT_STARTED: 'Not Started',
  };

  return (
    <Box className={classes.root}>
      <Box sx={{ width: '75%' }}>
        <Typography>Work Station</Typography>
        <Typography variant="h2">
          {renderGreetingTime()},
          {` ${auth.userObj.firstname} ${auth.userObj.lastname}`}
        </Typography>
        <Typography>POLLS</Typography>
        <SearchAndFilters showFilters getFilterValue={[]} filters={filters} />
        <Spinner loading={isLoading && data === undefined}>
          <Grid container spacing={4}>
            {data?.length === 0 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '90%',
                }}
              >
                <EmptyState message="No data available" title="Assigned Poll" />
              </Box>
            )}
            {data &&
              data?.map((poll) => (
                <Grid item xs={6} key={poll.id}>
                  <Card style={{ marginTop: '3em', cursor: 'pointer' }}>
                    <Box
                      onClick={() => handleViewPoll(poll.id)}
                      className={classes.wrapper}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        className={classes.stack}
                      >
                        <Typography
                          variant="subtitle1"
                          color="primary"
                          component="span"
                          style={{
                            backgroundColor: '#F0F5FF',
                            border: '1px solid #0047BD',
                            padding: '5px',
                            fontSize: '10px',
                            borderRadius: '4px',
                          }}
                        >
                          {poll.type}
                        </Typography>
                        <Box
                          style={{
                            backgroundColor: '#F0DAFB',
                            color: '#592474',
                            borderRadius: '4px',
                            padding: '5px',
                          }}
                          className={classes.status}
                        >
                          <Typography variant="body1" component="span">
                            {poll?.status}
                          </Typography>
                        </Box>
                      </Stack>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Grid item className={classes.title}>
                          <Typography variant="body1" color="#6B6C7E">
                            {poll?.type}
                          </Typography>
                          <Typography variant="h5" color="#393A4A">
                            {poll?.name}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container sx={{ my: 2 }}>
                        <Grid item sm={12}>
                          <Divider />
                        </Grid>
                      </Grid>
                      <Grid container className={classes.agents}>
                        <Grid item xs={8}>
                          <Grid container>
                            <Grid item md={2} sx={{ margin: '0px' }}>
                              <CircularProgressbar
                                value={60}
                                text="50%"
                                styles={{
                                  root: {
                                    width: '100%',
                                  },
                                  path: {
                                    stroke: '#B98900',
                                    strokeLinecap: 'butt',
                                    transition:
                                      'stroke-dashoffset 0.5s ease 0s',
                                    transform: 'rotate(0.95turn)',
                                    transformOrigin: 'center center',
                                  },
                                  trail: {
                                    strokeLinecap: 'butt',
                                    transform: 'rotate(0.25turn)',
                                    transformOrigin: 'center center',
                                  },
                                  text: {
                                    fill: '#B98900',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                  },
                                  background: {
                                    fill: '',
                                  },
                                }}
                              />
                            </Grid>
                            <Grid item md={8.5}>
                              <Box
                                style={{
                                  marginLeft: '7px',
                                  marginTop: '-12px',
                                }}
                              >
                                <Typography
                                  style={{
                                    fontSize: '14px',
                                    marginBottom: '-15px',
                                  }}
                                >
                                  Overall Progress
                                </Typography>
                                <Typography
                                  component="span"
                                  style={{
                                    fontSize: '14px',
                                  }}
                                >
                                  120,000,000/150,000,000
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>

                        {/* second grid */}
                        <Grid item xs={4}>
                          <Box
                            sx={{
                              borderLeft: '.1px solid #80808033',
                              height: '100%',
                              paddingLeft: '7px',
                            }}
                          >
                            <Typography variant="subtitle1">
                              Call Group Agent(s)
                            </Typography>
                            <AvatarGroup max={4}>
                              {poll?.agents?.map((avatar) => (
                                <Avatar
                                  key={avatar.id}
                                  {...avatarColor(
                                    `${avatar?.agents__firstname} ${avatar?.agents__lastname}`
                                  )}
                                />
                              ))}
                            </AvatarGroup>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container sx={{ my: 2 }}>
                        <Grid item sm={12}>
                          <Divider />
                        </Grid>
                      </Grid>
                      <TimeLine
                        progress={poll?.progress?.covered}
                        startDate={poll?.start_date}
                        endDate={poll?.end_date}
                      />
                    </Box>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Spinner>
      </Box>
      <Box className={classes.unassignedWrapper}>
        <Typography sx={{ fontFamily: 'ubuntu' }}>UNASSIGNED POLLS</Typography>
        <Divider />
        <Spinner
          loading={
            isLoadingUnassignedPollData && unassignedpollData === undefined
          }
        >
          {unassignedpollData?.map((poll) => (
            <Card style={{ marginTop: '15px', paddingBottom: '0px' }}>
              <Box
                onClick={handleViewUnassigned(poll)}
                className={classes.wrapper}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  className={classes.stack}
                >
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    component="span"
                    style={{
                      backgroundColor: '#F0F5FF',
                      border: '1px solid #0047BD',
                      padding: '5px',
                      fontSize: '10px',
                      borderRadius: '4px',
                    }}
                  >
                    {poll.type.split('_').join(' ')}
                  </Typography>
                  <Box
                    style={{
                      backgroundColor: '#F0DAFB',
                      // eslint-disable-next-line no-constant-condition
                      color: `${statusObj?.[poll.status]} === 'Ongoing'`
                        ? '#592474'
                        : '#F1F2F6',
                      borderRadius: '4px',
                      padding: '5px',
                      fontSize: '10px',
                    }}
                    className={classes.status}
                  >
                    <Typography variant="subtitle2" component="span">
                      {statusObj?.[poll.status] || ''}
                    </Typography>
                  </Box>
                </Stack>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Grid sx={{ height: '4rem' }} item className={classes.title}>
                    <Typography sx={{ mt: '1rem' }} variant="h5">
                      {poll.name}
                    </Typography>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    bgcolor: '#F0F5FF',
                    borderRadius: '4px',
                    padding: '0 9px',
                  }}
                >
                  <Box
                    sx={{
                      my: 2,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <DateRange />
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontSize: '9px',
                          color: '#0050C8 !important',
                          mx: 1,
                        }}
                      >
                        {`Start Date: ${getDate(
                          poll.start_date
                        )} - End Date: ${getDate(poll.end_date)}`}{' '}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          ))}{' '}
        </Spinner>
      </Box>
    </Box>
  );
}

export default WorkStation;

WorkStation.propTypes = {
  poll: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    stat: PropTypes.string,
    status_bg: PropTypes.string,
    status: PropTypes.string,
    ccl: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};
