/* eslint-disable */
import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';

import useStyles from 'modules/Admin/pages/Campaign/CampaignDetails/styled.electionDetails';

import RemoveCircle from 'assets/svg/RemoveCircle.svg';
import AddCircle from 'assets/svg/AddCircle.svg';
import DashboardPolls from 'assets/svg/DashboardPolls.svg';
import WarRoomPolls from 'assets/svg/WarRoomPolls.svg';
import PollMenuImg from 'assets/svg/PollMenuImg.svg';
import PollIcon from 'assets/svg/PollIcon.svg';
import DashboardIcon from 'assets/svg/DashboardIcon.svg';
import WarRoomIcon from 'assets/svg/WarRoomIcon.svg';
import DashboardLine from 'assets/svg/DashboardLine.svg';
import WarRoomLine from 'assets/svg/WarRoomLine.svg';
import PollsLine from 'assets/svg/PollsLine.svg';

import { Card } from 'shared';

import StatsCard from 'modules/Admin/pages/Campaign/CampaignDetails/CampaignStats/StatsCard';
import CandidateDetails from 'modules/Admin/pages/Campaign/CampaignDetails/CandidateDetails';
import CampaignDetailCard from 'modules/Admin/pages/Campaign/CampaignDetails/CampaignDetailCard';

import { getCampaignDetails } from 'modules/Admin/services/campaigns';

function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  const { data: campaignDetailData, isLoading } = useQuery(
    ['campaignDetailCard', id],
    getCampaignDetails
  );

  const handleViewCampaignDetails = () => {
    navigate(`/admin/campaign/view/${id}/polls`);
  };

  if (isLoading && !campaignDetailData) {
    return <Typography>Please wait...</Typography>;
  }

  return (
    <Box className={classes.root}>
      <Stack>
        <Breadcrumbs sx={{ p: 0, mb: 7 }}>
          <Link to="/admin/campaign">
            <Typography variant="body1" sx={{ p: 0 }}>
              Campaign
            </Typography>
          </Link>
          <Typography sx={{ p: 0 }} variant="body1" fontWeight="500 !important">
            {campaignDetailData?.name}
          </Typography>
        </Breadcrumbs>
      </Stack>
      <Grid container spacing={4}>
        <Grid item md={3}>
          <CandidateDetails data={campaignDetailData} />
        </Grid>
        <Grid item md={9}>
          <CampaignDetailCard data={campaignDetailData} />
          <Box>
            <StatsCard
              title="Dashboard"
              subtitle1="Sentiment"
              subtitle2="Popularity Rating"
              icon
              values={[
                { text: '45%', img: AddCircle },
                { text: '25%', img: RemoveCircle },
              ]}
              values2={[{ text: '75%' }]}
              backgroundImage={DashboardPolls}
              menuIcon={DashboardIcon}
              borderLine={DashboardLine}
            />
            <StatsCard
              title="War Room"
              subtitle1="Vote Percentage"
              subtitle2="Incidence"
              icon={false}
              values={[{ text: '45%' }]}
              values2={[{ text: '85%' }]}
              backgroundImage={WarRoomPolls}
              menuIcon={WarRoomIcon}
              borderLine={WarRoomLine}
            />
            <Box
              onClick={handleViewCampaignDetails}
              style={{ cursor: 'pointer' }}
            >
              <Grid container sx={{ mt: 5 }}>
                <Grid item xs={12}>
                  <Card
                    style={{
                      marginBottom: 20,
                      height: 'min-content',
                      paddingBottom: 0,
                      paddingRight: 0,
                      paddingLeft: '5px',
                      paddingTop: '5px',
                    }}
                  >
                    <Box display="flex" gap="10px">
                      <Box>
                        <img src={PollsLine} alt="" />
                      </Box>
                      <Grid container spacing={4}>
                        <Grid item xs={9}>
                          <Box className="box">
                            <img src={PollIcon} alt="" alignSelf="start" />
                            <Typography
                              variant="h4"
                              sx={{ mb: 4, pt: 4 }}
                              alignSelf="center"
                            >
                              Polls
                            </Typography>
                          </Box>
                          <Box display="flex" flexDirection="row">
                            <Grid container spacing={1} sx={{ pb: 2, pl: 2 }}>
                              <Grid container xs={1} sx={{ mr: 3 }}>
                                <Grid item alignSelf="center">
                                  <Typography>Ongoing</Typography>
                                  <Typography>
                                    {campaignDetailData?.polls_stats?.ongoing}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                              />
                              <Grid container xs={1} sx={{ mx: 3 }}>
                                <Grid item alignSelf="center">
                                  <Typography>Draft</Typography>
                                  <Typography>
                                    {campaignDetailData?.polls_stats?.draft}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                              />
                              <Grid container xs={1} sx={{ ml: 3, mr: 5 }}>
                                <Grid item alignSelf="center">
                                  <Typography>Completed</Typography>
                                  <Typography>
                                    {campaignDetailData?.polls_stats?.completed}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                              />
                              <Grid container xs={2} sx={{ mx: 3 }}>
                                <Grid item alignSelf="center">
                                  <Typography>Not Started</Typography>
                                  <Typography>
                                    {
                                      campaignDetailData?.polls_stats
                                        ?.not_started
                                    }
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          {' '}
                        </Grid>
                        <Grid
                          className="img"
                          item
                          xs={2}
                          sx={{
                            backgroundImage: `url(${PollMenuImg})`,
                          }}
                        />
                      </Grid>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CampaignDetails;
