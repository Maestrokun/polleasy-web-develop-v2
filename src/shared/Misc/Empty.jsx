import { Box, Typography, Button } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as EmptyIcon } from 'assets/svg/emptyTable.svg';

function Empty({
  title,
  description,
  onAddNewClick,
  btnVariant,
  icon: CustomeEmptyIcon,
}) {
  return (
    <Box
      textAlign="center"
      display="grid"
      sx={{ placeItems: 'center', height: '65vh' }}
    >
      <Box>
        {CustomeEmptyIcon ? <CustomeEmptyIcon /> : <EmptyIcon />}
        <Box width={500} mb={2}>
          <Typography
            variant="body1"
            color="textPrimary"
            sx={{ fontWeight: 'bold' }}
          >
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {description}
          </Typography>
        </Box>
        {onAddNewClick ? (
          <Button
            variant={btnVariant || 'text'}
            color="primary"
            onClick={onAddNewClick}
            sx={{ border: 'none', textTransform: 'capitalize' }}
          >
            Add new
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}

Empty.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onAddNewClick: PropTypes.func.isRequired,
  btnVariant: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default Empty;
