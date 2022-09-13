import React, { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

import deleteIcon from 'assets/deleteIcon.gif';

import { Button, Modal } from 'shared';

import useModal from 'hooks/useModal';
import useAlert from 'hooks/useAlert';

import handleApiError from 'utils/handleApiError';

import useStyles from 'modules/Admin/components/PoliticalParties/Modal/DeleteModal/styled.deleteModal';

import { deletePoliticalParties } from 'modules/Admin/pages/Settings/services/politicalPartiesServices';

function DeleteModal() {
  const classes = useStyles();
  const [modal, setModal] = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { showNotification } = useAlert();
  const { mutateAsync } = useMutation(deletePoliticalParties);

  const handleClose = useCallback(() => {
    setModal({ ...modal, modalName: '' });
  }, [modal]);

  const handleDelete = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await mutateAsync(modal.id);
      if (response.status === 200) {
        setIsLoading(false);
        queryClient.invalidateQueries('getPoliticalParties');
        setModal({
          ...modal,
          modalName: 'successModal',
          message: 'Political Party Successfully Deleted',
          redirect: 'You will be redirected in 1s',
        });
      }
    } catch (error) {
      setIsLoading(false);
      showNotification?.(handleApiError(error), { type: 'error' });
    }
  }, [modal]);

  return (
    <Modal modalName="deletePoliticalParty">
      <Grid container justifyContent="flex-end" className={classes.close}>
        <Grid item>
          <CloseIcon onClick={handleClose} />
        </Grid>
      </Grid>
      <Box className={classes.copy}>
        <img src={deleteIcon} alt="delete icon" style={{ width: '20%' }} />
        <Typography variant="h3">Are you sure you want to delete?</Typography>
        <Typography variant="body1">
          After you delete it, you won&apos;t be able to recover it.
        </Typography>
      </Box>
      <Box className={classes.action}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button onClick={handleClose}>Cancel</Button>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              color="primary"
              onClick={handleDelete}
              disabled={isLoading}
            >
              Yes, delete
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
