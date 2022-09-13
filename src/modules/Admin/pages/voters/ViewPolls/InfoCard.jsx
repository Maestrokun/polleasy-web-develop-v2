import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { ReactComponent as ReligionIcon } from 'assets/religion.svg';
import { ReactComponent as BallonIcon } from 'assets/balloon.svg';

import useStyles from 'modules/Admin/pages/voters/ViewPolls/styled.viewPolls';

import nameInitial from 'utils/nameInitial';

import { Card, Button } from 'shared';

import useDrawer from 'hooks/useDrawer';

import { getVoterId } from 'modules/Admin/services/voters';

function InfoCard() {
  const classes = useStyles();
  const [state, setState] = useDrawer();
  const { id } = useParams();
  const { data: voterData, isLoading } = useQuery(
    ['voterId', { id }],
    getVoterId
  );

  const handleViewDetail = () => {
    setState({ ...state, drawerName: 'voterDetail' });
  };

  if (isLoading) {
    return (
      <Card style={{ width: '70%' }}>
        <Box className={classes.root} style={{ width: '70%' }}>
          <Grid container spacing={1}>
            <Grid item md={3}>
              <Skeleton variant="circular" width={120} height={120} />
            </Grid>
            <Grid item md={9}>
              <Stack>
                <Grid container>
                  <Grid item md={12}>
                    <Grid
                      container
                      alignItems="flex-start"
                      justifyContent="space-between"
                    >
                      <Grid item md={8} className="topCard">
                        <Skeleton variant="text" width="70%" />
                        <Grid
                          container
                          spacing={2}
                          alignItems="center"
                          className="wrapper"
                        >
                          <Grid item md={4}>
                            <Skeleton variant="text" width="100%" />
                          </Grid>
                          <Grid item md={4}>
                            <Skeleton variant="text" width="100%" />
                          </Grid>
                          <Grid item md={4} className="gender">
                            <Skeleton variant="text" width="100%" />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={3}>
                        <Skeleton
                          variant="rectangular"
                          width={100}
                          height={30}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={12}>
                    <Divider />
                  </Grid>
                  <Grid item md={2}>
                    <Grid container spacing={2}>
                      <Grid item md={4}>
                        <Skeleton variant="text" width="100%" />
                      </Grid>
                      <Grid item md={4}>
                        <Skeleton variant="text" width="100%" />
                      </Grid>
                      <Grid item md={4}>
                        <Skeleton variant="text" width="100%" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Card>
    );
  }
  return (
    <Box className={classes.root} style={{ width: '70%' }}>
      <Card style={{ boxShadow: '0px 4px 4px rgb(9 11 33 / 2%)' }}>
        <Grid container spacing={1}>
          <Grid item md={3}>
            <Avatar>
              <Typography variant="h3" marginLeft="3px">
                {voterData &&
                  nameInitial(
                    `${voterData.data.data.firstName} ${voterData.data.data.lastName}`
                  )}
              </Typography>
            </Avatar>
          </Grid>
          <Grid item md={9}>
            <Grid container>
              <Grid item md={12}>
                <Grid
                  container
                  alignItems="flex-start"
                  justifyContent="space-between"
                >
                  <Grid item className="topCard">
                    <Typography variant="h3">
                      {voterData &&
                        `${voterData.data.data.firstName} ${
                          voterData.data.data.middleName ?? ' '
                        } ${voterData.data.data.lastName}`}
                    </Typography>
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      className="wrapper"
                    >
                      <Grid item>
                        <Typography variant="body1">
                          Phone No:
                          <Typography component="span">
                            {voterData && voterData.data.data.phoneNumber}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography component="span" sx={{ color: '#9DA0A7' }}>
                          &bull;
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          Marital Status:
                          <Typography component="span">
                            {' '}
                            {voterData && voterData.data.data.maritalStatus}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography component="span" sx={{ color: '#9DA0A7' }}>
                          &bull;
                        </Typography>
                      </Grid>
                      <Grid item className="gender">
                        <Typography variant="body1">
                          {' '}
                          {voterData && voterData.data.data.gender}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item className={classes.viewDetailBtn}>
                    <Button onClick={handleViewDetail}>View Details</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <Divider />
              </Grid>
              <Grid item>
                <Grid container spacing={4} className="bottomCard">
                  <Grid item>
                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1">
                        <BallonIcon style={{ marginRight: '.4em' }} />
                        Date of Birth:
                        <Typography component="span">
                          {' '}
                          {voterData && voterData.data.data.dateOfBirth}
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1">
                        <ReligionIcon style={{ marginRight: '.4em' }} />
                        Religion:
                        <Typography component="span">
                          {' '}
                          {voterData && voterData.data.data.religion}
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default InfoCard;
