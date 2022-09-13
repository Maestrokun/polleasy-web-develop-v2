import React, { useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

import warningAnimation from 'assets/warning.gif';

import { Button, Modal } from 'shared';

import useModal from 'hooks/useModal';

import useStyles from 'modules/CallGroupAgent/components/WorkStation/Modal/StartCallModal/styled.startModal';

function StartCallModal() {
  const classes = useStyles();
  const [state, setState] = useModal();

  const handleStop = useCallback(() => {
    setState({ ...state, modalName: '' });
  }, [state]);

  const handleStart = useCallback(() => {
    setState({
      ...state,
      modalName: 'successModal',
      message: 'Your call has started Successfully',
    });
  }, [state]);

  return (
    <Modal modalName="startCallModal">
      <Grid container justifyContent="flex-end" className={classes.close}>
        <Grid item>
          <CloseIcon onClick={handleStart} />
        </Grid>
      </Grid>
      <Box className={classes.copy}>
        <img
          src={warningAnimation}
          alt="warning icon"
          style={{ width: '20%' }}
        />
        <Typography variant="h3">Do you want to start this call?</Typography>
        <Typography variant="body1">
          Before you begin this call, the respondant must have accepted your
          call
        </Typography>
      </Box>
      <Box className={classes.action}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button onClick={handleStart}>Start Call</Button>
          </Grid>
          <Grid item>
            <Button variant="text" color="primary" onClick={handleStop}>
              No, dont
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
export default StartCallModal;
