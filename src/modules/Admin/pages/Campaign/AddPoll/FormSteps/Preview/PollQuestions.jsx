/* eslint-disable */

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { Loader } from 'shared';


import useStyles from 'modules/Admin/pages/Campaign/AddNew/FormSteps/Preview/styled.preview';
import { Card } from 'shared';
import PollField from '../Polls/PollField';

function PollQuestions({ questions, loading }) {
  const classes = useStyles();

  if (loading) {
    return <Loader />;
  }

  return (
    <Box className={classes.container}>
      <Card>
        <Typography variant="h5" style={{ paddingTop: '0px' }}>
          {`${questions?.length} Questions`} 
        </Typography>
        <Stack direction="column" spacing={5}>
        {questions?.map((field) => (
          <PollField field={field} readOnly/>
        ))}
        </Stack>
      </Card>
    </Box>
  );
}

export default PollQuestions
