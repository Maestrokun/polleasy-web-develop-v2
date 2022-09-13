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

import { resendToken } from 'modules/Admin/services/userManagement';

import handleApiError from 'utils/handleApiError';

import useStyles from 'modules/Admin/components/Agent/Modal/RemoveModal/styled.removeModal';

function DeactivateModal() {
  const classes = useStyles();
  const { showNotification } = useAlert();
  const [modal, setModal] = useModal();
  const queryClient = useQueryClient();
  const { mutate: resendMutate, isLoading } = useMutation(
    ({ payload }) => resendToken({ id: modal.id, payload }),
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
          message: 'Token has been resent',
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
      status: 'RESEND',
      email: modal.actionValue?.email,
    };
    resendMutate({
      payload,
    });
  };

  return (
    <Modal modalName="resendModal">
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
          Are you sure you want to resend token this Agent?
        </Typography>
        <Typography variant="body1">
          If you resend token, you will be able to activate this agent in the
          Agents page.
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
              {isLoading ? 'Resending' : 'Yes, Resend'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default DeactivateModal;
