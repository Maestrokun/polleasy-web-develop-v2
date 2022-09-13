/* eslint-disable */
import React, { useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

import deleteAnimation from 'assets/deleteIcon.gif';

import useModal from 'hooks/useModal';

import { Modal, Button } from 'shared';

import useStyles from 'modules/Admin/components/Campaign/Modal/DeleteModal/styled.deleteModal';

function DeleteModal({ handleDelete }) {
  const classes = useStyles();
  const [state, setState] = useModal();

  const handleClose = useCallback(() => {
    setState({ ...state, modalName: '' });
  }, [state]);

  return (
    <Modal modalName="deleteModal">
      <Grid container justifyContent="flex-end" className={classes.close}>
        <Grid item>
          <CloseIcon onClick={handleClose} />
        </Grid>
      </Grid>
      <Box className={classes.copy}>
        <img
          src={deleteAnimation}
          alt="warning icon"
          style={{ width: '20%' }}
        />
        <Typography variant="h3">Are you sure you want to delete?</Typography>
        <Typography variant="body1">
          After you delete it, you won&apos;t be able to recover it
        </Typography>
      </Box>
      <Box className={classes.action}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button onClick={handleClose}>Cancel</Button>
          </Grid>
          <Grid item>
            <Button variant="text" color="primary" onClick={handleDelete}>
              Yes, delete
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
export default DeleteModal;
