import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
// import Skeleton from '@mui/material/Skeleton';

import { ReactComponent as EmptyTable } from 'assets/svg/emptyTable.svg';

import { Spinner, Table, TableHeader } from 'shared';

import { columns } from 'constant/callCenterData';

import useDrawer from 'hooks/useDrawer';

import nameInitial from 'utils/nameInitial';

import useStyles from 'modules/Admin/pages/CallGroup/Agents/styled.agents';
import { useFetchCallGroupAgent } from 'hooks/queries/useCallGroup';
import { underSCoreCapitalizeWord } from 'utils/stringTranform';

const options = [
  {
    value: 'none',
    label: 'All',
  },
  {
    value: 'ACTIVE',
    label: 'Active',
  },
  {
    value: 'DEACTIVATED',
    label: 'Deactivated',
  },
];

function Agents() {
  const classes = useStyles();
  const [tableParams, setTableParams] = React.useState({
    search: '',
    pagination: {
      pageSize: 10,
      pageNumber: 1,
      total: 0,
    },
    filterBy: 'none',
  });
  // const [pageNumber, setpageNumber] = useState(0);
  const { id: agentID } = useParams();
  const [, setOrdering] = useState('');
  // const [pageSize, setPageSize] = useState(10);
  const [records, setRecords] = useState([]);
  const [state, setState] = useDrawer();
  const params = {
    page: tableParams.pagination.pageNumber,
    page_size: tableParams.pagination.pageSize,
    search: tableParams.search,
    status: tableParams.filterBy === 'none' ? null : tableParams.filterBy,
  };

  const { callGroupAgents, gettingAgent, isSuccess } = useFetchCallGroupAgent({
    id: agentID,
    params,
  });
  const handlePageChange = (event, page) => {
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        pageNumber: page,
      },
    }));
    // setpageNumber(page);
  };

  const handleRowsPerPage = (event) => {
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        pageSize: event.target.value,
      },
    }));
    // setPageSize(+event.target.value);
  };

  const createData = ({
    userId,
    firstname,
    lastname,
    role,
    phone,
    email,
    // status,
    isActive,
    userRef,
    temp_identifier,
  }) => {
    return {
      userId,
      data: (
        <Box display="flex" justifyContent="flex-start">
          <Avatar
            sx={{
              bgcolor: '#4F6BED',
              height: 32,
              width: 32,
              textTransform: 'uppercase',
              fontSize: 14,
            }}
          >
            {nameInitial(`${firstname} ${lastname}`)}
          </Avatar>
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
              User ID: {userRef || temp_identifier || 'N/A'}
            </Typography>
          </Box>
        </Box>
      ),
      status: (
        <Chip
          label={isActive ? 'Active' : 'Deactivated'}
          size="small"
          sx={{
            backgroundColor: isActive ? '#D4F7DC' : '#FFD4D2',
            color: isActive ? '#15692A' : '#9F1F17',
            borderRadius: '4px',
          }}
        />
      ),
      role: underSCoreCapitalizeWord(role || ''),
      phone,
      email,
      firstname,
      lastname,
    };
  };

  const list =
    callGroupAgents && callGroupAgents.length
      ? callGroupAgents?.map(
          ({
            id: userId,
            firstname,
            lastname,
            role,
            phone,
            email,
            is_active: isActive,
            user_ref: userRef,
            temp_identifier,
          }) =>
            createData({
              userId,
              firstname,
              lastname,
              role,
              phone,
              email,
              isActive,
              userRef,
              temp_identifier,
            }) || []
        )
      : [];

  const handleOpenDrawer = useCallback(
    (row) => {
      setState({
        ...state,
        drawerName: 'viewAgent',
        data: { ...row },
      });
    },
    [state]
  );

  useEffect(() => {
    if (isSuccess && callGroupAgents) {
      setRecords(list);
    }
  }, [isSuccess, callGroupAgents]);

  if (gettingAgent) {
    return (
      <Box className={classes.loader}>
        {/* <Skeleton /> */}
        <Spinner loading={gettingAgent} />
      </Box>
    );
  }

  return (
    <>
      <TableHeader
        options={options}
        setTableParams={setTableParams}
        tableParams={tableParams}
      />
      <Table
        rowsPerPage={tableParams.pagination.pageSize}
        page={tableParams.pagination.pageNumber}
        columns={columns}
        results={records}
        onSortClick={() => setOrdering('-name')}
        onRowItemClick={(row) => handleOpenDrawer(row)}
        handleRowClick={(row) => handleOpenDrawer(row)}
        loading={gettingAgent}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPage}
        empty={{
          title: 'No Agent',
          description: 'You currently do not have any registered agent',
          icon: EmptyTable,
        }}
        emptyIconMessage="You currently do not have any registered agent"
        emptyIconTitle="No Agent"
        paginationPosition="bottom"
        // fixedColumn
      />
    </>
  );
}

export default Agents;
