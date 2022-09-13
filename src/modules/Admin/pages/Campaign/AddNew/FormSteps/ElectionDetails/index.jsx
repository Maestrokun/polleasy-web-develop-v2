import React from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { TextField, Button } from 'shared';

import { ELECTION_TYPE, ELECTION_YEAR } from 'constant/electionData';

import useElectionStepper from 'hooks/useCampaignStepper';

import useStyles from 'modules/Admin/pages/Campaign/AddNew/FormSteps/ElectionDetails/styled.electionDetails';

function ElectionDetails() {
  const classes = useStyles();
  const { control } = useForm({});
  const { handleNext } = useElectionStepper();

  return (
    <Box className={classes.root}>
      <Typography variant="h3">Campaign Details</Typography>
      <form>
        <TextField control={control} label="Election Name" name="name" />
        <TextField select control={control} name="type" label="Election Type">
          {ELECTION_TYPE.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField select control={control} name="year" label="Election Year">
          {ELECTION_YEAR.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          control={control}
          label="Election Description"
          name="description"
          multiline
        />
        <Typography variant="h5">Campaign Manager</Typography>
        <TextField control={control} label="Full Name" name="fullName" />
        <TextField
          control={control}
          label="Email Address"
          type="email"
          name="email"
        />
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Grid item>
            <Button className="btnCancel">Cancel</Button>
          </Grid>
          <Grid item>
            <Button onClick={handleNext}>Next</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default ElectionDetails;
