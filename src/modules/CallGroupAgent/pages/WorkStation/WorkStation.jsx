import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';

import { Card } from 'shared';

import WORKBENCH_DATA, {
  WORKBENCH_PROGRESS_STATUS_BG,
} from 'constant/workbenchData';

import useStyles from 'modules/CallGroupAgent/pages/WorkStation/styled.workstation';
import Score from 'modules/CallGroupAgent/pages/WorkStation/Score';

function Workstation() {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`workstation-poll`);
  };
  return (
    <Grid container spacing={5} className={classes.workbench}>
      {WORKBENCH_DATA.map((data) => (
        <Grid item md={4} key={data.id}>
          <Card>
            <Box onClick={handleNavigate} className={classes.wrapper}>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ paddingBottom: '.8em' }}
                className="container"
              >
                <Typography variant="subtitle1"> {data.title} </Typography>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: data.status === 'Complete' ? '#107C10' : '#592474',
                    background: WORKBENCH_PROGRESS_STATUS_BG[data.status],
                    borderRadius: '4px',
                    padding: '4px 7px',
                  }}
                >
                  {data.status}
                </Typography>
              </Stack>
              <Typography variant="subtitle1">{data.pollName}</Typography>
              <Typography variant="body2" style={{ paddingBottom: '2em' }}>
                {data.rating}
              </Typography>
              <Score counts={data.counts} />
              <Divider sx={{ m: '.8em' }} />

              <Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Typography variant="subtitle1">Timeline</Typography>
                  <Typography color="primary" variant="subtitle1">
                    {data.timeline}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={data.timeline}
                  sx={{
                    margin: '.3em 0px',
                    height: '2.5px',
                    '& .MuiLinearProgress-bar': {
                      background: data.timeline === 100 ? '#287D3C' : '#0050C8',
                    },
                  }}
                />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Typography variant="subtitle1">{data.start_date}</Typography>
                  <Typography variant="subtitle1">{data.end_date}</Typography>
                </Stack>
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Workstation;
