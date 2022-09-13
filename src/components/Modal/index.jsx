import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import successAnimation from 'assets/successAnimation.gif';

import useModal from 'hooks/useModal';

import { Modal } from 'shared';

import useStyles from 'components/Modal/styled.modal';

function SuccessModal() {
  const classes = useStyles();
  const [state, setState] = useModal();

  useEffect(() => {
    if (state.modalName === 'passwordResetModal') {
      const closeModal = setTimeout(() => {
        setState({ ...state, modalName: '' });
        clearTimeout(closeModal);
      }, 4000);
    }
  }, [state]);

  return (
    <Modal modalName="passwordResetModal">
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
