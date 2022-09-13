import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import emptyStateIcon from 'assets/emptyState.gif';

function EmptyState() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <img
          src={emptyStateIcon}
          alt="emptyState"
          style={{ width: '200px', height: '200px' }}
        />
        <Typography sx={{ fontWeight: 500, fontSize: '18px' }}>
          No user selected
        </Typography>
        <Box sx={{ fontSize: '14px', color: '#6B6C7E' }}>
          Select a user from the side{' '}
        </Box>
        <Typography sx={{ fontSize: '14px', color: '#6B6C7E' }}>
          list to start
        </Typography>
      </Box>
    </Box>
  );
}

export default EmptyState;
