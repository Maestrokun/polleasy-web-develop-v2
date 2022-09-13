/* eslint-disable */
import React, { useContext, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useInfiniteQuery } from 'react-query';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import { MANAGE_ELECTION_COUNTER } from 'constant/electionData';

import CampaignDetails from 'modules/Admin/pages/Campaign/AddNew/FormSteps/CampaignDetails';
import OppositionDetails from 'modules/Admin/pages/Campaign/AddNew/FormSteps/OppositionDetails';
import PreviewDetails from 'modules/Admin/pages/Campaign/AddNew/FormSteps/Preview';

import SuccessModal from 'modules/Admin/components/Campaign/Modal/SuccessModal';
import DeleteModal from 'modules/Admin/components/Campaign/Modal/DeleteModal';
import DraftModal from 'modules/Admin/components/Campaign/Modal/DraftModal';
import SaveModal from 'modules/Admin/components/Campaign/Modal/SaveModal';

import FormSteps from 'modules/Admin/components/Campaign/FormSteps';

import { CampaignStepperContext } from 'context/campaignStepperContext';

import useModal from 'hooks/useModal';
import useElectionStepper from 'hooks/useCampaignStepper';
import useAlert from 'hooks/useAlert';
import useDebounce from 'hooks/useDebouncee';

import { getPoliticalParties } from 'modules/Admin/services/campaigns';

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

const schema = Yup.object({
  campaignName: Yup.string().required('Required'),
  campaignType: Yup.string().required('Required'),
  year: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  candidate: Yup.string().required('Required'),
  manager: Yup.string().required('Required'),
});

function AddNew() {
  const classes = useStyles();
  const { handleNext } = useElectionStepper();
  const { currentStep } = useContext(CampaignStepperContext);
  const [state, setState] = useModal();
  const [oppositionDetails, setOppositionDetails] = useState([]);
  const [payloads, setPayloads] = useState();
  const { showNotification } = useAlert();
  const [candidateParty, setCandidateParty] = useState([]);
  const [search, setSearch] = useState('');
  const searchTerm = useDebounce(search, 1000);

  const {
    data: politicalData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    ['get-political-parties', { searchTerm }],
    ({ queryKey, pageParam = 1 }) =>
      getPoliticalParties(queryKey[1], pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length + 1;
        return lastPage.total >= nextPage ? nextPage : undefined;
      },
    }
  );

  const { control, handleSubmit, getValues, watch, setValue } = useForm({
    defaultValues: {
      campaignName: '',
      campaignType: '',
      year: '',
      state: '',
      senDistrict: '',
      houseOfRep: '',
      houseOfAssembly: '',
      LGA: '',
      ward: '',
      description: '',
      candidate: '',
      manager: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSave = async () => {
    setState({
      ...state,
      modalName: 'saveModal',
      message: 'You are saving this election data',
      redirect: 'If you save you will be able to edit after saving',
    });
  };

  const handleDelete = useCallback(() => {
    const newOpponents = state?.data.filter(
      (opponents) => opponents.party !== state?.id?.party
    );
    setOppositionDetails(newOpponents);
    setState({
      ...state,
      modalName: 'successModal',
      message: 'Opponent Successfully Deleted',
      redirect: 'You will be redirected to opponent page',
    });
  }, [state]);

  const handleView = async (data) => {
    const payload = {
      opponents: [...oppositionDetails],
      publish: true,
      name: data.campaignName,
      election_year: data.year,
      type: data.campaignType,
      description: data.description,
      state: data.state,
      senatorial_district: data.senDistrict,
      house_assembly: data.houseOfAssembly,
      house_rep: data.houseOfRep,
      lga: data.LGA,
      ward: data.ward,
      manager: JSON.parse(data.manager)?.id,
      candidate: JSON.parse(data.candidate)?.id,
    };
    try {
      if (currentStep === 1) {
        handleNext();
      } else if (currentStep === 2) {
        handleNext();
      } else if (currentStep === 3) {
        handleSave();
        setState({
          ...state,
          modalName: 'saveModal',
          message: 'You are saving this campaign data',
          redirect:
            'you will still be able to edit this campaign after saving.',
          data: payload,
        });
      }
    } catch (error) {
      showNotification?.('An error occurred', { type: 'error' });
    }
  };

  const selectedFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CampaignDetails
            control={control}
            handleView={handleView}
            handleNext={handleNext}
            handleSubmit={handleSubmit}
            getValues={getValues}
            watch={watch}
            setValue={setValue}
          />
        );
      case 2:
        return (
          <OppositionDetails
            opponents={oppositionDetails}
            setOpponents={setOppositionDetails}
            handleView={handleView}
            handleSubmit={handleSubmit}
            data={politicalData}
            isLoading={isLoading}
            payload={payloads}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            setSearch={setSearch}
            search={search}
          />
        );
      case 3:
        return (
          <PreviewDetails
            getValues={getValues}
            oppositionDetails={oppositionDetails}
            candidateParty={candidateParty}
            payload={payloads}
            handleView={handleView}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return <CampaignDetails />;
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
            <Typography variant="body2" sx={{ p: 0 }}>
              Add New
            </Typography>
          </Breadcrumbs>
          <>{selectedFormStep()}</>
        </Grid>
        <FormSteps
          title="Manage campaign"
          subtitle={watch('campaignName')}
          year={watch('year')}
          steps={MANAGE_ELECTION_COUNTER}
        />
      </Grid>
      <SuccessModal />
      <SaveModal />
      <DeleteModal handleDelete={handleDelete} />
      <DraftModal />
    </Box>
  );
}

export default AddNew;
