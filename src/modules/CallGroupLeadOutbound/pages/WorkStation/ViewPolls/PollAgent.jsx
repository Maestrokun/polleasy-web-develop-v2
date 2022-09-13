import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// import Chip from '@mui/material/Chip';
// import Skeleton from '@mui/material/Skeleton';

import { results, agentColumns } from 'constant/pollData';

import { Table } from 'shared';
import avatarColor from 'utils/avatarColor';

function Index() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function createData({ id, name, role, phone, email, status }) {
    // const statusColors = {
    //   ACTIVE: {
    //     backgroundColor: '#D4F7DC',
    //     color: '#15692A',
    //   },
    //   PENDING: {
    //     backgroundColor: '#FFF8CC',
    //     color: '#806B00',
    //   },
    //   DEACTIVATED: {
    //     backgroundColor: '#E5E5EA',
    //     color: '#1E0A3C',
    //   },
    // };

    return {
      id,
      name,
      data: (
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
      //   status: (
      //     <Chip
      //       label={
      //         // eslint-disable-next-line no-unsafe-optional-chaining
      //         status?.charAt?.(0)?.toUpperCase() + status.slice(1).toLowerCase()
      //       }
      //       size="small"
      //       sx={{ ...statusColors[status], borderRadius: '4px' }}
      //     />
      //   ),
      role,
      roles: role[0],
      phone: phone ?? 'N/A',
      email,
      status,
    };
  }

  const list = results?.map(
    ({ id, name, role, phone, email, status }) =>
      createData({
        id,
        name,
        role,
        phone,
        email,
        status,
      }) || []
  );

  //   if (isLoading) {
  //     return (
  //       <Box sx={{ paddingTop: '8em' }}>
  //         <Skeleton sx={{ height: '150vh !important' }} />
  //       </Box>
  //     );
  //   }

  return (
    <Box style={{ width: '95%!important' }}>
      <Table
        emptyIconTitle="No Personnel"
        emptyIconMessage="You currently do not have any Personnel yet"
        results={list || []}
        columns={agentColumns}
        handleChangePage={handlePageChange}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}

        // handleMenu={handleOpenMore}
        // handleRowClick={handleRowPage}
        // totalResults={userData && userData?.data?.total}
        // moreMenu
        // loading={isLoading}
      />
    </Box>
  );
}

export default Index;
