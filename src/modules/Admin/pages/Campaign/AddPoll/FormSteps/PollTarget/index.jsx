import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { TabNav, Button, Loader } from 'shared';
import useElectionStepper from 'hooks/useCampaignStepper';

import ManualTarget from 'modules/Admin/pages/Campaign/AddPoll/FormSteps/PollTarget/ManualTarget';
import SampleUpload from 'modules/Admin/pages/Campaign/AddPoll/FormSteps/PollTarget/SampleUpload';

import useStyles from 'modules/Admin/pages/Campaign/AddPoll/FormSteps/PollTarget/styled.pollTarget';
import { useForm } from 'react-hook-form';
import {
  useFetchPollTarget,
  useSavePollCriteria,
} from 'hooks/queries/usePolls';
import { useQuery, useQueryClient } from 'react-query';
import useAlert from 'hooks/useAlert';
import { useRegionalSplit } from 'hooks/queries/useRegionalSplit';
import { getPollTargets } from 'modules/Admin/services/polls';
import handleApiError from 'utils/handleApiError';
import { pollTargetSchma } from './validator';

const defaultValues = {
  has_occupation: true,
  occupations: [],
  allow_null_occupations: true,
  has_gender: false,
  gender: 'MALE',
  allow_binary_gender: false,
  has_age: true,
  allow_null_age: false,
  has_location: true,
  locations: [],
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 4, px: 0 }}>{children}</Box>}
    </div>
  );
}

function PollTarget() {
  const { campaignId: id, pollId } = useParams();
  const { showNotification } = useAlert();
  const queryClient = useQueryClient();

  const location = useRegionalSplit(id);

  const { data: locations } = useQuery(
    ['target-locations'],
    () => getPollTargets(pollId),
    {
      onError: (e) => {
        showNotification(handleApiError(e), { type: 'Error' });
      },
    }
  );

  console.log(locations);

  const formatedStateLocaton = location?.length
    ? location?.map((v) => ({ value: v?.id, label: v?.name }))
    : [];
  const {
    control,
    handleSubmit,
    watch,
    setValue: targetValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: pollTargetSchma,
  });
  const classes = useStyles();
  const [, setg] = React.useState(true);
  const { handleNext, handlePrev } = useElectionStepper();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    pollTarget,
    isSuccess: targetSuccessGet,
    gettingTarget,
  } = useFetchPollTarget({
    id: pollId,
  });

  const { saveCriteria, savingCriteria, isSuccess } = useSavePollCriteria({
    showNotification,
    queryClient,
    pollId,
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      targetValue(
        'locations',
        pollTarget?.locations?.map((v) => v?.id)
      );
      setg(false);
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [location, targetSuccessGet]);

  React.useEffect(() => {
    if (isSuccess) {
      handleNext();
    }
  }, [isSuccess]);

  React.useEffect(() => {
    if (targetSuccessGet) {
      reset({
        has_occupation: pollTarget?.has_occupation,
        occupations: pollTarget?.occupations,
        allow_null_occupations: pollTarget?.allow_null_occupations,
        has_gender: pollTarget?.has_gender,
        gender: pollTarget?.gender,
        allow_binary_gender: pollTarget?.allow_binary_gender,
        has_age: pollTarget?.has_age,
        allow_null_age: pollTarget?.allow_null_age,
        min_age: pollTarget?.min_age,
        max_age: pollTarget?.max_age,
        has_location: pollTarget?.has_location,
        locations: pollTarget?.locations?.map((v) => v?.id) || [],
      });
    }
  }, [targetSuccessGet, location]);

  const onCLickNext = (key) => (data) => {
    const payload = {};
    switch (key) {
      case 'target':
        payload.has_location = data?.has_location;
        payload.locations = [...data.locations];
        payload.has_gender = data?.has_gender;
        payload.has_age = data?.has_age;
        if (data?.has_gender) {
          payload.gender = data.gender;
          payload.allow_binary_gender = data?.allow_binary_gender;
        }
        if (data?.has_age) {
          payload.min_age = data?.min_age;
          payload.max_age = data?.max_age;
          payload.allow_null_age = data?.allow_null_age;
        }

        // eslint-disable-next-line
        !data?.min_age && delete payload.min_age;
        // eslint-disable-next-line
        !data?.max_age && delete payload.max_age;

        saveCriteria({ payload });
        break;
      case 'supporting document':
        break;

      default:
        break;
    }
  };

  if (gettingTarget) {
    return <Loader />;
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h3">Target</Typography>
      <Grid container>
        <Grid item md={12}>
          <Grid container sx={{ mt: 5 }}>
            <Grid item md={12}>
              <TabNav
                navs={['Manual', 'Sample Upload']}
                value={value}
                handleChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box>
            <Box className={classes.tabWrapper} />
            <TabPanel value={value} index={0}>
              <ManualTarget
                control={control}
                watch={watch}
                setValue={targetValue}
                options={formatedStateLocaton}
                errors={errors}
                pollId={pollId}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SampleUpload />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
        sx={{ mt: 8 }}
      >
        <Grid item>
          <Button onClick={handlePrev} className="btnCancel">
            Previous
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={savingCriteria}
            onClick={handleSubmit(onCLickNext('target'))}
          >
            {savingCriteria ? 'Loading...' : 'Next'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PollTarget;

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
