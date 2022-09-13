import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { format } from 'date-fns';
import { getAgentCallsBreadCrumb } from 'services/workstation';
import { ReactComponent as SunIcon } from 'assets/SunIcon.svg';
import { underscoreRemove } from 'utils/stringTranform';
import { useQuery } from 'react-query';
import { CircularProgress } from '@mui/material';

import useStyles from 'modules/CallGroupAgent/pages/WorkStation/WorkStationPoll/styled.workStationPoll';
import Response from './Response';

function ViewPolls() {
  const { id } = useParams();

  const { data, isLoading } = useQuery(
    ['getAgentName', { id }],
    getAgentCallsBreadCrumb,
    {
      enable: !!id,
    }
  );

  useQuery(['get-agent-calls', { id }], getAgentCallsBreadCrumb, {
    enabled: !!id,
    onError: (err) => {
      // eslint-disable-next-line
      console.error(err);
    },
  });

  const classes = useStyles();
  return (
    <Box className={classes.root} sx={{ position: 'fixed', width: '80%' }}>
      <Grid container>
        <Grid item>
          <Breadcrumbs sx={{ p: 0 }}>
            <Link to="/outbound-call-agent/workstation">
              <Typography sx={{ p: 0 }}>Work Station</Typography>
            </Link>
            <Typography sx={{ p: 0, width: 'fit-content' }}>
              {' '}
              {data?.data?.data?.poll_name}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isLoading ? (
            <CircularProgress size="1.5rem" />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
              }}
            >
              <Box sx={{ mr: 3 }}>
                {data?.data?.data?.poll_type && (
                  <Box
                    sx={{
                      border: '1px solid #0050C8',
                      p: '3px',
                      background: '#F0F5FF',
                      borderRadius: '4px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="subtitle1" color="primary">
                      {underscoreRemove(data?.data?.data?.poll_type)}
                    </Typography>
                  </Box>
                )}
              </Box>
              {data?.data?.data?.campaign_type && (
                <Box
                  sx={{
                    p: '3px',
                    background: '#F0F5FF',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    backgroundColor: ' #F0DAFB',
                    fontSize: '12px',
                    width: 'fit-content',
                    mr: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {data?.data?.data?.campaign_type}
                </Box>
              )}

              {data?.data?.data?.poll_year && (
                <Box
                  sx={{
                    width: 'fit-content',
                    p: '3px',
                    background: '#F0F5FF',
                    borderRadius: '4px',
                    color: '#806B00',
                    backgroundColor: '   #FFF8CC',
                    fontSize: '12px',
                    mr: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {data?.data?.data?.poll_year}
                </Box>
              )}
            </Box>
          )}

          <Box
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                mr: 2,
              }}
            >
              <SunIcon />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                {' '}
                <Typography variant="body2">
                  {format(new Date(), 'eeee, MMMM dd ')}
                </Typography>
              </Box>
              <Typography variant="body2">
                {format(new Date(), 'hh:mm a')}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          {' '}
          <Box sx={{ fontWeight: 600, fontSize: '23px' }}>
            {data?.data?.data?.poll_name}
          </Box>
          <Box
            sx={{
              display: 'flex',
              mt: '-4px',
            }}
          >
            <Typography
              sx={{
                color: '#6B6C7E',
                mr: 1,
              }}
            >
              Total Calls:
            </Typography>
            <Typography sx={{ color: '#6B6C7E', fontWeight: 600 }}>
              {data?.data?.data?.stat?.no_of_calls}
            </Typography>

            <Typography
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                marginLeft: '3px',
                marginRight: '3px',
                fontWeight: 600,
                mx: 2,
              }}
            >
              .
            </Typography>

            <Typography sx={{ color: '#6B6C7E', mr: 1 }}>
              Reached Calls:{' '}
            </Typography>
            <Typography sx={{ color: '#6B6C7E', fontWeight: 600 }}>
              {data?.data?.data?.stat?.reached_calls}
            </Typography>

            <Typography
              sx={{
                marginLeft: '3px',
                marginRight: '3px',
                fontWeight: 600,
                mx: 2,
              }}
            >
              .
            </Typography>
            <Typography sx={{ color: '#6B6C7E', mr: 1 }}>Queued:</Typography>
            <Typography sx={{ color: '#6B6C7E', fontWeight: 600 }}>
              {data?.data?.data?.stat?.queued_calls}
            </Typography>
            <Typography
              sx={{
                marginLeft: '3px',
                marginRight: '3px',
                fontWeight: 600,
                mx: 2,
              }}
            >
              .
            </Typography>
            <Typography sx={{ color: '#6B6C7E', mr: 1 }}>Missed: </Typography>
            <Typography sx={{ color: '#6B6C7E', fontWeight: 600 }}>
              {data?.data?.data?.stat?.missed_calls}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Response />
    </Box>
  );
}

export default ViewPolls;
