/* eslint-disable no-nested-ternary */
import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Card } from 'shared';

import { ReactComponent as CallGrayIcon } from 'assets/callCenterGrayIcon.svg';

import useStyles from 'modules/CallGroupAgent/pages/WorkStation/WorkStationPoll/Response/styled.response';
import Score from 'modules/CallGroupAgent/pages/WorkStation/WorkStationPoll/Response/Score';

function Response() {
  const classes = useStyles();
  return (
    <Card style={{ height: '60vh', padding: '0px' }}>
      <Box className={classes.top}>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Box className={classes.presidential}>
              <Typography variant="subtitle1" color="primary">
                Presidential{' '}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={2}>
            <Box className={classes.year}>
              <Typography variant="subtitle1" color="warning">
                2022{' '}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Stack sx={{ p: 3 }}>
          <Typography variant="h3">
            2022 Presidential Campaign for Asiwaju
          </Typography>
        </Stack>
      </Box>
      <Box>
        <>
          <Grid container sx={{ ml: 4 }}>
            <Grid md={12}>
              <Score />
            </Grid>
          </Grid>
          {[0, 1, 2].map((call) => (
            <Grid container key={call} spacing={4} sx={{ m: 2 }}>
              <Grid item md={2} sx={{ mr: 4 }}>
                <CallGrayIcon />
              </Grid>
              <Grid item md={10} sx={{ m: -4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box className={classes.total}>
                    <Typography variant="body1">200,000,000</Typography>
                    <Typography variant="subtitle1" sx={{ mt: -3 }}>
                      Total Calls
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ))}
        </>
      </Box>
    </Card>
  );
}

export default Response;
