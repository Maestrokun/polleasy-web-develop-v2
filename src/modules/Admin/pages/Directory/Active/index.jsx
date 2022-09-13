import React, { useState, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import { Menu, Table } from 'shared';

import results, { columns } from 'constant/directoryData';

import useDrawer from 'hooks/useDrawer';
import useModal from 'hooks/useModal';

import avatarColor from 'utils/avatarColor';

function Active() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalState, setModalState] = useModal();
  const [status, setStatus] = useDrawer();
  const [edit, setEdit] = useDrawer();

  const handleOpenDrawer = useCallback(
    (row) => {
      setStatus({ ...status, drawerName: 'agentDetail', data: row });
      setModalState({ ...modalState, data: row });
    },
    [status]
  );

  const handleOpenMore = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseMoreMenu = () => {
    setAnchorEl(null);
  };

  const handleArchive = useCallback(() => {
    setModalState({
      ...modalState,
      modalName: 'archiveModal',
    });
    setAnchorEl(null);
  }, [modalState]);

  const handleUnarchive = useCallback(() => {
    setModalState({
      ...modalState,
      modalName: 'unarchiveModal',
    });
    setAnchorEl(null);
  }, [modalState]);

  const handleEdit = useCallback(() => {
    setEdit({ ...edit, drawerName: 'editDirectory' });
    setAnchorEl(null);
  }, [edit]);

  function createData({ id, name, phone, designation, state, LGA }) {
    return {
      id,
      name: (
        <Box display="flex" justifyContent="flex-start">
          <Avatar {...avatarColor(name)} />
          <Box ml="16px">
            <Typography
              fontWeight={400}
              fontSize={14}
              color="primary"
              textTransform="capitalize"
            >
              {name || '-'}
            </Typography>
          </Box>
        </Box>
      ),
      phone,
      designation,
      state,
      LGA,
    };
  }

  const list = results?.map(
    ({ id, name, phone, designation, state, LGA }) =>
      createData({ id, name, phone, designation, state, LGA }) || []
  );
  return (
    <>
      <Table
        emptyIconTitle="No Personnel"
        emptyIconMessage="You currently do not have any Personnel yet"
        results={list || []}
        columns={columns}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        handleRowClick={(row) => handleOpenDrawer(row)}
        handleMenu={handleOpenMore}
        moreMenu
      />
      <Menu
        handlePopeverClose={handleCloseMoreMenu}
        anchorEl={anchorEl}
        menuItems={[
          {
            className: 'other',
            name: 'Edit',
            action: handleEdit,
          },
          {
            className: 'other',
            name: 'Archive',
            action: handleArchive,
          },
          {
            className: 'other',
            name: 'Unarchive',
            action: handleUnarchive,
          },
        ]}
      />
    </>
  );
}

export default Active;
