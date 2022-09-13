import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import { Spinner, Table, TableHeader } from 'shared';

import { pollAgentColumns } from 'constant/callCenterData';

import useDrawer from 'hooks/useDrawer';

import nameInitial from 'utils/nameInitial';

import useStyles from 'modules/Admin/pages/CallGroup/ViewPolls/Agents/styled.agents';
import { useFetchPollAgent } from 'hooks/queries/useCallGroup';
import { useParams } from 'react-router-dom';
import { underSCoreCapitalizeWord } from 'utils/stringTranform';

function Agents() {
  const classes = useStyles();
  const [dataSource, setDataSource] = React.useState([]);
  const [tableParams, setTableParams] = React.useState({
    search: '',
    pagination: {
      pageSize: 10,
      pageNumber: 1,
      total: 0,
    },
    filterBy: 'none',
    ordering: '-created_at',
  });

  const params = {
    search: tableParams.search,
  };
  const { pollId } = useParams();
  const [, setOrdering] = useState('');
  const [state, setState] = useDrawer();

  const { gettingPollAgent } = useFetchPollAgent({
    pollId,
    params,
    setDataSource,
    setTableParams,
  });
  const handlePageChange = (event, value) => {
    setTableParams((prevParams) => {
      return {
        ...prevParams,
        pagination: {
          ...prevParams.pagination,
          pageNumber: value,
        },
      };
    });
  };

  const handleRowsPerPage = (event) => {
    setTableParams((prevParams) => {
      return {
        ...prevParams,
        pagination: {
          ...prevParams.pagination,
          pageNumber: 1,
          pageSize: event.target.value,
        },
      };
    });
  };
  // const handleRowsPerPage = (event) => {
  //   setPageSize(+event.target.value);
  // };

  const createData = ({
    id,
    name,
    firstname,
    lastname,
    total_calls,
    duration,
    role,
    phone,
    email,
    status,
    is_active,
    user_ref,
    temp_identifier,
  }) => {
    return {
      id,
      data: (
        <Box
          display="flex"
          justifyContent="flex-start"
          className={classes.wrapper}
        >
          <Avatar>{nameInitial(name)}</Avatar>
          <Box ml="16px">
            <Typography
              fontWeight={400}
              fontSize={14}
              color="primary"
              textTransform="capitalize"
            >
              {`${firstname} ${lastname}` || '-'}
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={12}
              color="secondary"
              textTransform="capitalize"
            >
              User ID: {user_ref || temp_identifier || '--'}
            </Typography>
          </Box>
        </Box>
      ),
      status: (
        <Chip
          label={status || is_active ? 'Active' : 'Inactive'}
          size="small"
          sx={{
            backgroundColor: status || is_active ? '#D4F7DC' : '#FFD4D2',
            color: status || is_active ? '#15692A' : '#9F1F17',
            borderRadius: '4px',
          }}
        />
      ),
      role: underSCoreCapitalizeWord(role || '--'),
      phone,
      email,
      name,
      total_calls,
      duration: duration || '---',
      is_active,
    };
  };

  const list =
    dataSource && dataSource?.length
      ? dataSource?.map(
          ({
            id,
            name,
            firstname,
            lastname,
            total_calls,
            duration,
            role,
            phone,
            email,
            status,
            is_active,
            user_ref,
            temp_identifier,
          }) =>
            createData({
              id,
              name,
              firstname,
              lastname,
              total_calls,
              duration: duration?.call_duration__sum || '',
              role,
              phone,
              email,
              status,
              is_active,
              user_ref,
              temp_identifier,
            }) || []
        )
      : [];

  const handleOpenDrawer = useCallback(
    (row) => {
      setState({ ...state, drawerName: 'viewPollAgent', data: row });
    },
    [state]
  );

  return !gettingPollAgent ? (
    <>
      <TableHeader
        setTableParams={setTableParams}
        tableParams={tableParams}
        filterBool={false}
      />
      <Box className={classes.root}>
        <Table
          rowsPerPage={tableParams.pagination.pageSize}
          page={tableParams.pagination.pageNumber}
          columns={pollAgentColumns}
          results={list}
          onSortClick={() => setOrdering('-name')}
          handleRowClick={(row) => handleOpenDrawer(row)}
          loading={gettingPollAgent}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPage}
          handleChangePage={handlePageChange}
          handleChangeRowsPerPage={handleRowsPerPage}
          emptyIconMessage="You currently do not have any registered agent"
          emptyIconTitle="No Agent"
          paginationPosition="bottom"
          totalResults={list?.length}
        />
      </Box>
    </>
  ) : (
    <Box className={classes.root}>
      {/* <Skeleton /> */}
      <Spinner loading={gettingPollAgent} />
    </Box>
  );
}

export default Agents;
