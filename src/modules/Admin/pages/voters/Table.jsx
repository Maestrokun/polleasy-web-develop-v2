import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { columnsVoter } from 'constant/voterData';

import { Table } from 'shared';

import avatarColor from 'utils/avatarColor';

import { getVoters } from 'modules/Admin/services/voters';

import useStyles from 'modules/Admin/pages/voters/styled.voters';

function Index() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: voterData, isLoading } = useQuery(
    ['Voters', { pageNumber: page + 1, pageSize: rowsPerPage }],
    getVoters
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewVoter = (row) => {
    navigate(`/admin/voter/${row.id}`);
  };

  function createData({
    id,
    firstName,
    lastName,
    phoneNumber,
    religion,
    location,
    stateCode,
    lgaCode,
    pollingUnitCode,
    regAreaCode,
  }) {
    return {
      id,
      name: `${firstName} ${lastName}`,
      data: (
        <Box display="flex" justifyContent="flex-start">
          <Avatar {...avatarColor(`${firstName} ${lastName}`)} />
          <Box ml="16px">
            <Typography
              fontWeight={400}
              fontSize={14}
              color="primary"
              textTransform="capitalize"
            >
              {`${firstName} ${lastName}` || '-'}
            </Typography>
          </Box>
        </Box>
      ),
      phone: phoneNumber,
      location,
      religion,
      stateCode,
      lgaCode,
      pollingUnitCode,
      regAreaCode,
    };
  }

  const list =
    voterData &&
    voterData?.data?.data?.map(
      ({
        id,
        firstName,
        lastName,
        phoneNumber,
        location,
        religion,
        stateCode,
        lgaCode,
        pollingUnitCode,
        regAreaCode,
      }) =>
        createData({
          id,
          firstName,
          lastName,
          phoneNumber,
          location,
          religion,
          stateCode,
          lgaCode,
          pollingUnitCode,
          regAreaCode,
        }) || []
    );

  if (isLoading) {
    return (
      <Box className={classes.emptyState}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Table
      emptyIconTitle="No Voter"
      emptyIconMessage="You currently do not have any Voter set up"
      results={list || []}
      columns={columnsVoter}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      page={page}
      rowsPerPage={rowsPerPage}
      handleRowClick={handleViewVoter}
      fixedColumn
    />
  );
}

export default Index;
