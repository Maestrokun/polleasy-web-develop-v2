import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactComponent as EmptyIcon } from 'assets/emptyCallCenter.svg';

function EmptyState({ title, message }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          position: 'absolute',
          transform: 'translate(100%, 30%)',
          left: '60%',
          width: 'max-content',
        }}
      >
        <EmptyIcon />
        <Typography variant="h4" sx={{ mt: 2 }}>
          {title}
        </Typography>
        <Typography
          sx={{ width: '100%', margin: '0px', textAlign: 'center', mt: 1 }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
}

export default EmptyState;

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
