import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

import warningAnimation from 'assets/warning.gif';

import { Button, Modal } from 'shared';

import useModal from 'hooks/useModal';

import useStyles from 'modules/Admin/components/Campaign/Modal/DraftModal/styled.draftModal';

function DraftModal() {
  const classes = useStyles();
  const [state, setState] = useModal();
  const navigate = useNavigate();

  const handleExit = useCallback(() => {
    setState({ ...state, modalName: '' });
    navigate('/admin/campaign');
  }, [state]);

  const handleClose = useCallback(() => {
    setState({ ...state, modalName: '' });
  }, [state]);

  const handleSave = useCallback(() => {
    setState({
      ...state,
      modalName: 'successModal',
      message: 'Election Saved As Draft',
      redirect: 'The election details has been successfully saved as draft',
    });
    const closeModal = setTimeout(() => {
      navigate('/admin/campaign');
      clearTimeout(closeModal);
    }, 4000);
  }, [state]);

  return (
    <Modal modalName="draftModal">
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
        <Typography variant="h3">You have unsaved data!</Typography>
        <Typography variant="body1">
          If you exit you will lose unsaved data and this action can not be
          undone.
        </Typography>
      </Box>
      <Box className={classes.action}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button onClick={handleSave}>Save as draft</Button>
          </Grid>
          <Grid item>
            <Button variant="text" color="primary" onClick={handleExit}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
export default DraftModal;
