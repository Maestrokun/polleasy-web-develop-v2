import React, { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

import warningAnimation from 'assets/warning.gif';

import { Button, Modal } from 'shared';

import useModal from 'hooks/useModal';
import useAlert from 'hooks/useAlert';

import { updateStatus } from 'modules/Admin/services/campaigns';

import handleApiError from 'utils/handleApiError';

import useStyles from 'modules/Admin/components/Agent/Modal/DeactivateModal/styled.deactivateModal';

function DeactivateModal() {
  const classes = useStyles();
  const { showNotification } = useAlert();
  const [modal, setModal] = useModal();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(updateStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = useCallback(() => {
    setModal({ ...modal, modalName: '' });
  }, [modal]);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await mutateAsync({ id: modal.id, status: modal.data });
      setIsLoading(false);
      queryClient.invalidateQueries(['view-campaigns']);
      setModal({ ...modal, modalName: '' });
      showNotification?.(response?.data?.message, { type: 'success' });
    } catch (error) {
      setIsLoading(false);
      showNotification?.(handleApiError(error), { type: 'error' });
    }
  };

  return (
    <Modal modalName="campaignDeactivateModal">
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
          Are you sure you want to deactivate this Campaign?
        </Typography>
        <Typography variant="body1">
          If you deactivate, you will be able to activate this Campaign in the
          Campaign page.
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
              {isLoading ? 'Deactivating' : 'Yes, deactivate'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default DeactivateModal;
