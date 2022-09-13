import React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
// import { ReactComponent as GreenCallIcon } from 'assets/greenCallIcon.svg';
import GreenCallIcon from 'assets/greenCallIcon.svg';

import { ReactComponent as EndCallIcon } from 'assets/endCallicon.svg';

function CallModal({ open, onClose, onAction, onContinue }) {
  setTimeout(() => {
    onContinue();
    onClose();
  }, 4000);
  return (
    <Dialog
      open={open}
      onClose={() => {
        onContinue(true);
        onClose();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Paper
        sx={{
          width: '400px',

          // padding: 4,
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '6px',
        }}
      >
        <DialogContent>
          <Box sx={{ cursor: 'pointer' }}>
            <img src={GreenCallIcon} alt="" />
            {/* <GreenCallIcon /> */}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DialogContentText id="alert-dialog-description">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography>calling</Typography>
                <Typography
                  sx={{ fontSize: '1rem', fontWeigth: 500, color: '#0050C8' }}
                >
                  Monad Mac Kene
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  End call to access to ist
                </Typography>
              </Box>
            </DialogContentText>
            <Box
              // component="button"
              onClick={onAction}
              sx={{ mt: 2, cursor: 'pointer' }}
            >
              <EndCallIcon />
            </Box>
          </Box>
        </DialogContent>
      </Paper>
    </Dialog>
  );
}

export default CallModal;

CallModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onAction: PropTypes.func,
  onContinue: PropTypes.func,
};

CallModal.defaultProps = {
  onAction: () => {},
  onClose: () => {},
  onContinue: () => {},
};
