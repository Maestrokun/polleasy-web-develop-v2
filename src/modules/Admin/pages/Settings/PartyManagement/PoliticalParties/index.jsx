import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

import { Button, Card, Menu, TableHeader } from 'shared';

import useStyles from 'modules/Admin/pages/Settings/PartyManagement/PoliticalParties/styled.index';

import AddPoliticalParty from 'modules/Admin/components/PoliticalParties/Drawer/AddPoliticalParty';
import EditPoliticalParty from 'modules/Admin/components/PoliticalParties/Drawer/EditPoliticalParty';
import SuccessModal from 'modules/Admin/components/PoliticalParties/Modal/SuccessModal';
import DeleteModal from 'modules/Admin/components/PoliticalParties/Modal/DeleteModal';

import useDrawer from 'hooks/useDrawer';
import useModal from 'hooks/useModal';

import { getPoliticalParties } from 'modules/Admin/pages/Settings/services/politicalPartiesServices';

function PoliticalParties() {
  const classes = useStyles();
  const [state, setState] = useDrawer();
  const [modal, setModal] = useModal();
  const [anchorEl, setAnchorEl] = useState(null);
  const [tableParams, setTableParams] = React.useState({
    search: '',
    pagination: {
      pageSize: 50,
      pageNumber: 1,
      total: 0,
    },
  });

  const params = {
    page: tableParams.pagination.pageNumber,
    page_size: tableParams.pagination.pageSize,
    search: tableParams.search,
  };

  const { data, isLoading } = useQuery(['getPoliticalParties', params], () =>
    getPoliticalParties({ params })
  );

  const handleOpenMore = (event, party) => {
    setAnchorEl(event.currentTarget);
    setState({ ...state, data: party });
    setModal({ ...modal, id: party.id });
  };

  const handleEdit = useCallback(() => {
    setState({ ...state, drawerName: 'editPoliticalParty' });
    setAnchorEl(null);
  }, [state]);

  const handleDelete = useCallback(() => {
    setModal({ ...modal, modalName: 'deletePoliticalParty' });
    setAnchorEl(null);
  }, [state]);

  const handleClose = () => {
    setAnchorEl(null);
    setModal({ ...modal, id: null });
  };

  const handleOpenDrawer = useCallback(() => {
    setState({ ...state, drawerName: 'addPoliticalParty' });
  }, [state]);

  return (
    <Box className={classes.root}>
      <Box className="topWrapper">
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Box sx={{ mt: 0 }}>
              <Breadcrumbs
                sx={{ p: 0, mt: 0, mb: 5 }}
                style={{ color: '#6B6C7E' }}
              >
                <Link to="/admin/settings">
                  <Typography variant="body1" style={{ color: '#6B6C7E' }}>
                    Settings
                  </Typography>
                </Link>
                <Link to="/admin/settings/party-management">
                  <Typography variant="body1" style={{ color: '#6B6C7E' }}>
                    Party Management
                  </Typography>
                </Link>
                <Typography variant="body2" style={{ color: '#393A4A' }}>
                  Political Parties
                </Typography>
              </Breadcrumbs>
            </Box>
          </Grid>
          <Grid item>
            <Button onClick={handleOpenDrawer}>Add New</Button>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 3 }}>
          <Grid item md={8}>
            <TableHeader
              setTableParams={setTableParams}
              tableParams={tableParams}
              filterBool={false}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ pt: '10em' }}>
        <Grid container spacing={3}>
          {isLoading && !data
            ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((loader) => (
                <Grid item key={loader} md={4}>
                  <Skeleton
                    variant="rectangle"
                    height={103}
                    sx={{ borderRadius: '4px' }}
                  />
                </Grid>
              ))
            : data &&
              data?.results.map((party) => (
                <Grid item key={party.id} md={4}>
                  <Card style={{ height: '120px' }}>
                    <Grid container>
                      <Grid item md={12}>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="flex-start"
                        >
                          <Grid item md={2}>
                            <img
                              src={party.flag}
                              alt="party flag"
                              width={48}
                              height={48}
                              style={{ objectFit: 'fill' }}
                            />
                          </Grid>
                          <Grid item md={9} sx={{ pl: 1 }}>
                            <Typography
                              className="MuiTypography-h5"
                              variant="h5"
                            >
                              {party.name.toUpperCase()}
                            </Typography>
                            <Typography
                              className="MuiTypography-body1"
                              variant="body1"
                              sx={{ mt: 5 }}
                            >
                              {party.alias.toUpperCase()}
                            </Typography>
                          </Grid>
                          <Grid item md={1} sx={{ cursor: 'pointer' }}>
                            <IconButton
                              onClick={(e) => handleOpenMore(e, party)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Box>
      <AddPoliticalParty />
      <EditPoliticalParty />
      <SuccessModal />
      <DeleteModal />
      <Menu
        handlePopeverClose={handleClose}
        anchorEl={anchorEl}
        menuItems={[
          { className: 'other', name: 'Edit', action: handleEdit },
          {
            className: 'delete',
            name: 'Delete',
            action: handleDelete,
          },
        ]}
      />
    </Box>
  );
}

export default PoliticalParties;
