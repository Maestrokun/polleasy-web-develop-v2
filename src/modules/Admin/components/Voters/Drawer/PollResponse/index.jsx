import React, { useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import { Drawer, Card } from 'shared';

import useDrawer from 'hooks/useDrawer';

import nameInitial from 'utils/nameInitial';

import useStyles from 'modules/Admin/components/Voters/Drawer/PollResponse/styled.pollDetail';

function PollResponse() {
  const classes = useStyles();
  const [state, setState] = useDrawer();

  const handleCloseDrawer = useCallback(() => {
    setState({ ...state, drawerName: '' });
  }, [state]);

  return (
    <Drawer
      drawerName="pollResponse"
      titleText="Voters Details"
      primaryButton="Close"
      handleSubmit={handleCloseDrawer}
    >
      <Box className={classes.topInfo}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item md={2}>
            <Avatar variant="square">{nameInitial(state.data?.name)}</Avatar>
          </Grid>
          <Grid item md={10}>
            <Typography variant="body1">{state.data?.pollName}</Typography>
            <Typography variant="h2">{state?.data?.rating}</Typography>
            <Typography variant="subtitle1" color="primary">
              Date {state?.data?.start_date} &bull; Time 5:43pm
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.bottomInfo}>
        {[0, 1, 2, 3, 4, 5, 6].map((question) => (
          <Card key={question} style={{ marginBottom: '1em' }}>
            <Typography variant="subtitle2">Question {question + 1}</Typography>
            <Typography variant="body2">
              Which candidate are you supporting in the coming presidential
              election?
            </Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </Card>
        ))}
      </Box>
    </Drawer>
  );
}

export default PollResponse;
