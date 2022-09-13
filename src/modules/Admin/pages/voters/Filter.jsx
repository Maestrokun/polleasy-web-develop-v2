import React from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

import { TextField } from 'shared';

import { ReactComponent as LocationIcon } from 'assets/location_on.svg';
import { ReactComponent as BalloonIcon } from 'assets/balloon_icon.svg';
import { ReactComponent as FilterIcon } from 'assets/filter_list.svg';
import { ReactComponent as ReligionIcon } from 'assets/religion.svg';

import useStyles from 'modules/Admin/pages/voters/styled.voters';

function Filter() {
  const classes = useStyles();
  const { control } = useForm({});
  return (
    <Box className={classes.filterContainer}>
      <Box className="fixedLabel">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            padding: '0px 10px',
          }}
        >
          <Grid item>
            <Typography
              variant="body2"
              sx={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              Filter <FilterIcon style={{ paddingLeft: '.4em' }} />
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Reset</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.filterWrapper}>
        <Typography variant="subtitle2">
          Location <LocationIcon />
        </Typography>
        <Grid container spacing={4}>
          <Grid item sm={12}>
            <TextField select name="select" control={control} label="Zone">
              <MenuItem>select</MenuItem>
            </TextField>
          </Grid>
          <Grid item sm={12}>
            <TextField select name="select" control={control} label="State">
              <MenuItem>select</MenuItem>
            </TextField>
          </Grid>
          <Grid item sm={12}>
            <TextField
              select
              name="select"
              control={control}
              label="Senatorial District"
            >
              <MenuItem>select</MenuItem>
            </TextField>
          </Grid>
          <Grid item sm={12}>
            <TextField
              select
              name="select"
              control={control}
              label="Local Government"
            >
              <MenuItem>select</MenuItem>
            </TextField>
          </Grid>
          <Grid item sm={12}>
            <TextField select name="select" control={control} label="Ward">
              <MenuItem>select</MenuItem>
            </TextField>
          </Grid>
          <Grid item sm={12}>
            <TextField
              select
              name="select"
              control={control}
              label="Polling Unit"
            >
              <MenuItem>select</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.filterWrapper}>
        <Typography variant="subtitle2">
          Age <BalloonIcon />
        </Typography>
        <Grid container spacing={4}>
          <Grid item sm={6}>
            <TextField name="minAge" control={control} label="Min" />
          </Grid>
          <Grid item sm={6}>
            <TextField name="maxAge" control={control} label="Max" />
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.filterWrapper}>
        <Typography variant="subtitle2">
          Religion <ReligionIcon />
        </Typography>
        <Grid container spacing={4}>
          <Grid item sm={12}>
            <TextField
              select
              name="select"
              control={control}
              label="Click to select a religion"
            >
              <MenuItem>select</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Filter;
