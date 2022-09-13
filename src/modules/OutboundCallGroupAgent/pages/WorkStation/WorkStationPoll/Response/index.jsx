/* eslint-disable import/order */
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
// import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CardResponse from 'modules/OutboundCallGroupAgent/pages/WorkStation/WorkStationPoll/Response/Response';
import CardDetails from 'modules/OutboundCallGroupAgent/pages/WorkStation/WorkStationPoll/Response/OutboundDetails';
import CardCampaign from 'modules/OutboundCallGroupAgent/pages/WorkStation/WorkStationPoll/Response/Campaign';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPollQuestionSet } from 'services/workstation';
import EmptyState from './EmptyState';
import QuestionContextProvider from 'context/questionContext';

function Response() {
  const { id } = useParams();
  const [details, setDetails] = useState('');
  const [questions, setQuestions] = React.useState([]);
  const { isLoading } = useQuery(
    [`useFetchPollQuestions-${id}`, id],
    () => getPollQuestionSet({ pollId: id }),
    {
      enabled: !!id,
      onSuccess: (data) => {
        setQuestions(data?.data || data?.results || data);
      },
    }
  );

  const handleClick = (params) => {
    setDetails(params);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        boxShadow: '1px -1px 0px 0px rgba(0, 0, 0, 0.1)',
        mt: 4,
      }}
    >
      <Grid container>
        <Grid item md={3}>
          <CardResponse handleClick={handleClick} />
        </Grid>

        {details ? (
          <>
            <Grid item md={5}>
              <QuestionContextProvider>
                <CardDetails
                  params={details}
                  data={questions}
                  isLoading={isLoading}
                />
              </QuestionContextProvider>
            </Grid>
            <Grid item md={4}>
              <CardCampaign params={details} />
            </Grid>
          </>
        ) : (
          <Grid item md={9}>
            <EmptyState />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default Response;
