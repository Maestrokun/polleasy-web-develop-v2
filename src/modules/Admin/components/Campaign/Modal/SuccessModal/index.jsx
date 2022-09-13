import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import successAnimation from 'assets/successAnimation.gif';

import useModal from 'hooks/useModal';
import useDrawer from 'hooks/useDrawer';

import { Modal } from 'shared';

import useStyles from 'modules/Admin/components/Campaign/Modal/SuccessModal/styled.successModal';

function SuccessModal() {
  const classes = useStyles();
  const [state, setState] = useModal();
  const [drawer, setDrawer] = useDrawer();

  useEffect(() => {
    if (state.modalName === 'successModal') {
      const closeModal = setTimeout(() => {
        setState({ ...state, modalName: '' });
        setDrawer({ ...drawer, drawerName: '' });
        clearTimeout(closeModal);
      }, 4000);
    }
  }, [state]);

  return (
    <Modal modalName="successModal">
      <Box className={classes.copy}>
        <img
          src={successAnimation}
          alt="success icon"
          style={{ width: '14%' }}
        />
        <Typography variant="h3">{state.message}</Typography>
        <Typography variant="body1">{state.redirect}</Typography>
      </Box>
    </Modal>
  );
}
export default SuccessModal;
