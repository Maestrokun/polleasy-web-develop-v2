/* eslint-disable */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import CheckBox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import NoResponseImg from 'assets/noResponseAnimation.gif';

import avatarColor from 'utils/avatarColor';

import { TextField } from 'shared';

import useStyles from 'modules/Admin/pages/Campaign/ViewPoll/styled.viewPoll';
import {
  getPollRespondentants,
  getPollRespondentantsQuestions,
} from 'modules/Admin/services/campaigns';

function Response() {
  const classes = useStyles();
  const { pollId } = useParams();
  const { control } = useForm({});
  const [respondantId, setRespondantId] = useState('');
  const { data, isLoading } = useQuery(
    ['get-poll-response', { id: pollId }],
    getPollRespondentants
  );

  const { data: responseData, isLoading: responseIsLoading } = useQuery(
    ['get-poll-respondant-question', { pollId, respondantId }],
    getPollRespondentantsQuestions
  );

  const handleViewResponse = (id) => {
    setRespondantId(id);
  };

  return (
    <Box className={classes.response}>
      <Box className="responseContainer">
        <Box className="responseWrapper">
          <Stack>
            <Typography variant="h5" sx={{ marginBottom: '1em' }}>
              Respondent
            </Typography>
          </Stack>
          <TextField
            control={control}
            onChange={() => {}}
            name="search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {isLoading && <Typography>Please wait...</Typography>}
        {data?.results?.length === 0 ? (
          <Box
            style={{
              height: '50%',
              textAlign: 'center',
            }}
          >
            <img
              src={NoResponseImg}
              alt=""
              style={{ width: '50%', height: '70%', objectFit: 'cover' }}
            />
            <Typography variant="h4" sx={{ padding: '0px' }}>
              No Response Yet
            </Typography>
            <Typography variant="subtitle1" sx={{ padding: '0px' }}>
              Voter has not been reached by the call group
            </Typography>
          </Box>
        ) : (
          data?.results?.map((response) => (
            <Box
              key={response.id}
              display="flex"
              alignItems="center"
              sx={{
                padding: '.5em 1em',
                cursor: 'pointer',
              }}
              onClick={() => handleViewResponse(response.id)}
            >
              <Avatar
                {...avatarColor(
                  `${response?.voter?.firstname} ${response?.voter?.lastname}`
                )}
              />
              <Box sx={{ paddingLeft: '10px' }}>
                <Typography sx={{ paddingBottom: '8px !important' }}>
                  {`${response?.voter?.firstname} ${response?.voter?.lastname}`}
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>
      <Box className={classes.details}>
        <Box className="detailsContainer">
          <Typography variant="h5">Details</Typography>
        </Box>
        {data && data?.results?.length === 0 && (
          <Box
            style={{
              height: '50%',
              width: '50%',
              margin: 'auto',
              textAlign: 'center',
            }}
          >
            <img
              src={NoResponseImg}
              alt=""
              style={{ width: '50%', height: '70%', objectFit: 'cover' }}
            />
            <Typography variant="h4" sx={{ padding: '0px' }}>
              No Response Yet
            </Typography>
            <Typography variant="subtitle1" sx={{ padding: '0px' }}>
              Voter has not been reached by the call group
            </Typography>
          </Box>
        )}
        {responseIsLoading ? (
          <Typography sx={{ pl: 3 }}>Please wait...</Typography>
        ) : (
          responseData?.data?.map((response, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={index}>
              {response?.comment && (
                <Box className="detailsComment">
                  <Typography variant="body2">Comment</Typography>
                  <Typography
                    variant="body1"
                    sx={{ paddingBottom: '0px !important' }}
                  >
                    {response.comment}
                  </Typography>
                </Box>
              )}
              <Box className="question">
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Question {index + 1}
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  {response?.question?.title}
                </Typography>
                <FormControl>
                  {response?.question?.type === 'SINGLE_ANSWER' ? (
                    response?.answers?.map((value) => (
                      <RadioGroup name="options">
                        <FormControlLabel
                          value={value?.option}
                          control={
                            <Radio size="small" checked={value?.selected} />
                          }
                          label={value?.option}
                        />
                      </RadioGroup>
                    ))
                  ) : response?.question?.type === 'MULTIPLE_ANSWER' ? (
                    response?.answers?.map((value) => (
                      <RadioGroup name="options">
                        <FormControlLabel
                          value={value?.option}
                          control={
                            <CheckBox size="small" checked={value?.selected} />
                          }
                          label={value?.option}
                        />
                      </RadioGroup>
                    ))
                  ) : (
                    <Typography>another question type</Typography>
                  )}
                </FormControl>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}

export default Response;
