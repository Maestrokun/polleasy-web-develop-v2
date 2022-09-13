import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { ReactComponent as EmptyTable } from 'assets/svg/emptyTable.svg';

import PollCard from 'modules/Admin/components/CallGroup/PollCard';

import useStyles from 'modules/Admin/pages/CallGroup/Polls/styled.poll';
import { useFetchCallGroupPolls } from 'hooks/queries/useCallGroup';
import { Spinner, TableHeader } from 'shared';

const options = [
  {
    value: 'none',
    label: 'All',
  },
  {
    value: 'ONGOING',
    label: 'Ongoing',
  },
  {
    value: 'COMPLETED',
    label: 'Completed',
  },
];

function Polls() {
  const [dataSource, setDataSource] = React.useState([]);
  const classes = useStyles();
  const [tableParams, setTableParams] = React.useState({
    search: '',
    pagination: {
      pageSize: 30,
      pageNumber: 1,
      total: 0,
    },
    filterBy: 'none',
    non_draft: true,
  });
  const { id } = useParams();
  const params = {
    page: tableParams.pagination.pageNumber,
    page_size: tableParams.pagination.pageSize,
    search: tableParams.search,
    status: tableParams.filterBy === 'none' ? null : tableParams.filterBy,
    ordering: '-created_at',
  };
  const { gettinggPolls } = useFetchCallGroupPolls({
    id,
    params,
    setDataSource,
    setTableParams,
    filterStatus: true,
  });
  // console.log({ tableParams });

  if (gettinggPolls) {
    return (
      <Box
        sx={{
          padding: '0px',
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{ position: '', padding: '0px', top: 0 }}
        >
          {[0, 1].map((loader) => (
            <Grid
              item
              sm={6}
              key={loader}
              sx={{ padding: '0px', height: '400px' }}
            >
              {/* <Skeleton
                width={450}
                height={450}
                sx={{ position: 'absolute', top: '250px' }}
              /> */}
              <Spinner loading={gettinggPolls} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
  return (
    <Box className={classes.root}>
      <TableHeader
        options={options}
        setTableParams={setTableParams}
        tableParams={tableParams}
      />
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {dataSource && dataSource?.length > 0 ? (
          dataSource?.map((poll) => (
            <Grid item sm={6} key={poll?.id}>
              <PollCard poll={poll} key={poll?.id} />
            </Grid>
          ))
        ) : (
          <Box className={classes.emptyState}>
            <EmptyTable />
            <Typography variant="h2" sx={{ color: '#323130', py: 2 }}>
              No Polls
            </Typography>
            <Typography variant="body1" sx={{ width: '80%', margin: 'auto' }}>
              You currently do not have any polls set up
            </Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
}

export default Polls;
