import React, { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

import warningAnimation from 'assets/warning.gif';

import { Button, Modal } from 'shared';

import useModal from 'hooks/useModal';
import useAlert from 'hooks/useAlert';

import useStyles from 'modules/Admin/components/CallGroup/Modal/DeactivateModal/styled.deactivateModal';
import { useDeactivateCallGroup } from 'hooks/queries/useCallGroup';

function DeactivateModal() {
  const classes = useStyles();
  const [state, setState] = useModal();
  const { showNotification } = useAlert();
  const queryClient = useQueryClient();
  const { deactivateCallGroup, deactivatingCallGroup, isSuccess } =
    useDeactivateCallGroup({
      showNotification,
      queryClient,
      setModal: setState,
      callGroupId: state.id,
    });

  React.useEffect(() => {
    let timer = '';
    if (isSuccess) {
      timer = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          modalName: '',
        }));
      }, 4000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isSuccess]);

  const handleClose = useCallback(() => {
    setState({ ...state, modalName: '' });
  }, [state]);

  const handleDeactivation = () => {
    const payload = {
      status: 'DEACTIVATE',
    };

    deactivateCallGroup({ payload });
  };

  return (
    <Modal modalName="deactivateModal">
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
          Are you sure you want to deactivate?
        </Typography>
        <Typography variant="body1">
          If you deactivate this call center, you can reactivate later
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
              onClick={handleDeactivation}
              disabled={deactivatingCallGroup}
            >
              {deactivatingCallGroup ? 'Deactivating...' : 'Yes, deactivate'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
export default DeactivateModal;
