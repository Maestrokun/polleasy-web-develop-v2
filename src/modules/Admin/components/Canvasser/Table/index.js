/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable camelcase */
import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { Table, Menu } from 'shared';
import useModal from 'hooks/useModal';
import useDrawer from 'hooks/useDrawer';
import avatarColor from 'utils/avatarColor';
import { mockCanversser } from 'modules/Admin/pages/voters360/mock';
import { AdminPaths } from 'constant/paths';
import { useNavigate } from 'react-router';
import { TableRecordsContext } from 'shared/NewTable';
import { Button, Checkbox } from '@mui/material';
import { getCanvassers } from 'modules/Admin/pages/Canvassers/service/query';
import { capitalize, extractValueFromFilter } from 'utils/helperFunc';
import { canvasserStatusToggle } from 'modules/Admin/pages/Canvassers/service/mutations';
import useAlert from 'hooks/useAlert';
import handleApiError from 'utils/handleApiError';
import { columns } from '../utils';

function Index({ currentTab, filterValues, search, page, setPage }) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isRowStatus, setIsRowStatus] = useState('');
  const [modalState, setModalState] = useModal();
  const [rawerState, setDrawerState] = useDrawer();
  const { showNotification } = useAlert();
  const { records, changeRecords } = React.useContext(TableRecordsContext);
  const navigate = useNavigate();

  const registration_area = extractValueFromFilter(
    filterValues,
    'Registration Area'
  );
  const lga = extractValueFromFilter(filterValues, 'LGA');
  const genda = extractValueFromFilter(filterValues, 'Gender');
  const state = extractValueFromFilter(filterValues, 'STATE');

  const {
    data: canvasserData,
    isFetching: isLoading,
    refetch,
  } = useQuery(
    [
      'canvassers',
      {
        page: page + 1,
        page_size: rowsPerPage,
        registration_area,
        lga,
        gender: genda?.toUpperCase(),
        state,
        status: currentTab?.toUpperCase(),
        search: search || '',
      },
    ],
    getCanvassers,
    {
      onError: (error) => {
        showNotification(handleApiError(error), { type: 'error' });
      },
    }
  );

  const { mutate, isLoading: toggling } = useMutation(canvasserStatusToggle, {
    onSuccess: () => {
      refetch();
      showNotification('status updated', { type: 'success' });
    },
    onError: (err) => {
      showNotification(handleApiError(err), { type: 'error' });
    },
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowPage = (row) => {
    navigate(`${AdminPaths.ADMIN_CANVASSER}/${row?.id}`);
    // setDrawerState({ ...row, drawerName: 'userDetail' });
  };

  const handleOpenMore = (event, data) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setIsRowStatus(data.status.props.label);
    setModalState({ ...modalState, id: data.id });
    setDrawerState({ ...rawerState, data });
  };

  const handleCloseMoreMenu = () => {
    setAnchorEl(null);
    setDrawerState({ ...rawerState, data: null });
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
    setDrawerState({ ...rawerState, drawerName: 'editUser' });
    setAnchorEl(null);
  }, [rawerState]);

  const handleDeactivate = React.useCallback(() => {
    setModalState({
      ...modalState,
      modalName: 'agentDeactivateModal',
    });
    setAnchorEl(null);
  }, [modalState]);

  useEffect(() => {
    return () => changeRecords([]);
  }, []);

  function createData({
    id,
    voters_id,
    lastname,
    firstname,
    phone,
    middlename,
    gender,
    voting_state,
    voting_lga,
    voting_ward,
    canvasser_ref,
    status,
  }) {
    return {
      id,
      voters_id,
      name: `${firstname} ${lastname}`,
      firstname,
      lastname,
      middlename,
      gender: capitalize(gender),
      phone,
      voting_state: voting_state?.name,
      voting_lga: voting_lga?.name,
      voting_ward: voting_ward?.name,
      canvasser_ref,
      status: capitalize(status),
      data: (
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Avatar {...avatarColor(`${firstname} ${lastname}`)} />
          <Box ml="16px">
            <Typography
              fontWeight={400}
              fontSize={14}
              variant="subtitle1"
              color="#0A3E94"
              textTransform="capitalize"
            >
              {`${firstname} ${lastname}` || '-'}
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={400}
              fontSize={12}
              color="textPrimary"
              textTransform="capitalize"
            >
              Voters ID: {voters_id || '--'}
            </Typography>
          </Box>
        </Box>
      ),
    };
  }

  const listArray = canvasserData?.data?.results || [];

  const list = listArray?.map(
    ({
      id,
      voters_id,
      firstname,
      lastname,
      middlename,
      gender,
      phone,
      voting_state,
      voting_lga,
      voting_ward,
      canvasser_ref,
      status,
    }) =>
      createData({
        id,
        voters_id,
        firstname,
        lastname,
        middlename,
        gender,
        phone,
        voting_state,
        voting_lga,
        voting_ward,
        canvasser_ref,
        status,
      }) || []
  );

  const btnBaseStyle = { height: '30px', mt: 1 };
  const renderSelection = () => {
    if (!records?.length) return null;
    return (
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="auto"
        bgcolor="#F0F5FF"
        borderRadius="12px"
        my={4}
        px={4}
      >
        <Box display="flex">
          <Checkbox checked readOnly />
          <Typography>You have selected {records?.length} voters</Typography>
        </Box>
        <Box display="flex">
          <Button
            sx={{
              ...btnBaseStyle,
              color: '#D83B01',
              background: 'rgba(250, 65, 0, 0.2)',
              '&:hover': {
                background: 'rgba(250, 65, 0, 0.2)',
              },
            }}
          >
            Reject
          </Button>
          <Button sx={{ ...btnBaseStyle }}>Approve</Button>
        </Box>
      </Box>
    );
  };

  const isUnverified = currentTab === 'unverified';
  return (
    <Box>
      {renderSelection()}
      <Box mt={records?.length ? 0 : 7}>
        <Table
          emptyIconTitle="Empty Database"
          emptyIconMessage="There are currently no information to display"
          results={list || []}
          columns={!isUnverified ? columns : columns?.slice(0, -1)}
          handlePageChange={handlePageChange}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          handleMenu={handleOpenMore}
          handleRowClick={handleRowPage}
          checkbox={isUnverified}
          loading={isLoading}
          totalResults={canvasserData?.data?.total}
          // moreMenu
        />
        <Menu
          handlePopeverClose={handleCloseMoreMenu}
          anchorEl={anchorEl}
          menuItems={[
            { className: 'other', name: 'Edit', action: handleEdit },
            isRowStatus === 'Pending' && {
              className: 'other',
              name: isRowStatus === 'Pending' ? 'Resend' : null,
              action: handleActivate,
            },
            {
              className: isRowStatus === 'Deactivated' ? 'other' : 'delete',
              name:
                // eslint-disable-next-line no-nested-ternary
                isRowStatus === 'Deactivated'
                  ? 'Activate'
                  : isRowStatus === 'Active'
                  ? 'Deactivate'
                  : 'Remove',
              action:
                isRowStatus === 'Deactivated'
                  ? handleActivate
                  : handleDeactivate,
            },
          ]}
        />
      </Box>
    </Box>
  );
}

export default Index;
