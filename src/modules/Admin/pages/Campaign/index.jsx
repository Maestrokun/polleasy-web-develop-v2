/* eslint-disable */
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';

import { Button, Menu, SearchAndFilters, Table, Card } from 'shared';

import DeactivateModal from 'modules/Admin/components/Campaign/Modal/DeactivateModal';
import ActivateModal from 'modules/Admin/components/Campaign/Modal/ActivateModal';

import EmptyCallCenter from 'assets/emptyCallCenter.svg';

import { CAMPAIGN_TYPES, columns, filters } from 'constant/electionData';

import useModal from 'hooks/useModal';
import useDebounce from 'hooks/useDebouncee';

import CAMPAIGN_STATS from 'constant/CampaignStats';

import {
  getCampaigns,
  updateCampaignStatus,
  getCampaignStats,
} from 'modules/Admin/services/campaigns';

import useStyles from 'modules/Admin/pages/Campaign/styled.campaign';

function Campaign() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [modalState, setModalState] = useModal();
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isRowStatus, setIsRowStatus] = useState('');
  const [selectedRow, setSelectedRow] = useState('');
  const [search, setSearch] = useState('');
  const [filterValue, setFilterValue] = useState([]);
  const searchTerm = useDebounce(search, 1000);
  const { data, isLoading } = useQuery(
    [
      'view-campaigns',
      {
        page: page + 1,
        page_size: rowsPerPage,
        search: searchTerm,
      },
    ],
    getCampaigns
  );
  const { data: statsData, isLoading: statsIsLoading } = useQuery(
    ['get-campaign-stats'],
    getCampaignStats
  );
  const { mutate } = useMutation(updateCampaignStatus);

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

  const handleEdit = (row) => (e) => {
    e.stopPropagation();
    console.log({ row });
  };

  const handleAddNew = useCallback(() => {
    navigate('/admin/campaign/add-new');
  });

  const handleViewCampaign = (row) => {
    navigate(`/admin/campaign/view/${row.id}`);
  };

  const handleOpenMore = (event, data) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setIsRowStatus(data.status.props.label);
    setSelectedRow(data?.id);
  };

  const handleUpdateStatus = (status) => {
    if (status === 'DEACTIVATE') {
      setModalState({
        modalState,
        modalName: 'campaignDeactivateModal',
        id: selectedRow,
        data: 'DEACTIVATE',
      });
      setAnchorEl(null);
    } else if (status === 'ACTIVATE') {
      setModalState({
        modalState,
        modalName: 'campaignActivateModal',
        id: selectedRow,
        data: 'ACTIVATE',
      });
      setAnchorEl(null);
    }
  };

  function createData({
    id,
    name,
    type,
    candidate,
    no_of_polls,
    election_year,
    status,
  }) {
    return {
      id,
      title: (
        <Typography
          sx={{ color: '#0050C8 !important', textTransform: 'capitalize' }}
        >
          {name}
        </Typography>
      ),
      type: CAMPAIGN_TYPES[type],
      name: `${candidate?.firstname} ${candidate?.lastname}`,
      campaign: no_of_polls,
      year: election_year,
      status: (
        <Chip
          label={
            status === 'ACTIVE'
              ? 'Active'
              : status === 'DRAFT'
              ? 'Draft'
              : 'Deactivated'
          }
          size="small"
          sx={{
            backgroundColor:
              status === 'ACTIVE'
                ? '#D4F7DC'
                : status === 'DRAFT'
                ? '#FFF8CC'
                : '#E5E5EA',
            color:
              status === 'ACTIVE'
                ? '#15692A'
                : status === 'DEACTIVATED'
                ? '#1E0A3C'
                : '#806B00',
            borderRadius: '4px',
          }}
        />
      ),
    };
  }

  const list =
    data &&
    data?.data?.results?.map(
      ({ id, name, type, candidate, no_of_polls, election_year, status }) =>
        createData({
          id,
          name,
          type,
          candidate,
          no_of_polls,
          election_year,
          status,
        }) || []
    );

  return (
    <>
      <Box className={classes.root}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="body2">Campaign</Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleAddNew}>Add New</Button>
          </Grid>
        </Grid>
        <Grid container spacing={4} alignItems="center" mt={3} mb={8}>
          {statsIsLoading && !statsData
            ? [0, 1, 2, 3].map((loader) => (
                <Grid md={3} item key={loader}>
                  <Skeleton
                    height={150}
                    sx={{
                      marginTop: -10,
                    }}
                  />
                </Grid>
              ))
            : CAMPAIGN_STATS.map((stat) => (
                <Grid item key={stat.id} md={3}>
                  <Card
                    style={{
                      background: '#FAF9FB',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Grid container>
                      <Grid item md={12}>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="flex-start"
                        >
                          <Grid item md={8}>
                            <Typography
                              variant="body1"
                              p={0}
                              sx={{
                                textTransform: 'capitalize',
                                padding: '0px !important',
                              }}
                            >
                              {stat.status}
                            </Typography>
                            <Typography variant="h3" sx={{ mt: 0.5 }}>
                              {statsData.data.data[stat.label] ?? '0'}
                            </Typography>
                          </Grid>
                          <Grid item md={2} style={{ textAlign: 'end' }}>
                            <img src={stat.icon} alt="icon" />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Box className={classes.pattern}>
                      <img src={stat.pattern} alt="icon" />
                    </Box>
                  </Card>
                </Grid>
              ))}
        </Grid>
        <Grid container mb={8}>
          <Grid item xs={8}>
            <SearchAndFilters
              getSearchValue={setSearch}
              setPage={setPage}
              showFilters
              getFilterValue={setFilterValue}
              filters={filters}
            />
          </Grid>
        </Grid>

        {isLoading ? (
          <Skeleton sx={{ height: '120vh !important', marginTop: '-12em' }} />
        ) : data && data.data.result === 0 ? (
          <Box className={classes.campaign_empty}>
            <img src={EmptyCallCenter} alt="An empty box" />
            <Typography variant="h2" sx={{ color: '#323130', py: 2 }}>
              No Campaign
            </Typography>
            <Typography variant="body1" sx={{ width: '30%', margin: 'auto' }}>
              You currently do not have any campaign
            </Typography>
          </Box>
        ) : (
          <Table
            emptyIconTitle="No Campaign"
            emptyIconMessage="You currently do not have any Campaign set up"
            results={list || []}
            columns={columns}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            handleRowClick={(row) => handleViewCampaign(row)}
            handleMenu={handleOpenMore}
            totalResults={data && data?.data?.total}
            moreMenu
          />
        )}
        <Menu
          handlePopeverClose={handleCloseMoreMenu}
          anchorEl={anchorEl}
          menuItems={[
            { className: 'other', name: 'Edit', action: handleEdit },
            {
              className: isRowStatus === 'Deactivated' ? 'other' : 'other',
              name:
                isRowStatus === 'Deactivated'
                  ? 'Activate'
                  : isRowStatus === 'Active'
                  ? 'Deactivate'
                  : null,
              action:
                isRowStatus === 'Active'
                  ? () => handleUpdateStatus('DEACTIVATE')
                  : () => handleUpdateStatus('ACTIVATE'),
            },
          ]}
        />
      </Box>
      <DeactivateModal />
      <ActivateModal />
    </>
  );
}

export default Campaign;
