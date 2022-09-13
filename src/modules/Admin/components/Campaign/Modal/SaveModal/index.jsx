/* eslint-disable */
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

import folderAnimation from 'assets/folder.gif';

import { Button, Modal } from 'shared';

import useModal from 'hooks/useModal';
import useAlert from 'hooks/useAlert';

import useStyles from 'modules/Admin/components/Campaign/Modal/SaveModal/styled.saveModal';

import { createCampaign } from 'modules/Admin/services/campaigns';

function SaveModal() {
  const classes = useStyles();
  const [state, setState] = useModal();
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(createCampaign);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useAlert();

  const handleClose = useCallback(() => {
    setState({ ...state, modalName: '' });
  }, [state]);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await mutateAsync(state?.data);
      if (response.status === 201) {
        setIsLoading(false);
        setState({
          ...state,
          modalName: 'successModal',
          message: 'Campaign Saved Successfully',
          redirect: 'You will be redirected to campaign page',
        });
        const closeModal = setTimeout(() => {
          navigate('/admin/campaign');
          clearTimeout(closeModal);
        }, 4000);
      }
    } catch (error) {
      setIsLoading(false);
      showNotification?.(error?.response?.data?.errors?.manager, {
        type: 'error',
      });
      setState({ ...state, modalName: '' });
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
          src={folderAnimation}
          alt="warning icon"
          style={{ width: '20%' }}
        />
        <Typography variant="h3">{state.message}</Typography>
        <Typography variant="body1">{state.redirect}</Typography>
      </Box>
      <Box className={classes.action}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <CircularProgress size={25} sx={{ color: 'white' }} />
              ) : (
                'Save'
              )}
            </Button>
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
