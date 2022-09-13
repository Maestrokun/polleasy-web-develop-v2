/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';

import { Card } from 'shared';

import PersonaInitial from 'assets/Persona-initials.svg';

import TimeLine from 'modules/Admin/components/CallGroup/TimeLine';

import useStyles from 'modules/Admin/components/CallGroup/PollCard/styled.pollCard';
import { getTimeline } from 'utils/transformDate';
import {
  CALL_GROUP_POLL_BG_COLOR,
  CALL_GROUP_POLL_COLOR,
} from 'constant/callCenterStatus';
import { underSCoreCapitalizeWord } from 'utils/stringTranform';
// import { useFetchPollAgent } from 'hooks/queries/useCallGroup';
import nameInitial from 'utils/nameInitial';

function CampaignCard({ poll }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const { id } = useParams();
  const timeline = getTimeline(
    new Date(poll?.start_date),
    new Date(poll.end_date)
  );
  const handleViewPoll = () => {
    navigate(`/admin/call-group/${id}/${poll?.id}/view-poll`);
  };

  return (
    <Box className={classes.root}>
      <Card style={{ marginBottom: '0px', height: '100%' }}>
        <Box onClick={handleViewPoll} className={classes.wrapper}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className={classes.stack}
          >
            <Typography variant="subtitle1" color="primary" component="span">
              {underSCoreCapitalizeWord(poll.type || '')}
            </Typography>
            <Box
              sx={{
                backgroundColor:
                  CALL_GROUP_POLL_BG_COLOR?.[
                    poll?.status?.toLowerCase() || 'default'
                  ],
                color:
                  CALL_GROUP_POLL_COLOR?.[
                    poll.status?.toLowerCase() || 'default'
                  ],
              }}
              className={classes.status}
            >
              <Typography variant="body1">
                {underSCoreCapitalizeWord(poll?.status || '---')}
              </Typography>
            </Box>
          </Stack>
          <Grid
            container
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item className={classes.title}>
              <Typography
                color="text.primary"
                variant="h5"
                fontSize={14}
                fontWeight={500}
                mt={1}
              >
                {poll.name}
              </Typography>
              <Typography variant="h5">{poll.stat}</Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ my: 2 }}>
            <Grid item sm={12}>
              <Divider />
            </Grid>
          </Grid>
          <Grid container className={classes.agents}>
            <Grid item>
              <Typography variant="subtitle1">Call Group Agent(s)</Typography>
              <AvatarGroup max={4}>
                {poll?.agents && poll?.agents?.length > 0 ? (
                  poll?.agents?.map((avatar) => (
                    <Avatar
                      key={avatar?.id}
                      alt="agent avatar"
                      src={PersonaInitial}
                    >
                      {nameInitial(`${avatar?.firstname} ${avatar?.lastname}`)}
                    </Avatar>
                  ))
                ) : (
                  <Typography fontSize={10}> No Agent available</Typography>
                )}
              </AvatarGroup>
            </Grid>
          </Grid>
          <Grid container sx={{ my: 2 }}>
            <Grid item sm={12}>
              <Divider />
            </Grid>
          </Grid>
          <TimeLine
            progress={timeline < 0 ? 0 : timeline}
            startDate={poll.start_date}
            endDate={poll.end_date}
          />
        </Box>
      </Card>
    </Box>
  );
}

export default CampaignCard;

CampaignCard.propTypes = {
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
    type: PropTypes.string,
    id: PropTypes.string,
    agents: PropTypes.array,
  }).isRequired,
};
