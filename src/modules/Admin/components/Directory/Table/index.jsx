import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import { ReactComponent as EmptyTable } from 'assets/svg/emptyTable.svg';

import results, { columns } from 'constant/agentData';

import { Table, Menu } from 'shared';

import useModal from 'hooks/useModal';
import useDrawer from 'hooks/useDrawer';

import nameInitial from 'utils/nameInitial';

// eslint-disable-next-line import/prefer-default-export
export function Index() {
  const [currentPage, setCurrentPage] = useState(0);
  const [, setOrdering] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [totalItems] = useState(1);
  const [records, setRecords] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isRowStatus, setIsRowStatus] = useState('');
  const [modalState, setModalState] = useModal();
  const [state, setState] = useDrawer();

  const handleOpenDrawer = useCallback(
    (row) => {
      setState({ ...state, drawerName: 'agentDetail', data: row });
      setModalState({ ...modalState, data: row });
    },
    [state]
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPage = (event) => {
    setPageSize(+event.target.value);
  };

  const handleOpenMore = (event, data) => {
    setAnchorEl(event.currentTarget);
    setIsRowStatus(data.status.props.label);
  };

  const handleCloseMoreMenu = () => {
    setAnchorEl(null);
  };

  const handleActivate = React.useCallback(() => {
    setModalState({
      ...modalState,
      modalName: 'agentActivateModal',
    });
    setAnchorEl(null);
  }, [modalState]);

  const handleEdit = () => {};

  const handleDeactivate = React.useCallback(() => {
    setModalState({
      ...modalState,
      modalName: 'agentDeactivateModal',
    });
    setAnchorEl(null);
  }, [modalState]);

  function createData({ id, name, role, phone, email, status }) {
    const statusColors = {
      ACTIVE: { backgroundColor: '#D4F7DC', color: '#15692A' },
      PENDING: { backgroundColor: '#FFF8CC', color: '#806B00' },
      DEACTIVATED: { backgroundColor: '#E5E5EA', color: '#1E0A3C' },
    };
    return {
      id,
      name,
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
            {nameInitial(name)}
          </Avatar>
          <Box ml="16px">
            <Typography
              fontWeight={400}
              fontSize={14}
              color="primary"
              textTransform="capitalize"
            >
              {name || '-'}
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={12}
              color="secondary"
              textTransform="capitalize"
            >
              User ID: {id || '--'}
            </Typography>
          </Box>
        </Box>
      ),
      status: (
        <Chip
          label={status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
          size="small"
          sx={statusColors[status]}
        />
      ),
      role,
      phone,
      email,
    };
  }

  const list = results?.map(
    ({ id, name, role, phone, email, status }) =>
      createData({ id, name, role, phone, email, status }) || []
  );

  return (
    <>
      <Table
        pagination={{
          pageSize,
          currentPage,
          total: totalItems,
          rowsPerPageOptions: [5, 10, 15],
        }}
        columns={columns}
        data={records}
        onSortClick={() => setOrdering('-firstname')}
        onRowItemClick={(row) => {
          handleOpenDrawer(row);
        }}
        loading={false}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPage}
        empty={{
          title: 'No Agent',
          description: 'You currently do not have any registered agent',
          onAddNewClick: () => {
            setRecords(list);
          },
          icon: EmptyTable,
        }}
        paginationPosition="bottom"
        handleMenu={handleOpenMore}
        moreMenu
      />
      <Menu
        handlePopeverClose={handleCloseMoreMenu}
        anchorEl={anchorEl}
        menuItems={[
          { className: 'other', name: 'Edit', action: handleEdit },
          isRowStatus === 'Pending' && {
            className: 'other',
            name: isRowStatus === 'Pending' ? 'Activate' : null,
            action: handleActivate,
          },
          {
            className: isRowStatus === 'Deactivated' ? 'other' : 'delete',
            name: isRowStatus === 'Deactivated' ? 'Activate' : 'Deactivate',
            action:
              isRowStatus === 'Deactivated' ? handleActivate : handleDeactivate,
          },
        ]}
      />
    </>
  );
}
