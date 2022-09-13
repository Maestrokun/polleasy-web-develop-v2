import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function CandidateManager({ data }) {
  return (
    <Box mb={10}>
      <Typography variant="body1" textTransform="uppercase" mb={2}>
        Campaign Manager
      </Typography>
      <Typography variant="body2">
        {`${data?.manager?.firstname} ${data?.manager?.lastname}`}
      </Typography>
    </Box>
  );
}

CandidateManager.propTypes = {
  data: PropTypes.string.isRequired,
};

export default CandidateManager;
