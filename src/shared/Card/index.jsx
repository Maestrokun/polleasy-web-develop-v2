import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import useStyles from 'shared/Card/styled.card';

function Card({ children, style }) {
  const classes = useStyles();

  return (
    <Box className={classes.root} style={{ ...style }}>
      {children}
    </Box>
  );
}

export default Card;

Card.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
};

Card.defaultProps = {
  style: {},
};
