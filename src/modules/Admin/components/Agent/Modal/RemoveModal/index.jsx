import React, { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

import warningAnimation from 'assets/warning.gif';

import { Button, Modal } from 'shared';

import useModal from 'hooks/useModal';
import useAlert from 'hooks/useAlert';

import { removeUser } from 'modules/Admin/services/userManagement';

import handleApiError from 'utils/handleApiError';

import useStyles from 'modules/Admin/components/Agent/Modal/RemoveModal/styled.removeModal';

function DeactivateModal() {
  const classes = useStyles();
  const { showNotification } = useAlert();
  const [modal, setModal] = useModal();
  const queryClient = useQueryClient();

  const { mutate: removeMutate, isLoading } = useMutation(
    ({ payload }) => removeUser({ id: modal.id, payload }),
    {
      onError: (err) => {
        showNotification?.(handleApiError(err), { type: 'error' });
      },
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        queryClient.invalidateQueries('userStats');
        setModal({
          ...modal,
          modalName: 'agentSuccessModal',
          message: 'Personnel invite removed successfully',
          redirect: 'You will be redirected to Agent page',
        });
      },
    }
  );

  const handleClose = useCallback(() => {
    setModal({ ...modal, modalName: '' });
  }, [modal]);

  const onSubmit = () => {
    const payload = {
      status: 'REMOVE',
    };
    removeMutate({
      payload,
    });
  };

  return (
    <Modal modalName="removeModal">
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
        <Typography variant="h3">
          Are you sure you want to Remove this Agent?
        </Typography>
        <Typography variant="body1">
          You are about to remove thispersonnel invite. This makes the campaign
          and its polls unavailable
        </Typography>
      </Box>
      <Box className={classes.action}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button onClick={handleClose}>Cancel</Button>
          </Grid>
          <Grid item>
            <Button
              loading={isLoading}
              variant="text"
              color="primary"
              onClick={onSubmit}
            >
              {isLoading ? 'Removing' : 'Yes, Remove'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default DeactivateModal;
