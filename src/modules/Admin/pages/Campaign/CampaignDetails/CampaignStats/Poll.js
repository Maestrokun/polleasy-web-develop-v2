import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types';

function Poll({ title, values, icon }) {
  return (
    <Box>
      <Box display="flex" flexDirection="column">
        <Grid item>
          <Typography variant="subtitle1">{title}</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            {values.map((value) => (
              <Grid item key={value}>
                <Grid container spacing={1}>
                  {icon && (
                    <Grid item>
                      <img src={value.img} alt="" />
                    </Grid>
                  )}
                  <Grid item>
                    <Typography>{value.text}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

Poll.propTypes = {
  title: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string),
  icon: PropTypes.bool,
};

Poll.defaultProps = {
  title: '',
  values: [],
  icon: false,
};

export default Poll;
