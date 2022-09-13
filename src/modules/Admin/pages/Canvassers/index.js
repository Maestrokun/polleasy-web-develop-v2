import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import Table from 'modules/Admin/components/Canvasser/Table';

import { SearchAndFilters, Button } from 'shared';

import { ReactComponent as DownloadIcon } from 'assets/downloadIcon.svg';
import useStyles from 'modules/Admin/pages/UserManagement/styled.index';
import UploadDrawer from 'shared/Drawer/UploadDrawer';
import useDrawer from 'hooks/useDrawer';
import {
  useFetchPartyStates,
  useFetchPartyStatesLga,
} from 'hooks/queries/useDatabaseFilters';
import { extractValueFromFilter } from 'utils/helperFunc';
import { topStat } from './utils';
import { canvasserBulk } from './service/mutations';

const btnActiveStyle = {
  color: '#6B6C7E',
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#fff',
  },
};

const btnstyle = {
  color: '#A7A9BC',
  backgroundColor: 'inherit',
  '&:hover': {
    backgroundColor: 'inherit',
  },
};

const tabValue = ['unverified', 'verified'];
function Index() {
  const classes = useStyles();
  const [state, setState] = useDrawer();
  const [filterValues, setFilterValue] = useState([]);
  const [isLoading] = useState(false);
  const [isSuccess] = useState(false);
  const [currentTab, setCurrentTab] = useState('unverified');
  const [search, setSearch] = useState();
  const [page, setPage] = useState(0);

  const { filters } = useFetchPartyStates();
  const stateSelected = extractValueFromFilter(filterValues, 'STATE');
  const { filters: lgaFilter } = useFetchPartyStatesLga({
    stateId: stateSelected?.split('&STATE=')?.[0],
  });

  const handleOpenUploadDrawer = useCallback(() => {
    setState({ ...state, drawerName: 'upload-drawer' });
  }, [state]);

  const renderTab = () => {
    return (
      <Box
        my={4}
        bgcolor="#F1F2F6"
        borderRadius="16px"
        width="auto"
        maxWidth="200px"
        p={1}
        display="flex"
      >
        {tabValue?.map((tab) => {
          const active = tab?.toLowerCase() === currentTab;
          const style = active ? btnActiveStyle : btnstyle;
          return (
            <Button
              onClick={() => setCurrentTab(tab?.toLowerCase())}
              sx={{ ...style, width: 'max-content', borderRadius: '16px' }}
              key={tab}
            >
              {tab}
            </Button>
          );
        })}
      </Box>
    );
  };

  return (
    <Box pt={8}>
      <Box className="topWrapper">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" gutterBottom color="main" fontWeight={700}>
            Canvassers
          </Typography>
          <Box display="flex" alignItems="center">
            <Button
              bgColor="#EAEAEA"
              tColor="#0050C8"
              sx={{ maxWidth: 'max-content', mr: '16px' }}
            >
              Export
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
            : topStat()?.map((stat) => (
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
        <Box>{renderTab()}</Box>
        <Grid
          container
          alignItems="center"
          spacing={4}
          sx={{ mt: 4, width: '100%' }}
          justify="space-between"
        >
          <Grid item md={8}>
            <SearchAndFilters
              setPage={setPage}
              showFilters
              getSearchValue={setSearch}
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
            />
          </Grid>
          <Grid item ml="auto" mr={0} />
        </Grid>
      </Box>
      <Box>
        <Table
          currentTab={currentTab}
          filterValues={filterValues}
          search={search}
          setSearch={setSearch}
          setPage={setPage}
          page={page}
        />
      </Box>
      <UploadDrawer
        titleText="Upload Voters 360 Data"
        sample="bgFrame1"
        mutateFn={canvasserBulk}
      />
    </Box>
  );
}

export default Index;
