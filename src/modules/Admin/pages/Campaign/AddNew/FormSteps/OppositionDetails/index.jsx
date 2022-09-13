/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

import AddOpposition from 'modules/Admin/components/Campaign/Drawer/AddOpponent';
import EditOpposition from 'modules/Admin/components/Campaign/Drawer/EditOpponent';

import AddIcon from 'assets/addIcon.svg';

import { Button, Card, Menu } from 'shared';

import useElectionStepper from 'hooks/useCampaignStepper';
import useDrawer from 'hooks/useDrawer';
import useModal from 'hooks/useModal';

import useStyles from 'modules/Admin/pages/Campaign/AddNew/FormSteps/OppositionDetails/styled.oppositionDetails';

function OppositionDetails({
  opponents,
  setOpponents,
  handleSubmit,
  handleView,
  data,
  isLoading,
  payload,
  isFetchingNextPage,
  hasNextPage,
  ref,
  fetchNextPage,
  inView,
  setSearch,
  search,
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useDrawer();
  const [modal, setModal] = useModal();
  const { handlePrev, currentStep, handleNext } = useElectionStepper();
  const [selectedOpposition, setSelectedOpposition] = useState('');

  const handleOpenDrawer = () => {
    setState({ ...state, drawerName: 'addOpposition' });
  };

  const handleEditOpposition = () => {
    setState({
      ...state,
      drawerName: 'editOpposition',
      data: selectedOpposition,
    });
    setAnchorEl(null);
  };

  const handlePopeverClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleOpenMenu = (event, id) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedOpposition(id);
  };

  const handleDeleteOpposition = () => {
    setModal({
      ...modal,
      modalName: 'deleteModal',
      id: selectedOpposition,
      data: opponents,
    });
    setAnchorEl(null);
  };

  const handleCancel = () => {
    navigate('/admin/campaign');
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h3">Opposition Details</Typography>
      {opponents?.length !== 0 ? (
        <Grid container alignItems="flex-start" spacing={6}>
          {opponents?.map((opponent) => (
            <Grid item md={6} key={opponent?.party}>
              <Card style={{ height: '130px !important' }}>
                <Grid
                  container
                  alignItems="flex-start"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography
                      style={{ paddingTop: '0px', textTransform: 'capitalize' }}
                    >
                      {`${opponent.firstname} ${opponent.lastname}`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      size="small"
                      onClick={(event) => handleOpenMenu(event, opponent)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item>
                    <img
                      src={opponent?.flag}
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'contain',
                      }}
                      alt="party flag"
                    />
                  </Grid>
                  <Grid item>
                    <Typography sx={{ py: '0px !important' }} color="primary">
                      {opponent?.name}
                    </Typography>
                    <Typography sx={{ py: '0px !important' }}>
                      {opponent?.alias}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
          <Grid item md={6} onClick={handleOpenDrawer}>
            <Box className="addOpponentWrapper" onClick={handleOpenDrawer}>
              <img src={AddIcon} alt="" />
              <Typography variant="body1">Add New Opponent</Typography>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box className="opponentWrapper" onClick={handleOpenDrawer}>
          <img src={AddIcon} alt="" />
          <Typography variant="body1">Add New Opponent</Typography>
        </Box>
      )}
      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
        sx={{ mt: 8 }}
      >
        <Grid item>
          <Button
            className="btnCancel"
            onClick={currentStep === 2 ? handlePrev : handleCancel}
          >
            {currentStep === 2 ? 'Previous' : 'Cancel'}
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={handleSubmit(handleView)}>Next</Button>
        </Grid>
      </Grid>
      <Menu
        handlePopeverClose={handlePopeverClose}
        anchorEl={anchorEl}
        menuItems={[
          {
            className: 'other',
            name: 'Edit',
            action: handleEditOpposition,
          },
          {
            className: 'delete',
            name: 'Delete',
            action: handleDeleteOpposition,
          },
        ]}
      />
      <AddOpposition
        opponents={opponents}
        setOpponents={setOpponents}
        data={data}
        isLoading={isLoading}
        payload={payload}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        ref={ref}
        fetchNextPage={fetchNextPage}
        inView={inView}
        setSearch={setSearch}
        search={search}
      />
      <EditOpposition
        opponents={opponents}
        setOpponents={setOpponents}
        data={data}
        isLoading={isLoading}
        payload={payload}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        ref={ref}
        fetchNextPage={fetchNextPage}
        inView={inView}
        setSearch={setSearch}
        search={search}
      />
    </Box>
  );
}

export default OppositionDetails;
