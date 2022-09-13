import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { getAgentWorkstation } from 'services/workstation';
import { useQuery } from 'react-query';
import { capitalize } from 'lodash';
import TimeLine from 'modules/Admin/components/CallGroup/TimeLine';
import { getTimeline } from 'utils/transformDate';

import { Card } from 'shared';

import { WORKBENCH_PROGRESS_STATUS_BG } from 'constant/workbenchData';

import useStyles from 'modules/CallGroupAgent/pages/WorkStation/styled.workstation';
import Score from './Score';

function Workstation() {
  const classes = useStyles();
  const navigate = useNavigate();

  const { data: dataPoll } = useQuery(['getAgentPolls'], getAgentWorkstation, {
    enabled: true,
  });

  const handleNavigate = (cardId) => {
    navigate(`/outbound-call-agent/workstation/view-poll/${cardId}`);
  };

  return (
    <Grid container spacing={5} className={classes.workbench}>
      {dataPoll?.data?.data?.map((data) => (
        <Grid item md={4} key={data.id}>
          <Card>
            <Box
              onClick={() => handleNavigate(data?.id)}
              className={classes.wrapper}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ paddingBottom: '.8em' }}
                className="container"
              >
                <Typography variant="subtitle1">
                  {capitalize(data.type?.toLowerCase() || '--')}
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: data.status === 'Complete' ? '#107C10' : '#592474',
                    background:
                      WORKBENCH_PROGRESS_STATUS_BG[capitalize(data.status)],
                    borderRadius: '4px',
                    padding: '4px 7px',
                  }}
                >
                  {capitalize(data?.status?.toLowerCase())}
                </Typography>
              </Stack>
              <Typography variant="subtitle1">
                {data?.campaign?.description}
              </Typography>
              <Typography variant="body2" style={{ paddingBottom: '2em' }}>
                {data.rating}
              </Typography>
              <Score
                // counts={count(data.start_date, data.end_date)}
                counts={
                  getTimeline(data.start_date, data.end_date) < 0
                    ? 0
                    : getTimeline(data.start_date, data.end_date)
                }
              />
              <Divider sx={{ marginBottom: '.8em' }} />

              <Box>
                <TimeLine
                  progress={
                    getTimeline(data.start_date, data.end_date) < 0
                      ? 0
                      : getTimeline(data.start_date, data.end_date)
                  }
                  startDate={data.start_date}
                  endDate={data.end_date}
                />
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Workstation;
