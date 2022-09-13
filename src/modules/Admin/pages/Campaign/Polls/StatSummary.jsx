/* eslint-disable */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

import { POLLS_SUMMARY } from 'constant/polls';

import { Card } from 'shared';

import { getPollStats } from 'modules/Admin/services/campaigns';

import useStyles from 'modules/Admin/pages/Campaign/Polls/styled.polls';

function StatSummary({ data }) {
  const classes = useStyles();

  return (
    <Grid container spacing={4} alignItems="center">
      {!data
        ? [0, 1, 2, 3].map((loader) => (
            <Grid md={3} item key={loader}>
              <Skeleton
                height={150}
                sx={{
                  marginTop: -10,
                }}
              />
            </Grid>
          ))
        : POLLS_SUMMARY.map((stat) => (
            <Grid item key={stat.id} md={3}>
              <Card
                style={{
                  background: '#FAF9FB',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Grid container>
                  <Grid item md={12}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Grid item md={8}>
                        <Typography
                          variant="body1"
                          p={0}
                          sx={{
                            textTransform: 'capitalize',
                            padding: '0px !important',
                          }}
                        >
                          {stat.status}
                        </Typography>
                        <Typography variant="h3" sx={{ mt: 0.5 }}>
                          {data.data.polls_stats[stat.label] ?? '0'}
                        </Typography>
                      </Grid>
                      <Grid item md={2} style={{ textAlign: 'end' }}>
                        <img src={stat.icon} alt="icon" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Box className={classes.pattern}>
                  <img src={stat.pattern} alt="icon" />
                </Box>
              </Card>
            </Grid>
          ))}
    </Grid>
  );
}

export default StatSummary;
