/* eslint-disable camelcase */
import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { columns } from 'constant/ExecutiveData';
import Table from 'shared/NewTable';
import useDrawer from 'hooks/useDrawer';
import useStyles from 'modules/Admin/pages/Settings/PartyManagement/MyParty/Executives/styled.executives';
import PropTypes from 'prop-types';

function TableLayout({
  executiveData,
  isLoading,
  handleChangePage,
  handleChangeRowsPerPage,
  page,
  rowsPerPage,
}) {
  const classes = useStyles();
  const [drawer, setDrawer] = useDrawer();

  const handleOpenDrawer = useCallback(
    (row) => {
      setDrawer({ ...drawer, drawerName: 'executiveDetails', data: row });
    },
    [drawer]
  );

  const avatarColor = (name) => {
    return {
      sx: {
        bgcolor: `#0050C8 !important`,
        height: 32,
        width: 32,
        textTransform: 'uppercase',
        fontSize: 14,
        marginTop: 2,
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  };

  function createData({
    id,
    firstname,
    lastname,
    middle_name,
    phone,
    position,
    level,
    jurisdiction,
    zone,
    state,
    senatorial_district,
    lga,
    ward,
  }) {
    return {
      id,
      name: `${firstname} ${middle_name ?? ''} ${lastname}`,
      firstname,
      lastname,
      middle_name,
      data: (
        <Box
          display="flex"
          justifyContent="flex-start"
          width="250px"
          position="sticky"
        >
          <Avatar {...avatarColor(`${firstname} ${lastname}`)} />
          <Box ml="16px">
            <Typography
              fontWeight={400}
              fontSize={14}
              color="primary"
              textTransform="capitalize"
            >
              {`${firstname} ${middle_name ?? ''} ${lastname}` || '-'}
            </Typography>
          </Box>
        </Box>
      ),
      phone,
      position,
      level,
      jurisdiction: jurisdiction || '-',
      zone: zone?.name || '-',
      state: state?.name || '-',
      senatorial_district: senatorial_district?.name || '',
      lga: lga?.name || '',
      ward: ward?.name || '',
    };
  }

  const list =
    executiveData &&
    executiveData?.results?.map(
      ({
        id,
        firstname,
        lastname,
        middele_name,
        phone,
        position,
        level,
        jurisdiction,
        zone,
        state,
        senatorial_district,
        lga,
        ward,
      }) =>
        createData({
          id,
          firstname,
          lastname,
          middele_name,
          phone,
          position,
          level,
          jurisdiction,
          zone,
          state,
          senatorial_district,
          lga,
          ward,
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
      emptyIconTitle="No Executive"
      emptyIconMessage="You currently do not have any Executive yet"
      results={list || []}
      columns={columns}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      page={page}
      rowsPerPage={rowsPerPage}
      handleRowClick={(row) => handleOpenDrawer(row)}
      totalResults={executiveData && executiveData?.total}
      fixedColumn
    />
  );
}
TableLayout.propTypes = {
  executiveData: PropTypes.node,
  isLoading: PropTypes.bool,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

TableLayout.defaultProps = {
  isLoading: false,
  handleChangePage: {},
  handleChangeRowsPerPage: {},
  page: 1,
  rowsPerPage: 1,
  executiveData: [],
};
export default TableLayout;
