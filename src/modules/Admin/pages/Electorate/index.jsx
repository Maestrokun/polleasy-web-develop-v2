import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';

import {
  SingleUserDrawer,
  MultipleUserDrawer,
} from 'modules/Admin/components/Agent/Drawer/AddAgent';
import SuccessModal from 'modules/Admin/components/Agent/Modal/SuccessModal';
import DeactivateModal from 'modules/Admin/components/Agent/Modal/DeactivateModal';
import ActivateModal from 'modules/Admin/components/Agent/Modal/ActivateModal';
import Table from 'modules/Admin/components/Electorate/Table';
import ViewAgent from 'modules/Admin/components/Agent/Drawer/ViewAgent';
import EditAgent from 'modules/Admin/components/Agent/Drawer/EditAgent';

import { SearchAndFilters, Button } from 'shared';
import ELECTORATE_STATUS from 'constant/electorateStatus';
import { ReactComponent as DownloadIcon } from 'assets/downloadIcon.svg';
import useStyles from 'modules/Admin/pages/UserManagement/styled.index';
import useDrawer from 'hooks/useDrawer';
import UploadDrawer from 'shared/Drawer/UploadDrawer';
import {
  useFetchPartyStates,
  useFetchPartyStatesLga,
} from 'hooks/queries/useDatabaseFilters';
import { extractValueFromFilter } from 'utils/helperFunc';
import { useQuery } from 'react-query';
import handleApiError from 'utils/handleApiError';
import useAlert from 'hooks/useAlert';
import { getElectorates } from '../Party/service/query';

function Electorate() {
  const classes = useStyles();
  const [filterValue, setFilterValue] = useState([]);
  const [isLoading] = useState(false);
  const [isSuccess] = useState(false);
  const [state, setState] = useDrawer();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { showNotification } = useAlert();

  const { filters } = useFetchPartyStates();
  const stateSelected = extractValueFromFilter(filterValue, 'STATE');
  const { filters: lgaFilter, refetch } = useFetchPartyStatesLga({
    stateId: stateSelected?.split('&STATE=')?.[0],
  });

  React.useEffect(() => {
    refetch();
  }, [stateSelected]);

  const handleOpenUploadDrawer = useCallback(() => {
    setState({ ...state, drawerName: 'upload-drawer' });
  }, [state]);

  const registration_area = extractValueFromFilter(
    filterValue,
    'Registration Area'
  );
  const lga = extractValueFromFilter(filterValue, 'LGA');
  const genda = extractValueFromFilter(filterValue, 'Gender');
  const statee = extractValueFromFilter(filterValue, 'STATE');

  const { data, isFetching } = useQuery(
    [
      'electorate_database',
      {
        page: page + 1,
        page_size: rowsPerPage,
        registration_area,
        lga,
        gender: genda?.toUpperCase(),
        state: statee,
        search: search || '',
      },
    ],
    getElectorates,
    {
      onError: (err) => {
        showNotification(handleApiError(err), { type: 'error' });
      },
    }
  );

  return (
    <Box pt={8}>
      <Box className="topWrapper">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" gutterBottom color="main" fontWeight={700}>
            Electorate
          </Typography>
          <Box display="flex" alignItems="center">
            <Button
              bgColor="#EAEAEA"
              tColor="#0050C8"
              sx={{ maxWidth: 'max-content', mr: '16px' }}
            >
              Export{' '}
              <DownloadIcon style={{ marginLeft: '5px', width: '20px' }} />
            </Button>
            <Button onClick={handleOpenUploadDrawer}>Upload</Button>
          </Box>
        </Box>
        <Grid container spacing={7} sx={{ mt: 1 }}>
          {isLoading && !isSuccess
            ? [0, 1, 2, 3].map((loader) => (
                <Grid
                  item
                  key={loader}
                  md={3}
                  sx={{
                    paddingTop: '0px !important',
                  }}
                >
                  <Grid container justifyContent="space-between">
                    <Grid item md={12}>
                      <Skeleton height={170} />
                    </Grid>
                  </Grid>
                </Grid>
              ))
            : ELECTORATE_STATUS(data)?.map((stat) => (
                <Grid item key={stat.id} md={3}>
                  <Card elevation={0} width="max-content">
                    <Grid display="flex" container className={classes.card}>
                      <Grid item md={12}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          sx={{ padding: '15px 0 15px 15px' }}
                        >
                          <Box>
                            <Grid item md={8}>
                              <Typography
                                variant="body1"
                                sx={{ textTransform: 'capitalize' }}
                                noWrap
                                width="max-content"
                              >
                                {stat.status}
                              </Typography>
                              <Typography variant="h3" sx={{ mt: 2 }}>
                                {stat.count}
                              </Typography>
                            </Grid>
                          </Box>
                          <Box>
                            <Grid item md={2} style={{ textAlign: 'end' }}>
                              <img src={stat.icon} alt="icon" />
                            </Grid>
                            <Grid sx={{ mt: 4, ml: 'auto' }}>
                              <img src={stat.bgFrame} alt="icon" />
                            </Grid>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
        </Grid>
        <Grid
          container
          alignItems="center"
          spacing={4}
          sx={{ mt: 4, width: '100%' }}
          justify="space-between"
        >
          <Grid item md={8}>
            <SearchAndFilters
              getSearchValue={setSearch}
              showFilters
              getFilterValue={setFilterValue}
              filters={[
                {
                  label: 'Gender',
                  options: [
                    { id: 'Male', value: 'Male' },
                    { id: 'Female', value: 'Female' },
                  ],
                },
                {
                  label: 'STATE',
                  options: filters,
                },
                {
                  label: 'LGA',
                  options: lgaFilter,
                },
                {
                  label: 'Registration Area',
                  options: [{ id: 'LAGOS', value: 'Lagos' }],
                },
              ]}
              setPage={setPage}
            />
          </Grid>
          <Grid item ml="auto" mr={0} />
        </Grid>
      </Box>

      <Table
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        page={page}
        filterValues={filterValue}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        isFetching={isFetching}
        Data={data}
      />

      <SingleUserDrawer />
      <MultipleUserDrawer />
      <ViewAgent />
      <EditAgent />
      <SuccessModal />
      <DeactivateModal />
      <ActivateModal />
      <UploadDrawer titleText="Upload Voters 360 Data" sample="bgFrame1" />
    </Box>
  );
}

export default Electorate;
