/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { AdminPaths } from 'constant/paths';

// svgs
import bgFrame1 from 'assets/bgFrame1.svg';
import useDrawer from 'hooks/useDrawer';
import UserIconTotal from 'assets/svg/UserIconTotal.svg';
import { Button, SearchAndFilters, Table } from 'shared';
import { CSVLink } from 'react-csv';

import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import UploadDrawer from 'shared/Drawer/UploadDrawer';
import handleApiError from 'utils/handleApiError';
import useAlert from 'hooks/useAlert';
import { useFetchPartyStates } from 'hooks/queries/useDatabaseFilters';
import { extractValueFromFilter } from 'utils/helperFunc';
import { columns } from './constant';
import AdvanceFilterDrawer from './components/AdvanceFilterDrawer';
import { getVoter360, getVoter360ByStat } from './service/query';
import { voter360TopStat } from './utils';
import { voter360Bulk } from './service/mutation';

function Voter360() {
  const [state, setState] = useDrawer();
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const { showNotification } = useAlert();
  const [exportData, setExportData] = useState({ data: '', headers: [] });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [queryParams, setQueryParams] = useState({
    zone: '',
    state: '',
    senatorial_district: '',
    local_government: '',
    ward: '',
    polling_unit: '',
    max: '',
    min: '',
  });

  const { filters } = useFetchPartyStates();
  const stateSelected = extractValueFromFilter(filterValue, 'State');

  const education_level = extractValueFromFilter(
    filterValue,
    'Education Level'
  );
  const gender = extractValueFromFilter(filterValue, 'Gender');

  const activeFilterCount = Object.values(queryParams)?.filter(
    (f) => f !== ''
  )?.length;

  const handleOpenUploadDrawer = useCallback(() => {
    setState({ ...state, drawerName: 'upload-drawer' });
  }, [state]);

  const {
    data: voters,
    isFetching,
    refetch,
  } = useQuery(
    [
      'users',
      {
        page_number: page + 1,
        page_size: rowsPerPage,
        search,
        gender,
        education_level,
        state: stateSelected,
        ...queryParams,
      },
    ],
    getVoter360,
    {
      onError: (error) => {
        showNotification(handleApiError(error), { type: 'error' });
      },
    }
  );

  const { data: stat, isFetching: starting } = useQuery(
    ['voters-360-stat'],
    getVoter360ByStat
  );
  const data = voters?.data?.results || [];

  const topStat = voter360TopStat(stat?.data?.data, starting);

  const handleOpenDrawer = useCallback(() => {
    setState({ ...state, drawerName: 'Voters360' });
  }, [state]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmitOrGenerate = () => {
    const head = columns?.map((column) => {
      return { label: column.label, key: column.key };
    });
    const body = data?.map((val) => {
      return {
        fullname: `${val.firstname} ${val.lastname}`,
        voter_ref: val.voter_ref,
        phone: val?.phone,
        gender: val?.gender,
        lga: val?.voting_lga?.name,
        state: val?.voting_state?.name,
        polling_unit: val.voting_pu?.name,
      };
    });

    // generate summary
    setExportData({ header: head, data: body });
  };

  const createData = ({
    id,
    fullname,
    voter_ref,
    phone,
    gender,
    voting_lga,
    voting_state,
    voting_pu,
  }) => {
    return {
      id,
      fullname,
      voter_ref,
      phone,
      gender,
      voting_lga,
      voting_state,
      voting_pu,
    };
  };

  const list = data?.map(
    ({
      id,
      firstname,
      lastname,
      voter_ref,
      phone,
      gender,
      voting_lga,
      voting_state,
      voting_pu,
    }) =>
      createData({
        id,
        fullname: (
          <Typography
            variant="subtitle1"
            color="#0050C8"
            sx={{ cursor: 'pointer' }}
          >
            {firstname} {lastname}
          </Typography>
        ),
        voter_ref,
        phone,
        gender,
        voting_lga: voting_lga?.name,
        voting_state: voting_state?.name,
        voting_pu: voting_pu?.name,
      }) || []
  );

  const renderTopStat = (stat, title) => {
    return (
      <Box
        component={Card}
        position="relative"
        elevation={0}
        bgcolor="#F8F7FA"
        py={4}
        pl={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography color="textSecondary" variant="subtitle1">
            {title}
          </Typography>
          <Typography
            color="textSecondary"
            variant="h6"
            sx={{ fontWeight: 'bold', pt: 3 }}
          >
            {stat}
          </Typography>
        </Box>
        <Box pr={4}>
          <img src={UserIconTotal} alt="icon" />
        </Box>
        <img
          src={bgFrame1}
          alt="icon"
          style={{ position: 'absolute', bottom: 0, right: 0 }}
        />
      </Box>
    );
  };

  return (
    <Box py={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          color="textPrimary"
          variant="h6"
          sx={{ fontWeight: 'bold' }}
        >
          Voters 360
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="contained"
            onClick={handleSubmitOrGenerate}
            sx={{
              maxWidth: 'max-content',
              mr: '10px',
              background: '#F0F5FF',
              '&:hover': {
                background: '#F0F5FF',
              },
            }}
          >
            <CSVLink
              filename="voter_360.csv"
              data={exportData?.data}
              headers={exportData?.headers}
              style={{ color: '#0050C8', textDecoration: 'none' }}
            >
              Export
            </CSVLink>
          </Button>
          <Button
            sx={{ maxWidth: 'max-content' }}
            onClick={handleOpenUploadDrawer}
          >
            Upload
          </Button>
        </Box>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ mb: '3rem', mt: '1rem' }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        {topStat?.map(({ title, label }) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={label}>
              {renderTopStat(label, title)}
            </Grid>
          );
        })}
      </Grid>
      <Box display="flex" justifyContent="space-between" alignItems="baseline">
        <Grid container spacing={3}>
          <Grid item sx={12} md={9}>
            <SearchAndFilters
              getSearchValue={setSearch}
              setPage={setPage}
              showFilters
              getFilterValue={setFilterValue}
              filters={[
                {
                  label: 'State',
                  options: filters,
                },
                {
                  label: 'Education Level',
                  options: [{ id: 'ACTIVE', value: 'Active' }],
                },
                {
                  label: 'Gender',
                  options: [
                    { id: 'MALE', value: 'Male' },
                    { id: 'FEMALE', value: 'Female' },
                    { id: 'OTHER', value: 'Other' },
                  ],
                },
              ]}
              extraNode={
                <Button
                  onClick={handleOpenDrawer}
                  sx={{
                    whiteSpace: 'nowrap',
                    minWidth: 'max-content',
                    background: '#1E0A3C',
                    '&:hover': {
                      background: '#1E0A3C',
                      opacity: 0.8,
                    },
                  }}
                >
                  {`Advanced Filter (${activeFilterCount})`}
                </Button>
              }
            />
          </Grid>
          <Grid item sx={12} md={3} />
        </Grid>
      </Box>
      <Box mt={8}>
        <Table
          loading={isFetching}
          emptyIconTitle="No Voters"
          emptyIconMessage="You currently do not have any voters yet"
          results={list || []}
          columns={columns}
          handlePageChange={handlePageChange}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          totalResults={voters?.data?.total}
          rowsPerPage={rowsPerPage}
          handleRowClick={(row) =>
            navigate(`${AdminPaths.ADMIN_VOTERS_360}/${row?.id}`)
          }
        />
      </Box>
      <AdvanceFilterDrawer
        refetch={refetch}
        setQueryParams={setQueryParams}
        queryParams={queryParams}
      />
      <UploadDrawer
        titleText="Upload Voters 360 Data"
        sample={bgFrame1}
        mutateFn={voter360Bulk}
      />
    </Box>
  );
}

export default Voter360;
