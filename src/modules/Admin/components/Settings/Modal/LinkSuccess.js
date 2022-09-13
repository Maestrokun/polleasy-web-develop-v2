import React from 'react';
import { Dialog, DialogContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function LinkSuccess({ content, open, setOpen, onClose, icon, title }) {
  setTimeout(() => {
    setOpen('');
  }, 2000);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: 0, padding: '3%' } }}
    >
      <DialogContent sx={{ pb: 0, overflowY: 'unset', textAlign: 'center' }}>
        <img src={icon} alt="success" className="img" height={74} width={74} />
        <Typography
          sx={{ fontSize: '18px', color: '#1E0A3C ', fontWeight: '500' }}
        >
          {content}
        </Typography>
        <Typography sx={{ fontSize: '14px', color: '#6B6C7E' }}>
          <span style={{ fontWeight: '500', color: '#1E0A3C ' }}>{title}</span>{' '}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

LinkSuccess.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  open: PropTypes.bool,
  icon: PropTypes.bool,
  onClose: PropTypes.bool,
  setOpen: PropTypes.func,
};

LinkSuccess.defaultProps = {
  title: '',
  content: '',
  open: false,
  icon: false,
  onClose: false,
  setOpen: null,
};

export default LinkSuccess;
