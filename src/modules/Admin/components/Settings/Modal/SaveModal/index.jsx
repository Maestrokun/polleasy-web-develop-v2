import React, { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

import warningAnimation from 'assets/warning.gif';

import { Button, Modal } from 'shared';

import useModal from 'hooks/useModal';
import useAlert from 'hooks/useAlert';

import handleApiError from 'utils/handleApiError';

import useStyles from 'modules/Admin/components/Settings/Modal/SaveModal/styled.saveModal';

import { createParty } from 'modules/Admin/pages/Settings/services';

function SaveModal() {
  const classes = useStyles();
  const [state, setState] = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useAlert();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(createParty);

  const handleClose = useCallback(() => {
    setState({ ...state, modalName: '' });
  }, [state]);

  const { handleSubmit } = useForm({
    defaultValues: {
      partyname: '',
      partyalias: '',
    },
  });

  const handleSave = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await mutateAsync(state.data);

      if (response && response.data.success) {
        setIsLoading(false);
        queryClient.invalidateQueries('executiveParty');
        setState({
          ...state,
          modalName: 'successModal',
          message: 'Party Structure created Successfully',
          redirect: 'You will be redirected in 1s',
        });
      }

      const closeModal = setTimeout(() => {
        navigate('/admin/settings/party-management/view-executives');
        clearTimeout(closeModal);
      }, 4000);
    } catch (error) {
      showNotification?.(handleApiError(error), { type: 'error' });
    }
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
            <Button onClick={handleSubmit(handleSave)}>Save</Button>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              color="primary"
              disabled={isLoading}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
export default SaveModal;
