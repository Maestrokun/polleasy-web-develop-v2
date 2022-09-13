/* eslint-disable */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import { TextField } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { QuestionContext } from 'context/questionContext';
import EmptyState from 'shared/NewTable/EmptyState';
import QuestionComponent from '../QuestionComponent/QuestionComponent';
import { useMutation, useQueryClient } from 'react-query';
import { savePollResponse } from 'services/workstation';
import useAlert from 'hooks/useAlert';
import handleApiError from 'utils/handleApiError';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { ReactComponent as DocumentIcon } from 'assets/DocumentIcon.svg';
import { ReactComponent as ArrowIcon } from 'assets/ArrowIcon.svg';
import { ReactComponent as UpArrowIcon } from 'assets/UpArrow.svg';

function VotersQuest({ control, watch, errors }) {
  const { auth } = useAuth();
  const { id } = useParams();
  const { showNotification } = useAlert();
  const queryClient = useQueryClient();
  const [textArea, setTextArea] = useState(false);
  const [questionaire, setQuestionaire] = React.useState([]);
  const { question } = React.useContext(QuestionContext);
  const { mutate, isLoading, reset, isSuccess } = useMutation(
    ({ payload }) => savePollResponse({ pollId: id, payload }),
    {
      onSuccess: () => {
        queryClient.refetchQueries([`useFetchPollQuestions-${id}`, id]);
        showNotification('question response successfully saved', {
          type: 'success',
        });
      },
      onError: (err) => {
        reset();
        showNotification(handleApiError(err), { type: 'error' });
      },
    }
  );

  function toggleTextArea() {
    setTextArea(!textArea);
  }

  React.useEffect(() => {
    if (question) {
      setQuestionaire(question);
    }
  }, [question]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        // alignItems: 'space-between',
      }}
    >
      <Box
        sx={{
          width: '100%',
          padding: '0 12px',
          backgroundColor: '#287D3C',
          color: 'black',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: '10px', color: '#fff' }}>
          Active Calll
        </Typography>
      </Box>

      <Box
        sx={{
          height: '45vh',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          mb: 12,
          p: 4,
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Box sx={{ backgroundColor: '#F0F5FF', p: 2 }}>
          <Typography sx={{ fontSize: '16px' }}>
            Hi {`${auth?.userObj?.firstname} ${auth?.userObj?.lastname}`}, You
            have been assigned a XYZ party agent position. You are to
            communicate to this respondant as as an XYZ party agent to determine
            which party He/She is in support of.
            <Box sx={{ mt: 1, fontWeight: 500 }}> Good Luck!</Box>
          </Typography>
        </Box>
        {questionaire && questionaire?.length > 0 ? (
          questionaire?.map((v, i) => (
            <QuestionComponent
              field={v}
              qtn={i}
              control={control}
              watch={watch}
              errors={errors}
            />
          ))
        ) : (
          <EmptyState
            title="Question"
            message="No poll question is available "
          />
        )}
      </Box>

      <Box
        sx={{
          px: 4,
          backgroundColor: '#F7F8F9',
          position: 'absolute',
          bottom: 0,

          width: '100%',
        }}
      >
        <Box
          sx={{
            color: '#393A4A',
            fontSize: '14px',
            fontWeight: 500,
            width: '100%',
            py: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {' '}
            <DocumentIcon />{' '}
            <Typography sx={{ ml: 2 }}> Add Supporting Comment</Typography>
          </Box>
          <Box sx={{ cursor: 'pointer' }} onClick={toggleTextArea}>
            {textArea ? <UpArrowIcon /> : <ArrowIcon />}
          </Box>
        </Box>
        {textArea && (
          <TextareaAutosize
            minRows={6}
            style={{ resize: 'none', width: '100%', padding: '1rem' }}
          />
        )}
      </Box>
    </Box>
  );
}

export default VotersQuest;
