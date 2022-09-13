/* eslint-disable react/prop-types */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import React, { useState, useCallback } from 'react';
// import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { columns } from 'constant/electorateData';
import { Table, Menu } from 'shared';
import useModal from 'hooks/useModal';
import useDrawer from 'hooks/useDrawer';
import avatarColor from 'utils/avatarColor';
import { AdminPaths } from 'constant/paths';
import { useNavigate } from 'react-router';

function Index({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  Data,
  isFetching,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isRowStatus, setIsRowStatus] = useState('');
  const [modalState, setModalState] = useModal();
  const [rawerState, setDrawerState] = useDrawer();
  const navigate = useNavigate();

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowPage = (row) => {
    navigate(`${AdminPaths.ADMIN_PARTY}/${row?.id}`);
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

  function createData({
    voters_id,
    lastname,
    firstname,
    phone,
    middlename,
    gender,
    state,
    lga,
    ward,
    polling_unit,
  }) {
    return {
      voters_id,
      name: `${firstname} ${lastname}`,
      firstname,
      lastname,
      middlename,
      gender,
      phone,
      state,
      lga,
      ward,
      polling_unit,

      data: (
        <Box display="flex" justifyContent="flex-start">
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
              fontWeight={400}
              fontSize={12}
              variant="subtitle1"
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

  const listArray = Data?.data?.results || [];
  const list = listArray?.map(
    ({
      id,
      voters_id,
      firstname,
      lastname,
      middlename,
      gender,
      phone,
      state,
      lga,
      ward,
      polling_unit,
    }) =>
      createData({
        id,
        voters_id,
        firstname,
        lastname,
        middlename,
        gender,
        phone,
        state,
        lga,
        ward,
        polling_unit: polling_unit?.name,
      }) || []
  );

  return (
    <Box my={7}>
      <Table
        emptyIconTitle="Empty Database"
        emptyIconMessage="There are currently no information to display"
        results={list || []}
        columns={columns}
        handlePageChange={handlePageChange}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        handleMenu={handleOpenMore}
        handleRowClick={handleRowPage}
        loading={isFetching}
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
              isRowStatus === 'Deactivated' ? handleActivate : handleDeactivate,
          },
        ]}
      />
    </Box>
  );
}

export default Index;
