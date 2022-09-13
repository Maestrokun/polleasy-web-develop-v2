/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Drawer } from 'shared';
import { ReactComponent as Lens } from 'assets/lens.svg';
import { Checkbox } from '@mui/material';
import { votersResponseMock } from '../mock';

function VoterResponse() {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(votersResponseMock);

  const renderQuestionAndAnswer = (index, question, options, answer) => {
    const isRadio = !Array.isArray(answer);
    return (
      <Box mb={4} component={Paper} p={3} maxWidth="450px">
        <Typography variant="subtitle1" color="textSecondary">
          Question ({index + 1})
        </Typography>
        <Typography
          sx={{ fontSize: '16px', fontWeight: 'bold', my: 3 }}
          color="textPrimary"
        >
          {question}
        </Typography>
        {isRadio
          ? options?.map((option, i) => {
              return (
                <FormGroup key={i}>
                  <FormControlLabel
                    control={<Radio />}
                    label={option}
                    readOnly
                    checked={option === answer}
                  />
                </FormGroup>
              );
            })
          : options?.map((option, i) => {
              return (
                <FormGroup key={i}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={option}
                    readOnly
                    checked={answer?.includes(option)}
                  />
                </FormGroup>
              );
            })}
      </Box>
    );
  };

  const pollBox = () => {
    return (
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="#F2F7F9"
        p={3}
        borderRadius="4px"
        mb={3}
      >
        <Lens />
        <Box>
          <Typography
            variant="body1"
            color="#0050C8"
            sx={{ fontWeight: 'bold' }}
          >
            2022 Presidential Campaign for Asiwaju
          </Typography>
          <Typography
            sx={{ fontSize: '16px', fontWeight: 'bold', my: 3 }}
            color="textPrimary"
          >
            Q1-Popularity Rating For South-South Territorial Region
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ fontWeight: 'bold', pr: 4 }}
            >
              Date: Feb 14, 2021
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ fontWeight: 'bold' }}
            >
              Time: 5:43pm
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <div>
      <Drawer
        drawerName="polls_popularity"
        titleText="Voter’s Response"
        isSubmitting={false}
      >
        <Box>{pollBox()}</Box>
        <Box padding={5} maxWidth="70vh" sx={{ overflowY: 'auto' }}>
          {data?.map((d, i) => {
            return (
              <Box key={i}>
                {renderQuestionAndAnswer(i, d.question, d.options, d.answer)}
              </Box>
            );
          })}
        </Box>
      </Drawer>
    </div>
  );
}

export default VoterResponse;
