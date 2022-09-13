import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import successAnimation from 'assets/successAnimation.gif';

import useModal from 'hooks/useModal';
import useDrawer from 'hooks/useDrawer';

import { Modal } from 'shared';

import useStyles from 'modules/Admin/components/Agent/Modal/SuccessModal/styled.successModal';

function SuccessModal() {
  const classes = useStyles();
  const [modal, setModal] = useModal();
  const [drawer, setDrawer] = useDrawer();

  useEffect(() => {
    if (modal.modalName === 'voterUploadSuccessModal') {
      const closeModal = setTimeout(() => {
        setModal({ ...modal, modalName: '' });
        setDrawer({ ...drawer, drawerName: '' });
        clearTimeout(closeModal);
      }, 4000);
    }
  }, [modal]);

  return (
    <Modal modalName="voterUploadSuccessModal">
      <Box className={classes.copy}>
        <img
          src={successAnimation}
          alt="success icon"
          style={{ width: '14%' }}
        />
        <Typography variant="h3">{modal.message}</Typography>
        <Typography variant="body1">{modal.redirect}</Typography>
      </Box>
    </Modal>
  );
}
export default SuccessModal;
