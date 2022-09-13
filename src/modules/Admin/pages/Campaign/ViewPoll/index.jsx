/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { CircularProgressbar } from 'react-circular-progressbar';
import DownloadIcon from '@mui/icons-material/Download';
import PatternImage from 'assets/backgroundpattern.svg';

import EmptyCallCenter from 'assets/emptyCallCenter.svg';

import { Card, Table, TabNav, Button } from 'shared';

import { columns } from 'constant/pollData';

import { ReactComponent as RateIcon } from 'assets/apathy.svg';

import nameInitial from 'utils/nameInitial';

import TimeLine from 'modules/Admin/components/Campaign/Timeline';

import Response from 'modules/Admin/pages/Campaign/ViewPoll/Response';

import {
  getCampaignPollRecords,
  getPoll,
  getPollAgents,
} from 'modules/Admin/services/campaigns';

import useStyles from 'modules/Admin/pages/Campaign/ViewPoll/styled.viewPoll';
import { getTimeline } from 'utils/transformDate';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 4, px: 0 }}>{children}</Box>}
    </div>
  );
}

function PollName() {
  const classes = useStyles();
  const { id: campaignId, pollId } = useParams();
  // const { data, isLoading } = useQuery(
  //   ['view-poll', { campaignId, pollId }],
  //   getCampaignPollRecords
  // );
  // const { data: pollAgentData } = useQuery(
  //   ['poll-agents', { pollId }],
  //   getPollAgents
  // );
  const { data: pollData, isLoading: pollLoading } = useQuery(
    ['get-poll', { id: pollId }],
    getPoll
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [value, setValue] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (pollLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item>
          <Breadcrumbs sx={{ p: 0, mb: 5 }}>
            <Link to="/admin/campaign">
              <Typography sx={{ p: 0 }}>Campaign</Typography>
            </Link>
            <Link to={`/admin/campaign/view/${campaignId}`}>
              <Typography sx={{ p: 0 }}>
                {pollData && pollData?.data?.campaign?.name}
              </Typography>
            </Link>
            <Link to={`/admin/campaign/view/${campaignId}/polls`}>
              <Typography sx={{ p: 0 }}>Poll</Typography>
            </Link>
            <Typography sx={{ p: 0, fontWeight: 600 }}>
              {pollData && pollData?.data?.name}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 0, mb: 4 }}>
        <Grid item md={10} className={classes.test}>
          <Card
            style={{
              height: '160px',
              backgroundImage: `url(${PatternImage})`,
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              className={classes.topStack}
            >
              <Typography variant="subtitle1">
                {pollData?.data?.type || 'N/A'}
              </Typography>
              <Typography variant="subtitle1" component="span">
                {pollData && pollData?.data?.status}
              </Typography>
            </Stack>
            <Typography variant="h5">
              {pollData?.data?.name || 'N/A'}
            </Typography>
            <TimeLine
              progress={
                pollData &&
                getTimeline(
                  pollData?.data?.start_date,
                  pollData?.data?.end_date
                )
              }
              startDate={
                pollData &&
                format(new Date(pollData?.data?.start_date), 'dd MMM, yyyy')
              }
              endDate={
                pollData &&
                format(new Date(pollData?.data?.end_date), 'dd MMM, yyyy')
              }
            />
          </Card>
        </Grid>
        <Grid item md={2} className={classes.rate}>
          <Card
            style={{
              height: '160px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h5">
              <RateIcon style={{ width: 18, height: 18 }} /> Response Rate
            </Typography>
            <Box
              style={{
                width: 60,
                height: 60,
                margin: 'auto',
              }}
            >
              <CircularProgressbar
                value={80}
                text="80%"
                styles={{
                  root: {},
                  path: {
                    stroke: '#0050C8',
                    strokeLinecap: 'butt',
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                  },
                  trail: {
                    strokeLinecap: 'butt',
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                  },
                  text: {
                    fill: '#6B6C7E',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                  },
                  background: {
                    fill: '',
                  },
                }}
              />
            </Box>
            <Typography variant="body2">
              <Typography component="span" sx={{ color: '#6B6C7E' }}>
                200,000/
              </Typography>
              15,000,000{' '}
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <TabNav
            navs={['Response', 'Poll Agent']}
            value={value}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Button>
            Export &nbsp; <DownloadIcon fontSize="small" />
          </Button>
        </Grid>
      </Grid>
      <Box>
        <TabPanel value={value} index={0}>
          <Response />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box className={classes.table}>
            {/* {pollAgentData && pollAgentData.data.data.length !== 0 ? (
              <Box className={classes.pollAgent_empty}>
                <img src={EmptyCallCenter} alt="An empty box" />
                <Typography variant="h2" sx={{ color: '#323130', py: 2 }}>
                  No Poll Agent
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ width: '30%', margin: 'auto' }}
                >
                  You currently do not have any poll agent
                </Typography>
              </Box>
            ) : (
              <Table
                emptyIconTitle="No Agent"
                emptyIconMessage="You currently do not have any Agent"
                results={list || []}
                columns={columns}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            )} */}
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
}

export default PollName;

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
