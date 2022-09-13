/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import TimeLine from 'modules/Admin/components/Campaign/Timeline';

import { POLL_STATUS, POLL_TYPES } from 'constant/polls';

import { Card } from 'shared';

import { getTimeline } from 'utils/transformDate';

import useStyles from 'modules/Admin/pages/Campaign/CampaignDetails/PollCard/styled.pollCard';

const statusBg = {
  DRAFT: '#FFF8CC',
  ONGOING: '#F0DAFB',
  COMPLETED: '#D4F7DC',
  NOT_STARTED: '#EDEBE9',
};
function PollCard({ poll }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Card>
        <Box sx={{ width: '100%' }} style={{ boxShadow: 'unset' }}>
          <Stack direction="column">
            <Grid item xs={12} className={classes.title}>
              <Stack
                direction="row"
                sx={{ width: '100%' }}
                justifyContent="space-between"
              >
                <Typography
                  variant="subtitle1"
                  color="primary"
                  component="span"
                  noWrap
                >
                  {POLL_TYPES[poll.type]}
                </Typography>
                <Box
                  style={{
                    backgroundColor: statusBg[poll.status],
                    border: 'unset',
                  }}
                  className={classes.status}
                >
                  <Typography variant="body1" noWrap>
                    {POLL_STATUS[poll.status]}
                  </Typography>
                </Box>
              </Stack>
              <Grid item xs={12}>
                <Typography variant="body1">{poll.name}</Typography>
              </Grid>
            </Grid>
          </Stack>
          <Grid container sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
          <TimeLine
            startDate={format(new Date(poll.start_date), 'dd MMM, yyyy')}
            endDate={format(new Date(poll.end_date), 'dd MMM, yyyy')}
            progress={
              getTimeline(poll.start_date, poll.end_date) < 0
                ? 0
                : getTimeline(poll.start_date, poll.end_date)
            }
          />
        </Box>
      </Card>
    </Box>
  );
}

export default PollCard;

PollCard.propTypes = {
  poll: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    subtitle: PropTypes.string,
    stat: PropTypes.string,
    status_bg: PropTypes.string,
    status: PropTypes.string,
    ccl: PropTypes.string,
    location: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    timeLine: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
  }).isRequired,
};
