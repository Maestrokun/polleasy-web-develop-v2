/* eslint-disable */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from 'react-query';

import { Button } from 'shared';

import Summary from 'modules/Admin/pages/Campaign/AddPoll/FormSteps/Preview/Summary';
import useStyles from 'modules/Admin/pages/Campaign/AddPoll/FormSteps/Preview/styled.preview';
import { getPollPreview } from 'modules/Admin/services/polls';

import useModal from 'hooks/useModal';
import useAlert from 'hooks/useAlert';
import useElectionStepper from 'hooks/useCampaignStepper';
import handleApiError from 'utils/handleApiError';
import { questionDataTransform } from 'utils/questionDataTransform';
import PollQuestions from './PollQuestions';

function Preview() {
  const classes = useStyles();
  const [state, setState] = useModal();
  const { campaignId, pollId } = useParams();
  const { handlePrev } = useElectionStepper();
  const { showNotification } = useAlert();
  const [previewData, setPreviewData] = React.useState([]);
  const [previewQuestions, setPreviewQuestions] = React.useState([]);
  const [fakeSave, setFakeSave] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (fakeSave === true) {
      setState({
        ...state,
        modalName: 'successModal',
        message: 'Poll Saved Successfully',
        redirect: 'You will be redirected to poll list page',
      });
      const closeModal = setTimeout(() => {
        navigate(`/admin/campaign/view/${campaignId}/polls`, { replace: true });
        clearTimeout(closeModal);
      }, 5000);
    }

    return () => {
      setFakeSave(false)
    }
  }, [fakeSave]);

  
  const handleSave = () => {
    setTimeout(setFakeSave(true), 5000);
  };

  const { isLoading } = useQuery(
    ['poll-preview'],
    () => getPollPreview(pollId),
    {
      onError: (e) => {
        showNotification(handleApiError(e), { type: 'error' });
      },
      // eslint-disable-next-line
      onSuccess: ({ data }) => {
        setPreviewData(data?.data);
        setPreviewQuestions(data?.data?.questions);
      },
    }
  );



  return (
    <Box className={classes.root}>
      <Typography variant="h3">Preview</Typography>

      <Summary data={previewData} loading={isLoading}/>
      <PollQuestions questions={questionDataTransform(previewQuestions)} loading={isLoading}/>

      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        <Grid item>
          <Button onClick={handlePrev} className="btnCancel">Previous</Button>
        </Grid>
        <Grid item>
          <Button onClick={handleSave}>Save &amp; Exit</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Preview;
