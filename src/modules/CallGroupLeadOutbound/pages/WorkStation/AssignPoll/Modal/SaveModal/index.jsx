import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

import warningAnimation from 'assets/warning.gif';

import { Button, Modal } from 'shared';

import useModal from 'hooks/useModal';

import useStyles from 'modules/CallGroupLeadOutbound/pages/WorkStation/AssignPoll/Modal/SaveModal/styled.saveModal';

function SaveModal() {
  const classes = useStyles();
  const [state, setState] = useModal();
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    setState({ ...state, modalName: '' });
  }, [state]);

  const handleSave = useCallback(() => {
    setState({
      ...state,
      modalName: 'successModal',
      message: 'Poll Assigned Successfully',
      redirect: 'You will be redirected in 1s',
    });
    const closeModal = setTimeout(() => {
      navigate('/call-group-lead-outbound/workstation');
      clearTimeout(closeModal);
    }, 4000);
  }, [state]);

  return (
    <Modal modalName="saveModal">
      <Grid container justifyContent="flex-end" className={classes.close}>
        <Grid item>
          <CloseIcon onClick={handleClose} />
        </Grid>
      </Grid>
      <Box className={classes.copy}>
        <img
          src={warningAnimation}
          alt="warning icon"
          style={{ width: '20%' }}
        />
        <Typography variant="h3">{state.message}</Typography>
        <Typography variant="body1">{state.redirect}</Typography>
      </Box>
      <Box className={classes.action}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button onClick={handleSave}>Save</Button>
          </Grid>
          <Grid item>
            <Button variant="text" color="primary" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
export default SaveModal;
