/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';

import { TableHeader, TabNav } from 'shared';
import { ReactComponent as CallButtonIcon } from 'assets/callButton.svg';
import { useInfiniteQuery } from 'react-query';
import useStyles from 'modules/CallGroupAgent/pages/WorkStation/WorkStationPoll/Response/styled.response';
import { getAgentCallsById } from 'services/workstation';
import { formatDistance } from 'date-fns';
import { CircularProgress } from '@mui/material';
import useIntersectionObserver from './useIntersectionObserver';

// import { TabPanel } from '@mui/lab';

function TabPanel(props) {
  // const device = new Device(process.env.REACT_APP_TWILO_TOKEN);

  // // Make an outgoing call
  // async function makeOutgoingCall() {
  //   const call = await device.connect();
  //   return call;
  // }
  // console.log('call', makeOutgoingCall());
  // console.log('device', Device);
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 4, px: 0, marginBottom: '100px' }}>{children}</Box>
      )}
    </div>
  );
}

function Response({ handleClick }) {
  const { id: agentId } = useParams();
  const [error, setError] = useState('');
  const classes = useStyles();
  const [check, setCheck] = useState(null);
  const [value, setValue] = React.useState(0);
  const [votersData, setVotersData] = useState(null);
  const loadMoreRef = useRef();
  const [tableParams, setTableParams] = React.useState({
    search: '',
    queued: true,
    missed: false,
    reached: false,
    pagination: {
      pageNumber: 1,
      pageSize: 10,
      total: 1,
      totalPages: 1,
    },
  });

  const params = {
    pageNumber: tableParams.pagination.pageNumber,
    page_size: tableParams.pagination.pageSize,
    search: tableParams.search,
    queued: tableParams.queued,
    missed: tableParams.missed,
    reached: tableParams.reached,
    total_pages: tableParams.totalPages,
    pollsId: agentId,
  };

  // console.log('param', params);

  const {
    hasNextPage,
    // data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(['getAgentCalls', params], getAgentCallsById, {
    getNextPageParam: (lastPage, pages) => {
      const pagesNum = lastPage.total_pages;

      if (pagesNum > pages.length) {
        const newPage = pages.length + 1;
        return newPage;
      }

      return undefined;
    },

    onSuccess: (voters) => {
      const { pages } = voters;
      const votersList = pages.flatMap((x) => x.results);
      // console.log(votersList);
      setVotersData(votersList);
    },

    onError: () => {
      setError('No target found for this poll');
    },
  });

  // console.log('data', data);

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0: {
        setTableParams((prev) => ({
          ...prev,
          queued: true,
          missed: false,
          reached: false,
        }));
        break;
      }
      case 1: {
        setTableParams((prev) => ({
          ...prev,
          queued: false,
          missed: false,
          reached: true,
        }));

        break;
      }
      case 2: {
        setTableParams((prev) => ({
          ...prev,
          queued: false,
          missed: true,
          reached: false,
        }));

        break;
      }

      default:
        break;
    }
    setValue(newValue);
  };

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: () => fetchNextPage(),
    enabled: hasNextPage,
  });

  return (
    <Box sx={{ borderRight: '1px solid #E5E5EA', mt: '0' }}>
      <Divider orientation="vertical" />
      <Box className={classes.top}>
        <Stack sx={{ my: 3 }}>
          <Typography variant="h3">Respondant</Typography>
        </Stack>
        <Grid container sx={{ mb: 3 }}>
          <Grid item md={12}>
            <TabNav
              navs={['Queue', 'Reached', 'Missed']}
              value={value}
              handleChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item md={12}>
            <TableHeader
              filterBool={false}
              tableParams={tableParams}
              setTableParams={setTableParams}
            />
          </Grid>
        </Grid>
      </Box>
      {isLoading && (
        <Box
          sx={{
            width: '100%',
            height: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size="1.5rem" />
        </Box>
      )}
      {!error ? (
        <Box
          sx={{
            height: '55vh',
            padding: '0px',
            overflowY: 'scroll',

            scrollbarWidth: 'none',

            msOverflowStyle: 'none',

            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <TabPanel value={value} index={0}>
            <>
              {votersData?.map((res, index) => (
                <Grid
                  container
                  spacing={2}
                  sx={{
                    my: 1,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: check === index ? '#F0F5FF' : '#fff',
                      display: 'flex',
                      width: '100%',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      handleClick(res);
                      setCheck(index);
                    }}
                  >
                    <Grid item md={10}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%',
                          cursor: 'pointer',
                          // mr: 4,
                          width: '100%',
                        }}
                      >
                        <Avatar
                          variant="square"
                          sx={{
                            ml: 3,
                            background:
                              check === index
                                ? '#E3008C !important'
                                : '#0047BD !important',
                            borderRadius: '5px',
                          }}
                        >
                          {res?.voter?.lastname.slice(0, 1)}
                          {res.voter?.firstname.slice(0, 1)}
                        </Avatar>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            ml: 2,
                          }}
                        >
                          <Box sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                            {res?.voter?.lastname} {res?.voter?.firstname}{' '}
                            {res?.voter?.middlename}
                          </Box>
                          <Typography variant="subtitle1">
                            {res?.voter?.phone}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item md={2} sx={{ mt: 3 }}>
                      {value === 1 ? (
                        formatDistance(new Date(2022, 8, 3), new Date())
                      ) : (
                        <CallButtonIcon />
                      )}
                    </Grid>
                  </Box>
                </Grid>
              ))}{' '}
              {isFetchingNextPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress size="1rem" />
                </Box>
              )}
              <div ref={loadMoreRef} />
            </>
          </TabPanel>
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '30%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'red',
          }}
        >
          {error}
        </Box>
      )}
    </Box>
  );
}

export default Response;

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

Response.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
