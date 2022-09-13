/* eslint-disable */
import React from 'react';
// import { Grid, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CallGroup2 from 'assets/svg/CallGroup2.svg';
import { ReactComponent as FrameIcon } from 'assets/frame.svg';
// import { CircularProgressbar } from 'react-circular-progressbar';

function OverallRates({ children, values }) {
  return (
    <Grid container>
      <Grid item md={6}>
        {children}
      </Grid>
      <Grid item md={6}>
        {values.map((value) => (
          <Box sx={{ display: 'flex', alignItem: 'center', ml: 3 }}>
            <FrameIcon />
            <Box key={value.name} sx={{ ml: 2 }}>
              <Typography sx={{ marginBottom: '-30px', marginTop: '-20px' }}>
                {value.header}
              </Typography>
              <Typography sx={{ fontWeight: 'bolder' }}>
                {value.subtitle}
              </Typography>
            </Box>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
}

export default OverallRates;
