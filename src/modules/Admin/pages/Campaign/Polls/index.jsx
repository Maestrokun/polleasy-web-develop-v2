/* eslint-disable  */
import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import EmptyCallCenter from 'assets/emptyCallCenter.svg';

import { filters } from 'constant/agentData';

import PollCard from 'modules/Admin/pages/Campaign/CampaignDetails/PollCard';
import StatSummary from 'modules/Admin/pages/Campaign/Polls/StatSummary';

import { SearchAndFilters, Button } from 'shared';

import {
  getCampaign,
  getCampaignPolls,
} from 'modules/Admin/services/campaigns';

import useStyles from 'modules/Admin/pages/Campaign/Polls/styled.polls';

function Polls() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const [, setFilterValue] = useState('');
  const { data, isLoading } = useQuery(
    ['campaign-polls', { id }],
    getCampaignPolls
  );
  // eslint-disable-next-line no-unused-vars
  const { data: campaignData, isLoading: isLoadingCampaign } = useQuery(
    ['single-campaign', { id }],
    getCampaign
  );

  const handleViewPoll = useCallback((pollID) => {
    navigate(`${pathname}/${pollID}/view`);
  });

  const handleCreatePoll = useCallback(() => {
    navigate(`/admin/campaign/view/${id}/add-poll`);
  });

  if (isLoading && isLoadingCampaign)
    return <Typography>Loading...</Typography>;

  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item>
          <Breadcrumbs sx={{ p: 0, mb: 5 }}>
            <Link to="/admin/campaign">
              <Typography sx={{ p: 0 }}>Campaign</Typography>
            </Link>
            <Link to={`/admin/campaign/view/${id}`}>
              <Typography sx={{ p: 0 }}>
                {campaignData && campaignData?.data?.name}
              </Typography>
            </Link>
            <Typography sx={{ p: 0, fontWeight: 600 }}>Poll</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <StatSummary data={campaignData} />
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={4}
        sx={{ mt: 4 }}
      >
        <Grid item md={8}>
          <SearchAndFilters
            search={{
              value: '',
              onChange: () => {},
            }}
            showFilters
            getFilterValue={setFilterValue}
            filters={filters}
          />
        </Grid>
        <Grid item>
          <Button onClick={handleCreatePoll}>Create Poll</Button>
        </Grid>
      </Grid>
      <Grid container spacing={5} mt={3}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : data?.data?.data?.length === 0 ? (
          <Box className={classes.poll_empty}>
            <img src={EmptyCallCenter} alt="An empty box" />
            <Typography variant="h2" sx={{ color: '#323130', py: 2 }}>
              No Polls
            </Typography>
            <Typography variant="body1" sx={{ width: '30%', margin: 'auto' }}>
              You currently do not have any polls
            </Typography>
          </Box>
        ) : (
          data?.data?.data?.map((poll) => (
            <Grid item xs={4}>
              <Box onClick={() => handleViewPoll(poll.id)}>
                <PollCard poll={poll} key={poll.id} />
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default Polls;
