import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

import warningAnimation from 'assets/warning.gif';

import { Button, Modal } from 'shared';

import useModal from 'hooks/useModal';

import useStyles from 'modules/Admin/components/Campaign/Modal/EditModal/styled.editModal';

function EditModal() {
  const classes = useStyles();
  const [state, setState] = useModal();
  const navigate = useNavigate();

  const handleExit = useCallback(() => {
    setState({ ...state, modalName: '' });
    navigate('/admin/campaign/view/:id');
  }, [state]);

  const handleClose = useCallback(() => {
    setState({ ...state, modalName: '' });
  }, [state]);

  const handleEdit = useCallback(() => {
    navigate('/admin/campaign/add-new');
  });

  return (
    <Modal modalName="editModal">
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
        <Typography variant="h3">Are you sure you want to Edit!</Typography>
        <Typography variant="body1">
          You are about to edit the details of a campaign This changes the
          campaign details.
        </Typography>
      </Box>
      <Box className={classes.action}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button onClick={handleExit}>Cancel</Button>
          </Grid>
          <Grid item>
            <Button variant="text" color="primary" onClick={handleEdit}>
              Yes, Edit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
export default EditModal;
