import React, { useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

import endAnimation from 'assets/delete-icon-animation.gif';

import { Button, Modal } from 'shared';

import useModal from 'hooks/useModal';

import useStyles from 'modules/CallGroupAgent/components/WorkStation/Modal/EndCallModal/styled.endCallModal';

function EndCallModal() {
  const classes = useStyles();
  const [state, setState] = useModal();

  const handleClose = useCallback(() => {
    setState({ ...state, modalName: '' });
  }, [state]);

  const handleEndCalls = useCallback(() => {
    setState({
      ...state,
      modalName: 'successModal',
      message: 'Call Center Ended Successfully',
    });
  }, [state]);

  return (
    <Modal modalName="endCallModal">
      <Grid container justifyContent="flex-end" className={classes.close}>
        <Grid item>
          <CloseIcon onClick={handleClose} />
        </Grid>
      </Grid>
      <Box className={classes.copy}>
        <img src={endAnimation} alt="endcall icon" style={{ width: '20%' }} />
        <Typography variant="h3">
          Are you sure you want to End this call?
        </Typography>
        <Typography variant="body1">
          Before you end this call, select all options and add comment when
          needed
        </Typography>
      </Box>
      <Box className={classes.action}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button onClick={handleClose}>Cancel</Button>
          </Grid>
          <Grid item>
            <Button variant="text" color="primary" onClick={handleEndCalls}>
              Yes, end call
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
export default EndCallModal;
