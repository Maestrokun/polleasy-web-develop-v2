import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import useStyles from 'modules/Admin/components/CallGroup/TimeLine/styled.timeline';
import { format } from 'date-fns';

function TimeLine({ progress, startDate, endDate }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item sm={12}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          className={classes.progress}
        >
          <Grid item>
            <Typography variant="body1">Timeline</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="primary">
              {progress}%
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <LinearProgress
          value={progress}
          color="primary"
          variant="determinate"
        />
      </Grid>
      <Grid item sm={12} className={classes.date}>
        <Grid
          container
          justifyContent="space-between"
          className={classes.timeline}
        >
          <Grid item>
            <Typography fontSize={12} fontWeight={400} variant="body1">
              {format(new Date(startDate || new Date()), 'dd MMM, yyyy')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={12} fontWeight={400} variant="body1">
              {format(new Date(endDate || new Date()), 'dd MMM, yyyy')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TimeLine;

TimeLine.propTypes = {
  progress: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};
