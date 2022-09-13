import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { AdminPaths } from 'constant/paths';
import React, { useEffect } from 'react';
import Breadcrumbs from 'shared/BreadCrumb';
import { ReactComponent as CrownIcon } from 'assets/svg/Crown.svg';
import { ReactComponent as PersonChecked } from 'assets/svg/PersonChecked.svg';
import { pxToRem } from 'utils/formatFont';
import { numberWithCommas } from 'utils/numberformat';
import { DashboardLinearProgress } from 'shared/LinearProgress/LinearProgress';
import { useLayoutContext } from 'shared/Layout';
import {
  data,
  lineColors,
  Personnels,
  VotersAnalysisData,
  VotersPerformance,
} from 'modules/CampaignManager/mock/dashboardData';
import SentimentAnalysisChart from './SentimentAnalysisChart';
import VotersSummary from './VotersSummary';

export default function Dashboard() {
  const { setBgProps } = useLayoutContext();
  useEffect(() => {
    setBgProps((prev) => ({ ...prev, color: '#F5F7FA' }));
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs
            links={[
              { path: 'War Room', to: AdminPaths.ADMIN_CANVASSER },
              { path: 'Segun Oroyo Presidential Campaign', to: '/' },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper
            elevation={0}
            sx={{
              background: '#0050C8',
              boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: pxToRem(20),
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={7}>
                <Typography color="#fff" variant="h6">
                  Popularity Score
                </Typography>
                <Typography variant="body2" color="primary.shade">
                  Descriptive text comes here,how this score is being
                  calculatede
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Paper
                  elevation={0}
                  sx={{
                    background: '#fff',
                    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '100%',
                    paddingInline: pxToRem(20),
                  }}
                >
                  <Typography
                    component="h3"
                    variant="h3"
                    fontSize={46}
                    fontWeight={700}
                    color="#272833"
                    lineHeight="133%"
                  >
                    4.5
                  </Typography>
                  <Avatar variant="rounded">
                    <CrownIcon />
                  </Avatar>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              marginTop: 5,
              background: '#FFFFFF',
              boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              padding: pxToRem(32),
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h4" color="#6B6C7E">
                  Voter’s Analysis
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <VotersSummary
                      data={VotersAnalysisData}
                      colors={lineColors}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Grid container spacing={4}>
                          {Personnels.map((personnel) => (
                            <Grid item xs={12} md={6} lg={4}>
                              <Paper
                                elevation={0}
                                sx={{
                                  border: '1px solid #E5E5EA',
                                  borderRadius: '8px',
                                  textAlign: 'center',
                                  padding: pxToRem(24),
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                }}
                              >
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    marginBottom: pxToRem(20),
                                    background: '#F1F2F6 !important',
                                    height: 50,
                                    width: 50,
                                    borderRadius: '8px',
                                  }}
                                >
                                  <PersonChecked />
                                </Avatar>
                                <Box textAlign="center">
                                  <Typography
                                    variant="body2"
                                    color="#6b6c7e"
                                    fontSize={pxToRem(14)}
                                    fontWeight={400}
                                    lineHeight="150%"
                                    sx={{ padding: 0 }}
                                  >
                                    {personnel.name}
                                  </Typography>
                                  <Typography
                                    variant="h5"
                                    color="#6b6c7e"
                                    fontWeight={700}
                                    fontSize={pxToRem(16)}
                                    lineHeight="150%"
                                  >
                                    {numberWithCommas(personnel.value)}
                                  </Typography>
                                </Box>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Paper
                          elevation={0}
                          sx={{
                            border: '1px solid #E5E5EA',
                            borderRadius: '8px',
                            padding: pxToRem(20),
                          }}
                        >
                          <Grid container spacing={4}>
                            <Grid item xs={12}>
                              <Typography
                                variant="h4"
                                fontSize={pxToRem(14)}
                                fontWeight={400}
                                color="#6B6C7E"
                              >
                                Voters Performance by State
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              {VotersPerformance.map((state, idx) => (
                                <DashboardLinearProgress
                                  state={state}
                                  customColor={lineColors[idx]}
                                />
                              ))}
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <SentimentAnalysisChart data={data} />
        </Grid>
      </Grid>
    </Box>
  );
}
