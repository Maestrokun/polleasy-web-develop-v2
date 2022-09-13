import { Box, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

import EmptyCallCenter from 'assets/emptyCallCenter.svg';

function Empty({ title, description, onAddNewClick, icon: CustomeEmptyIcon }) {
  return (
    <Box
      textAlign="center"
      display="grid"
      sx={{
        placeItems: 'center',
        height: '65vh',
        justifyContent: 'center',
        marginTop: '10px',
      }}
    >
      <Box onClick={onAddNewClick} sx={{ cursor: 'pointer' }}>
        {CustomeEmptyIcon ? <CustomeEmptyIcon /> : <EmptyCallCenter />}
        <Box width={500} mb={2}>
          <Typography
            variant="h2"
            sx={{ fontWeight: 'bold', color: '#323130', py: 2 }}
          >
            {title}
          </Typography>
          <Typography variant="body1" sx={{ width: '40%', margin: 'auto' }}>
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

Empty.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onAddNewClick: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
};

export default Empty;
