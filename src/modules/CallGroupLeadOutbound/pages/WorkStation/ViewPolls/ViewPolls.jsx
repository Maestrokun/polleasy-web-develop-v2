import React from 'react';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Download } from '@mui/icons-material';

import TimeLine from 'modules/Admin/components/CallGroup/TimeLine';

import { Card, TabNav, Button } from 'shared';

import CallGroupAnalysis from 'assets/svg/CallGroupAnalysis.svg';
import arrowRight from 'assets/svg/arrowRight.svg';
import CallGroupbackgroundpattern from 'assets/svg/CallGroupbackgroundpattern.svg';

import { getPoll } from 'modules/Admin/services/campaigns';
import {
  getOutboundLead,
  getPollInfo,
} from 'modules/CallGroupLeadOutbound/services/index';

import Response from 'modules/CallGroupLeadOutbound/pages/WorkStation/ViewPolls/Response';
import PollAgent from 'modules/CallGroupLeadOutbound/pages/WorkStation/ViewPolls/PollAgent';

import useStyles from 'modules/CallGroupLeadOutbound/pages/WorkStation/ViewPolls/styled.viewpolls';
import OverallRates from './OverallRates';

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

function ViewPolls() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { pollId } = useParams();
  const { data, isLoading } = useQuery(['all-Leads'], getOutboundLead);
  const { data: pollData } = useQuery(['get-poll', { id: pollId }], getPoll);

  const { data: pollInfo } = useQuery(
    ['get-pollInfo', { id: pollId }],
    getPollInfo
  );

  if (data && isLoading) return <Typography>Loading...</Typography>;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBack = () => {
    navigate('/call-group-lead-outbound/workstation');
  };

  return (
    <Box className={classes.root} mt={1}>
      <Grid container>
        <Grid mt={2}>
          <Box sx={{ display: 'flex' }}>
            <Box
              onClick={handleBack}
              sx={{ display: 'flex', cursor: 'pointer' }}
            >
              <Box>
                <img
                  src={arrowRight}
                  alt="right arrow"
                  className={classes.arrowRight}
                />
              </Box>
              <Box>
                <Typography>Work Station</Typography>
              </Box>
            </Box>
            <Box>
              <Typography>/ {pollData?.name}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid p={3} xs={12} mt={2}>
          <Card
            style={{
              backgroundColor: '#F1F2F9',
              backgroundImage: `url(${CallGroupbackgroundpattern})`,
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography>
                  {pollData && pollData?.type.split('_').join(' ')}
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: '#5fd25533',
                  padding: '7px 1.7rem',
                  borderRadius: '7px',
                  border: '1px solid #287D3C',
                }}
              >
                <p style={{ fontSize: '9px' }}>
                  {pollData && pollData?.status}
                </p>
              </Box>
            </Box>
            <Typography>{pollData && pollData?.name}</Typography>
            <TimeLine
              progress={90}
              startDate={
                pollData &&
                format(new Date(pollData?.start_date), 'dd MMM, yyyy')
              }
              endDate={
                pollData && format(new Date(pollData?.end_date), 'dd MMM, yyyy')
              }
            />
          </Card>
        </Grid>
        <Grid p={2} xs={12} mt={2}>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <TabNav
                navs={['Response', 'Poll Agent']}
                value={value}
                handleChange={handleChange}
              />
            </Box>
            <Box>
              <Button>
                Export <Download />{' '}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid p={1} xs={12} mt={2}>
          <TabPanel value={value} index={0}>
            <Response />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PollAgent />
          </TabPanel>
        </Grid>
      </Grid>
      <Grid py={6} xs={4}>
        <Box
          sx={{
            display: 'flex',
            border: '1px solid #E5E5EA',
          }}
        >
          <Box mt={4} className={classes.pollImg}>
            <img src={CallGroupAnalysis} alt="poll analytics" />
          </Box>
          <Box>
            <Typography ml={3}>Poll Analytics</Typography>
          </Box>
        </Box>
        <Box sx={{ border: '1px solid #E5E5EA', paddingLeft: '35px', pb: 6 }}>
          <Typography>Overall Call to voters</Typography>

          <OverallRates
            values={[
              { header: 'Total Voters', subtitle: pollInfo?.all },

              {
                header: 'Reached Voters',
                subtitle: pollInfo?.reached_count,
              },

              {
                header: 'Unreached Voters',
                subtitle: pollInfo?.unreached_count,
              },
            ]}
          >
            <CircularProgressbar
              value={80}
              text="Voters"
              styles={{
                root: {
                  width: '100%',
                },
                path: {
                  stroke: '#5ACA75',
                  strokeLinecap: 'butt',
                  transition: 'stroke-dashoffset 0.5s ease 0s',
                  transform: 'rotate(0.95turn)',
                  transformOrigin: 'center center',
                },
                trail: {
                  stroke: '#458FFF',
                  strokeLinecap: 'butt',
                  transform: 'rotate(0.25turn)',
                  transformOrigin: 'center center',
                },
                text: {
                  fill: '#6B6C7E',
                  fontSize: '1rem',
                  fontWeight: 600,
                },
                background: {
                  fill: '',
                },
                width: '30% !important',
                height: '30% !important',
              }}
            />
          </OverallRates>

          <Typography>Overall completion rate</Typography>
          <OverallRates
            values={[
              { header: 'Total', subtitle: '30000' },
              { header: 'Completed', subtitle: '30000' },
              { header: 'Uncompleted', subtitle: '30000' },
            ]}
          >
            <CircularProgressbar
              value={80}
              text="Calls"
              styles={{
                root: {
                  width: '100%',
                },
                path: {
                  stroke: '#5ACA75',
                  strokeLinecap: 'butt',
                  transition: 'stroke-dashoffset 0.5s ease 0s',
                  transform: 'rotate(0.95turn)',
                  transformOrigin: 'center center',
                },
                trail: {
                  stroke: '#458FFF',
                  strokeLinecap: 'butt',
                  transform: 'rotate(0.25turn)',
                  transformOrigin: 'center center',
                },
                text: {
                  fill: '#6B6C7E',
                  fontSize: '1rem',
                  fontWeight: 600,
                },
                background: {
                  fill: '',
                },
                width: '30% !important',
                height: '30% !important',
              }}
            />
          </OverallRates>

          <Typography>Response rate</Typography>
          <Box>
            <Box>
              <CircularProgressbar
                value={80}
                text="80%"
                styles={{
                  root: {
                    width: '50%',
                  },
                  path: {
                    stroke: '#458FFF',
                    strokeLinecap: 'butt',
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    transform: 'rotate(0.95turn)',
                    transformOrigin: 'center center',
                  },
                  trail: {
                    strokeLinecap: 'butt',
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                  },
                  text: {
                    fill: '#6B6C7E',
                    fontSize: '1rem',
                    fontWeight: 600,
                  },
                  background: {
                    fill: '',
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default ViewPolls;

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
Typography.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.string,
};
