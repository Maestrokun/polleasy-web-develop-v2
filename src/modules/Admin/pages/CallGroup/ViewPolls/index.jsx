import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { capitalize } from 'lodash';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { CircularProgressbar } from 'react-circular-progressbar';

import { ReactComponent as RateIcon } from 'assets/apathy.svg';

import TimeLine from 'modules/Admin/components/CallGroup/TimeLine';

// eslint-disable-next-line no-unused-vars
import { Card, TabNav } from 'shared';

import ViewPollAgentDrawer from 'modules/Admin/components/CallGroup/Drawer/ViewPollAgent';
import { ReactComponent as LeftArrow } from 'assets/svg/arrowRight.svg';

// import Response from 'modules/Admin/pages/CallGroup/ViewPolls/Response';
import Agent from 'modules/Admin/pages/CallGroup/ViewPolls/Agents';

import useStyles from 'modules/Admin/pages/CallGroup/ViewPolls/styled.viewPolls';
import {
  useFetchSIngleCallGroup,
  useFetchSinglePoll,
} from 'hooks/queries/useCallGroup';
import {
  CALL_GROUP_POLL_BG_COLOR,
  CALL_GROUP_POLL_COLOR,
} from 'constant/callCenterStatus';
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

function ViewPolls() {
  const classes = useStyles();
  // const [value, setValue] = useState(0);
  const { pollId, id: callGroupId } = useParams();
  const { singlePoll } = useFetchSinglePoll({ pollId });
  const { singleCallGroup } = useFetchSIngleCallGroup({ callGroupId });
  const timeline = getTimeline(
    new Date(singlePoll?.start_date),
    new Date(singlePoll?.end_date)
  );
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <Box className={classes.root} sx={{ position: 'fixed', width: '80%' }}>
      <Grid container>
        <Grid item>
          <Breadcrumbs sx={{ p: 0, mb: 5 }}>
            <Link
              to="/admin/call-group"
              style={{
                display: 'flex',
                justifySelf: 'center',
                alignItems: 'center',
              }}
            >
              <LeftArrow />
              <Typography sx={{ p: 0 }}>Call Groups</Typography>
            </Link>
            <Link to={`/admin/call-group/${singleCallGroup?.id}`}>
              <Typography sx={{ p: 0 }}>{singleCallGroup?.name}</Typography>
            </Link>
            <Typography sx={{ p: 0 }}>{singlePoll?.name}</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      {/* <Typography variant="h3"></Typography> */}
      <Grid container spacing={4} sx={{ mt: 0, mb: 4 }}>
        <Grid item md={10}>
          <Card style={{ height: '160px' }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              className={classes.topStack}
            >
              <Typography variant="subtitle1">
                {singlePoll?.campaign?.name || '---'}
              </Typography>
              <Typography
                variant="subtitle1"
                component="span"
                sx={{
                  backgroundColor:
                    CALL_GROUP_POLL_BG_COLOR?.[
                      singlePoll?.status?.toLowerCase() || 'default'
                    ],
                  color:
                    CALL_GROUP_POLL_COLOR?.[
                      singlePoll?.status?.toLowerCase() || 'default'
                    ],
                }}
              >
                {capitalize(singlePoll?.status || '--')}
              </Typography>
            </Stack>
            <Typography variant="h5">{singlePoll?.name || '---'}</Typography>
            <TimeLine
              progress={timeline < 0 ? 0 : timeline}
              startDate={singlePoll?.start_date}
              endDate={singlePoll?.end_date}
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
      {/* <TabNav
        navs={['Response', 'Agents']}
        value={value}
        handleChange={handleChange}
      />

      <>
        <TabPanel value={value} index={0}>
          <Response />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Agent />
        </TabPanel>
      </> */}
      <Agent />
      <ViewPollAgentDrawer />
    </Box>
  );
}

export default ViewPolls;

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
