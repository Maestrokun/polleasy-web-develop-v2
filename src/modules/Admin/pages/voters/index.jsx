import React from 'react';
import { useQuery } from 'react-query';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import VOTER_STATUS from 'constant/voterStatus';

import { Button, Card } from 'shared';

import Table from 'modules/Admin/pages/voters/Table';
import Filter from 'modules/Admin/pages/voters/Filter';

import UploadVoterDrawer from 'modules/Admin/components/Voters/Drawer/UploadVoter';
import SuccessModal from 'modules/Admin/components/Voters/Modal/SuccessModal';

import useDrawer from 'hooks/useDrawer';

import useStyles from 'modules/Admin/pages/voters/styled.voters';

import { getVoterStats } from 'modules/Admin/pages/voters/services/index';

function Voters() {
  const classes = useStyles();
  const [state, setState] = useDrawer();
  const { data: voterData, isLoading } = useQuery(
    ['VoterStats'],
    getVoterStats
  );

  const handleUploadVoter = () => {
    setState({ ...state, drawerName: 'uploadVoter' });
  };

  if (isLoading) {
    return (
      <Box sx={{ paddingTop: '8em' }}>
        <Skeleton sx={{ height: '150vh !important' }} />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Box className="topContainer">
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography>Voters</Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleUploadVoter}>Upload Voter</Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={7} sx={{ mt: 1 }}>
        {VOTER_STATUS.map((data) => (
          <Grid item key={data.id} md={3}>
            <Card>
              <Grid container>
                <Grid item md={12}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Grid item md={8}>
                      <Typography variant="body1">{data.status}</Typography>
                      <Typography variant="h3" sx={{ mt: 2 }}>
                        {voterData && voterData.data.data[data.count]}
                      </Typography>
                    </Grid>
                    <Grid item md={2} sx={{ textAlign: 'end' }}>
                      <img src={data.icon} alt="icon" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: '2em' }}>
        <Grid container spacing={4}>
          <Grid item md={2.9}>
            <Filter />
          </Grid>
          <Grid item md={9}>
            <Box className={classes.table}>
              <Grid container>
                <Grid item md={12}>
                  <Table />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <UploadVoterDrawer />
      <SuccessModal />
    </Box>
  );
}

export default Voters;
