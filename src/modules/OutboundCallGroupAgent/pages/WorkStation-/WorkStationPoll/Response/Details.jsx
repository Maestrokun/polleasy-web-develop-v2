import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';

import { ReactComponent as CallButtonIcon } from 'assets/callButton.svg';
import { ReactComponent as CallButtonBlueIcon } from 'assets/callButtonBlue.svg';
import { ReactComponent as CallButtonAshIcon } from 'assets/callButtonAsh.svg';
import { ReactComponent as CallButtonRedIcon } from 'assets/callButtonRed.svg';
import { ReactComponent as PersonaIcon } from 'assets/Persona-initialsPink.svg';

import { Card } from 'shared';

import useModal from 'hooks/useModal';

import useStyles from 'modules/CallGroupAgent/pages/WorkStation/WorkStationPoll/Response/styled.response';
import Comment from 'modules/CallGroupAgent/pages/WorkStation/WorkStationPoll/Response/Comment';

import EndCallModal from 'modules/CallGroupAgent/components/WorkStation/Modal/EndCallModal';
import StartCallModal from 'modules/CallGroupAgent/components/WorkStation/Modal/StartCallModal';
import SuccessModal from 'modules/CallGroupAgent/components/WorkStation/Modal/SuccessModal';

function Details() {
  const classes = useStyles();
  const [state, setState] = useModal();
  const [endCall, isSetEndCall] = useState(false);

  const handleStartCall = useCallback(() => {
    setState({ ...state, modalName: 'startCallModal' });
  }, [state]);

  const handleEndCallDeactivate = useCallback(() => {
    setState({ ...state, modalName: 'endCallModal' });
  }, [state]);

  const handleEndCall = () => isSetEndCall(true);

  return (
    <Card style={{ height: '200vh', padding: '0px' }}>
      <Box sx={{ background: '#F0F5FF', p: 2 }}>
        <Grid container spacing={2} sx={{ m: 2 }}>
          <Grid item md={6}>
            <Box
              onClick={handleEndCall}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <PersonaIcon />
              <Box className={classes.details} sx={{ ml: 3 }}>
                <Typography variant="body1">Oladimeji Banke Arole</Typography>
                <Typography variant="subtitle1" sx={{ mt: -5 }}>
                  00.00.00
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: -1 }}>
                  Total Call Attempt: 12
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item md={2} sx={{ mt: 2 }}>
            {endCall ? (
              <Box onClick={handleEndCallDeactivate} sx={{ cursor: 'pointer' }}>
                <CallButtonRedIcon />
                <Typography variant="subtitle1" sx={{ mt: -1 }}>
                  End call
                </Typography>
              </Box>
            ) : (
              <Box onClick={handleStartCall} sx={{ cursor: 'pointer' }}>
                <CallButtonIcon />
                <Typography variant="subtitle1" sx={{ mt: -1 }}>
                  Start call
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item md={2} sx={{ mt: 2 }}>
            <CallButtonBlueIcon />
            <Typography variant="subtitle1" sx={{ mt: -1 }}>
              Log Call
            </Typography>
          </Grid>
          <Grid item md={2} sx={{ mt: 2 }}>
            <CallButtonAshIcon />
            <Typography variant="subtitle1" sx={{ mt: -1 }}>
              No response
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Box className={classes.wrapper}>
          <Box className={classes.question}>
            <Typography variant="subtitle2">Question 1</Typography>
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
            <Typography
              variant="body1"
              color="primary"
              onClick={handleStartCall}
            >
              See all questions
            </Typography>
          </Box>
        </Box>
        {endCall && <Comment />}
      </Box>

      <EndCallModal />
      <StartCallModal />
      <SuccessModal />
    </Card>
  );
}

export default Details;
