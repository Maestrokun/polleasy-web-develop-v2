/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable camelcase */
import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

import { columns } from 'constant/agentData';

import { Table, Menu, SearchAndFilters } from 'shared';
import EmptyCallCenter from 'assets/emptyCallCenter.svg';

import useModal from 'hooks/useModal';
import useDrawer from 'hooks/useDrawer';
import useDebounce from 'hooks/useDebouncee';

import { fetchUsers } from 'modules/Admin/services/userManagement';
// import {useFetchUsers} from 'hooks/queries/useDatabaseFilters';

import avatarColor from 'utils/avatarColor';
import { extractValueFromFilter } from 'utils/helperFunc';

import useStyles from 'modules/Admin/components/Agent/Table/styled.table';

function Index() {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isRowStatus, setIsRowStatus] = useState('');
  const [modalState, setModalState] = useModal();
  const [state, setState] = useDrawer();
  const [filterValue, setFilterValue] = useState([]);
  const [search, setSearch] = useState('');
  const searchTerm = useDebounce(search, 1000);

  // const { filters } = useFetchUsers();
  const getRole = extractValueFromFilter(filterValue, 'Role');
  const getStatus = extractValueFromFilter(filterValue, 'Status');

  const {
    data: userData,
    isLoading,
    isFetching,
  } = useQuery(
    [
      'users',
      {
        page: page + 1,
        page_size: rowsPerPage,
        search: searchTerm,
        Role: getRole,
        Status: getStatus,
      },
    ],
    fetchUsers
    // { cacheTime: 0 }
  );

  const handleResend = useCallback(() => {
    if (isRowStatus === 'Pending') {
      setModalState({
        ...modalState,
        modalName: 'resendModal',
      });
    }
    setAnchorEl(null);
  }, [modalState]);

  const handleRemove = useCallback(() => {
    if (isRowStatus === 'Pending') {
      setModalState({
        ...modalState,
        modalName: 'removeModal',
      });
    }
    setAnchorEl(null);
  }, [modalState]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowPage = (row) => {
    setState({ ...row, drawerName: 'userDetail' });
  };

  const handleOpenMore = (event, data) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setIsRowStatus(data.status.props.label);
    setModalState({ ...modalState, id: data.id, actionValue: data });
    setState({ ...state, data });
  };

  const handleCloseMoreMenu = () => {
    setAnchorEl(null);
    setState({ ...state, data: null });
    setModalState({ ...modalState, id: null });
  };

  const handleActivate = useCallback(() => {
    setModalState({
      ...modalState,
      modalName: 'agentActivateModal',
    });

    setAnchorEl(null);
  }, [modalState]);

  const handleEdit = useCallback(() => {
    setState({ ...state, drawerName: 'editUser' });
    setAnchorEl(null);
  }, [state]);

  const handleDeactivate = React.useCallback(() => {
    setModalState({
      ...modalState,
      modalName: 'agentDeactivateModal',
    });
    setAnchorEl(null);
  }, [modalState]);

  function createData({
    id,
    firstname,
    lastname,
    middleName,
    role,
    phone,
    email,
    status,
    languages,
    temp_identifier,
  }) {
    const statusColors = {
      ACTIVE: {
        backgroundColor: '#D4F7DC',
        color: '#15692A',
      },
      PENDING: {
        backgroundColor: '#FFF8CC',
        color: '#806B00',
      },
      DEACTIVATED: {
        backgroundColor: '#E5E5EA',
        color: '#1E0A3C',
      },
    };

    let userRole;

    switch (role) {
      case 'ADMIN':
        userRole = 'Admin';
        break;
      case 'CALL_GROUP_LEAD':
        userRole = 'Call Group Lead';
        break;
      case 'CANDIDATE':
        userRole = 'Candidate';
        break;
      case 'OUTBOUND_AGENT':
        userRole = 'Outbound Agent';
        break;
      case 'INBOUND_AGENT':
        userRole = 'Inbound Agent';
        break;
      case 'CAMPAIGN_MANAGER':
        userRole = 'Campaign Manager';
        break;
      case 'PARTY_AGENT':
        userRole = 'Party Agent';
        break;
      default:
        [userRole] = role;
        break;
    }

    return {
      id,
      name: `${firstname} ${lastname}`,
      firstname,
      lastname,
      middleName,
      languages,
      temp_identifier,
      data: (
        <Box display="flex" justifyContent="flex-start">
          <Avatar {...avatarColor(`${firstname} ${lastname}`)} />
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
              User ID: {temp_identifier || '--'}
            </Typography>
          </Box>
        </Box>
      ),
      status: (
        <Chip
          label={
            status?.charAt?.(0)?.toUpperCase() + status.slice(1).toLowerCase()
          }
          size="small"
          sx={{ ...statusColors[status], borderRadius: '4px' }}
        />
      ),
      role: userRole,
      roles: role[0],
      phone: phone ?? 'N/A',
      email,
    };
  }

  const list =
    userData &&
    userData?.data?.results?.map(
      ({
        id,
        firstname,
        lastname,
        middleName,
        role,
        phone,
        email,
        status,
        languages,
        temp_identifier,
      }) =>
        createData({
          id,
          firstname,
          lastname,
          middleName,
          role,
          phone,
          email,
          status,
          languages,
          temp_identifier,
        }) || []
    );

  return (
    <Box sx={{ pt: '16em' }}>
      <Grid container mb={8}>
        <Grid item xs={8}>
          <SearchAndFilters
            getSearchValue={setSearch}
            setPage={setPage}
            showFilters
            getFilterValue={setFilterValue}
            filters={[
              {
                label: 'Role',
                options: [
                  {
                    id: 'Campaign Manager',
                    value: 'Campaign Manager',
                    key: 'CAMPAIGN_MANAGER',
                  },
                  {
                    id: 'Call Group Lead',
                    value: 'Call Group Lead',
                    key: 'CALL_GROUP_LEAD',
                  },
                  {
                    id: 'inbound Agent',
                    value: 'Inbound Agent',
                    key: 'INBOUND_AGENT',
                  },
                  {
                    id: 'Outbound Agent',
                    value: 'Outbound Agent',
                    key: 'OUTBOUND_AGENT',
                  },
                  {
                    id: 'Party Agent',
                    value: 'Party Agent',
                    key: 'PARTY_AGENT',
                  },
                  { id: 'Candidate', value: 'Candidate', key: 'CANDIDATE' },
                ],
              },
              {
                label: 'Status',
                options: [
                  { id: 'ACTIVE', value: 'Active' },
                  { id: 'PENDING', value: 'Pending' },
                  { id: 'DEACTIVATED', value: 'Deactivated' },
                ],
              },
            ]}
          />
        </Grid>
      </Grid>

      {isLoading && (
        <Skeleton sx={{ height: '120vh !important', marginTop: '12em' }} />
      )}
      {userData && userData.data.result === 0 ? (
        <Box className={classes.campaign_empty}>
          <img src={EmptyCallCenter} alt="An empty box" />
          <Typography variant="h2" sx={{ color: '#323130', py: 2 }}>
            No Personnel
          </Typography>
          <Typography variant="body1" sx={{ width: '30%', margin: 'auto' }}>
            You currently do not have any Personnel yet
          </Typography>
        </Box>
      ) : (
        <Table
          // emptyIconTitle="No Personnel"
          // emptyIconMessage="You currently do not have any Personnel yet"
          results={list || []}
          columns={columns}
          handleChangePage={handlePageChange}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          handleMenu={handleOpenMore}
          handleRowClick={handleRowPage}
          totalResults={userData && userData?.data?.total}
          moreMenu
          loading={isFetching}
        />
      )}

      <Menu
        handlePopeverClose={handleCloseMoreMenu}
        anchorEl={anchorEl}
        menuItems={[
          { className: 'other', name: 'Edit', action: handleEdit },
          isRowStatus === 'Pending' && {
            className: 'other',
            name: 'Resend',
            action: handleResend,
          },
          isRowStatus === 'Deactivated' && {
            className: 'other',
            name: 'Activate',
            action: handleActivate,
          },
          isRowStatus === 'Active' && {
            className: 'other',
            name: 'Deactivate',
            action: handleDeactivate,
          },
          isRowStatus === 'Pending' && {
            className: 'delete',
            name: 'Remove',
            action: handleRemove,
          },
        ]}
      />
    </Box>
  );
}

export default Index;
