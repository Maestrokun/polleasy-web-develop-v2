import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import {
  SingleUserDrawer,
  MultipleUserDrawer,
  EditSingleUserDrawer,
} from 'modules/Admin/components/Settings/Drawer/AddExecutive/index';
import ExecutiveDetails from 'modules/Admin/components/Settings/Drawer/ExecutiveDetails/ExecutiveDetails';
import SuccessModal from 'modules/Admin/components/Settings/Modal/SuccessModal/index';
import Table from 'modules/Admin/components/Settings/Table';
import Filter from 'modules/Admin/components/Settings/Filter/Filter';
import { SearchAndFilters, Button, Menu } from 'shared';
import useDrawer from 'hooks/useDrawer';
import { filters } from 'constant/ExecutiveData';
import useStyles from 'modules/Admin/pages/Settings/PartyManagement/MyParty/Executives/styled.executives';
import {
  getPartyData,
  getExecutives,
} from 'modules/Admin/pages/Settings/services';
import useDebounce from 'hooks/useDebouncee';

function AddExecutives() {
  const classes = useStyles();
  const [drawer, setDrawer] = useDrawer();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const partyId = location?.state?.partyId || null;
  const [search, setSearch] = useState('');
  const [filterValue, setFilterValue] = useState([]);
  const searchTerm = useDebounce(search, 100);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [zoneId, setZoneId] = React.useState('');
  const [stateId, setStateId] = React.useState('');
  const [districtId, setDistrictId] = React.useState('');
  const [lgaId, setLgaId] = React.useState('');
  const [wardId, setWardId] = React.useState('');
  const [apply, setApply] = React.useState(false);

  if (!partyId) {
    navigate(`/admin/settings/party-management`);
  }

  const { data: partyData, isLoading } = useQuery(
    ['fetchPartyData', { partyId }],
    getPartyData
  );

  const {
    data: executiveData,
    isLoading: executiveDataLoading,
    refetch: executiveRefetch,
  } = useQuery(
    [
      'Executives',
      {
        page_number: page === 0 ? 1 : page,
        page_size: rowsPerPage,
        search: searchTerm,
        ward: wardId,
        zone: apply ? zoneId : '',
        state: apply ? stateId : '',
        senatorial_district: apply ? districtId : '',
        lga: apply ? lgaId : '',
        jurisdiction: filterValue,
      },
    ],
    getExecutives
  );

  const handleAddNew = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSingle = useCallback(() => {
    setDrawer({ ...drawer, drawerName: 'addSingleExecutive' });
    setAnchorEl(null);
  }, [drawer]);

  const handleBulk = useCallback(() => {
    setDrawer({ ...drawer, drawerName: 'addMultipleExecutives' });
    setAnchorEl(null);
  }, [drawer]);

  const handleEdit = () => {
    navigate(`/admin/settings/party-management/edit-party/${partyId}/`, {
      state: { party: partyData },
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const editMemberDetail = (id) => {
    const memberData = executiveData?.results?.filter((e) => e.id === id);
    setDrawer({ ...drawer, drawerName: '' });
    setAnchorEl(null);
    setDrawer({
      ...drawer,
      drawerName: 'editSingleExecutive',
      member: memberData[0],
    });
  };

  const applySideFilter = () => {
    if (zoneId || stateId || lgaId || districtId || wardId) setApply(true);
    executiveRefetch();
  };

  const resetSideFilter = () => {
    setApply(false);
    executiveRefetch();
    setZoneId('');
    setDistrictId('');
    setStateId('');
    setLgaId('');
    setWardId('');
  };

  return (
    <Box className={classes.wrapper}>
      <Grid container spacing={0} justifyContent="space-between">
        <Grid item md={7.3}>
          <Breadcrumbs sx={{ p: 0, mb: 0, mt: 0 }} style={{ color: '#6B6C7E' }}>
            <Link to="/admin/settings">
              <Typography
                sx={{ p: 0 }}
                variant="body1"
                style={{ color: '#6B6C7E' }}
              >
                Settings
              </Typography>
            </Link>
            <Link to="/admin/settings/party-management">
              <Typography
                sx={{ p: 0 }}
                variant="body1"
                style={{ color: '#6B6C7E' }}
              >
                Party Management
              </Typography>
            </Link>
            <Typography
              sx={{ p: 0 }}
              variant="body2"
              style={{ color: '#393A4A' }}
            >
              All Progressive Congress
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {isLoading ? (
        <Grid item md={12}>
          <Skeleton
            variant="rectangle"
            animation="wave"
            height={103}
            sx={{ borderRadius: '4px' }}
          />
        </Grid>
      ) : (
        <Box className={classes.createdParty}>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="space-between"
            spacing={0}
          >
            <Grid item>
              <Grid container>
                <Grid item sx={{ mr: 3 }}>
                  {!isLoading && (
                    <img
                      src={partyData?.flag}
                      alt="party flag"
                      style={{
                        width: '100px',
                        height: '58px',
                        radius: '4px',
                      }}
                    />
                  )}
                </Grid>

                <Grid item>
                  <Typography variant="h2">{partyData?.name}</Typography>
                  <Stack direction="row">
                    <Typography variant="body1">
                      Party Alias:
                      <Typography
                        component="span"
                        sx={{ mr: 1, textTransform: 'capitalize' }}
                      >
                        {partyData?.alias}
                      </Typography>
                    </Typography>
                    <Typography>
                      • Date Created:
                      <Typography component="span">
                        {' '}
                        {format(
                          new Date(partyData?.created_at),
                          'do MMMM, yyyy'
                        )}
                      </Typography>
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            <Grid item className={classes.edit}>
              <Button onClick={handleEdit}>Edit Details</Button>
            </Grid>
          </Grid>
        </Box>
      )}
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={4}
        sx={{ mt: 4 }}
      >
        <Grid item xs={8}>
          <SearchAndFilters
            getSearchValue={setSearch}
            setPage={setPage}
            showFilters
            getFilterValue={setFilterValue}
            filters={filters}
          />
        </Grid>
        <Grid item justifyContent="flex-end" sx={{ ml: 62.7 }}>
          <Button onClick={handleAddNew}>Add New</Button>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '2em' }}>
        {isLoading && !partyData ? (
          <Grid item md={12}>
            <Skeleton variant="rectangle" height={500} />
          </Grid>
        ) : (
          <Grid container spacing={4}>
            <Grid item md={2.9}>
              <Filter
                zoneId={zoneId}
                stateId={stateId}
                lgaId={lgaId}
                applySideFilter={applySideFilter}
                resetSideFilter={resetSideFilter}
                setZoneId={setZoneId}
                setDistrictId={setDistrictId}
                setStateId={setStateId}
                setLgaId={setLgaId}
                setWardId={setWardId}
                districtId={districtId}
                wardId={wardId}
              />
            </Grid>
            <Grid item md={9}>
              <Box className={classes.table}>
                <Grid container>
                  <Grid item md={12}>
                    <Table
                      isLoading={executiveDataLoading}
                      executiveData={executiveData}
                      handleChangePage={handleChangePage}
                      handleChangeRowsPerPage={handleChangeRowsPerPage}
                      page={page}
                      rowsPerPage={rowsPerPage}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
      <SingleUserDrawer />
      <MultipleUserDrawer />
      <ExecutiveDetails editMemberDetail={editMemberDetail} />
      <EditSingleUserDrawer />
      <SuccessModal />
      <Menu
        handlePopeverClose={handleClose}
        anchorEl={anchorEl}
        menuItems={[
          { className: 'other', name: 'Single', action: handleSingle },
          { className: 'other', name: 'Bulk Upload', action: handleBulk },
        ]}
      />
    </Box>
  );
}

export default AddExecutives;
