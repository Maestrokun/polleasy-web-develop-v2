import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { makeStyles } from '@mui/styles';

import { ADD_POLL_COUNTER } from 'constant/electionData';

import PollDetails from 'modules/Admin/pages/Campaign/AddPoll/FormSteps/PollDetails';
import Poll from 'modules/Admin/pages/Campaign/AddPoll/FormSteps/Polls';
import PollTarget from 'modules/Admin/pages/Campaign/AddPoll/FormSteps/PollTarget';
import PreviewDetails from 'modules/Admin/pages/Campaign/AddPoll/FormSteps/Preview';

import SuccessModal from 'modules/Admin/components/Campaign/Modal/SuccessModal';
import DeleteModal from 'modules/Admin/components/Campaign/Modal/DeleteModal';
import DraftModal from 'modules/Admin/components/Campaign/Modal/DraftModal';
import SaveModal from 'modules/Admin/components/Campaign/Modal/SaveModal';
import FormSteps from 'modules/Admin/components/Campaign/FormSteps';

import { CampaignStepperContext } from 'context/campaignStepperContext';

import useModal from 'hooks/useModal';
import { getCampaignById } from 'modules/Admin/services/polls';

const useStyles = makeStyles({
  root: {
    '& .MuiBreadcrumbs-root': {
      '& .MuiTypography-body1': {
        padding: '0px',
      },
      '& a': {
        textDecoration: 'none',
        color: 'unset',
      },
    },
  },
});

const campaignTypeLookUp = {
  PRESIDENTIAL: 'Presidential',
  GUBERNITORIAL: 'Governorship',
};

function AddNew() {
  const classes = useStyles();
  const { campaignId } = useParams();
  const { currentStep } = useContext(CampaignStepperContext);
  const [state, setState] = useModal();
  // eslint-disable-next-line

  const { data: campaignData } = useQuery(['get-single-campaign'], () =>
    getCampaignById(campaignId)
  );

  const selectedFormStep = () => {
    switch (currentStep) {
      case 1:
        return <PollDetails />;
      case 2:
        return <Poll />;
      case 3:
        return <PollTarget />;
      case 4:
        return <PreviewDetails />;
      default:
        return <PollDetails />;
    }
  };

  const handleBack = () => {
    setState({ ...state, modalName: 'draftModal' });
  };

  return (
    <Box className={classes.root}>
      <Grid container spacing={0} justifyContent="space-between">
        <Grid component="main" item md={7.3}>
          <Breadcrumbs sx={{ p: 0, mb: 0 }}>
            <Typography
              onClick={handleBack}
              variant="body1"
              sx={{ p: 0, cursor: 'pointer' }}
            >
              Campaign
            </Typography>
            <Typography
              onClick={handleBack}
              variant="body1"
              sx={{ p: 0, cursor: 'pointer' }}
            >
              Campaign Name
            </Typography>
            <Typography variant="body2" sx={{ p: 0 }}>
              Add Poll
            </Typography>
          </Breadcrumbs>
          <>{selectedFormStep()}</>
        </Grid>
        <FormSteps
          title="Poll Creation Steps"
          subtitle={`Campaign For: ${
            campaignTypeLookUp[campaignData?.data?.type]
          } Election For ${campaignData?.data?.name}`}
          year="2022"
          steps={ADD_POLL_COUNTER}
        />
      </Grid>
      <SuccessModal />
      <SaveModal />
      <DeleteModal />
      <DraftModal />
    </Box>
  );
}

export default AddNew;
