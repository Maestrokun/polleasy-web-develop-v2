import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import useStyles from 'modules/Admin/components/Campaign/Timeline/styled.timline';

function Timeline({ progress, startDate, endDate }) {
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
            <Typography variant="body1">{startDate}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{endDate}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Timeline;

Timeline.propTypes = {
  progress: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};
