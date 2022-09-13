import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import successAnimation from 'assets/successAnimation.gif';

import { Modal } from 'shared';

import useModal from 'hooks/useModal';
import useDrawer from 'hooks/useDrawer';

import useStyles from 'modules/Admin/components/Settings/Modal/SuccessModal/styled.successModal';

function SuccessModal() {
  const classes = useStyles();
  const [state, setState] = useModal();
  const [drawer, setDrawer] = useDrawer();

  useEffect(() => {
    if (state.modalName === 'successModal') {
      const closeModal = setTimeout(() => {
        setState({ ...state, modalName: '', partyAdded: true });
        setDrawer({ ...drawer, drawerName: '' });
        clearTimeout(closeModal);
      }, state.redirectTime);
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
        <Typography variant="h3">{state.message} llll</Typography>
        <Typography variant="body1">{state.redirect}</Typography>
      </Box>
    </Modal>
  );
}
export default SuccessModal;
