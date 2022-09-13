/* eslint-disable */
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import useStyles from 'modules/Admin/pages/Campaign/AddNew/FormSteps/Preview/styled.preview';

import { Card } from 'shared';

import PartyFlag from 'assets/partyFlag.svg';

import { CAMPAIGN_TYPES } from 'constant/electionData';

function Summary({ getValues, candidateParty }) {
  const classes = useStyles();

  return (
    <Card>
      <Grid container>
        <Grid item md={12}>
          <Typography
            component="span"
            color="primary"
            variant="subtitle1"
            className={classes.post}
          >
            {CAMPAIGN_TYPES[getValues('campaignType')]}
          </Typography>
          <Typography
            component="span"
            variant="subtitle1"
            className={classes.year}
          >
            {getValues('year')}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h4" className={classes.header}>
            {getValues('campaignName')}
          </Typography>
          <Typography className={classes.description} variant="subtitle1">
            {getValues('description')}
          </Typography>
        </Grid>
        <Grid item sm={12} sx={{ my: 3 }}>
          <Divider />
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="flex-start"
        spacing={12}
        className={classes.info}
      >
        <Grid item className={classes.name}>
          <Typography variant="subtitle1">Candidate Name</Typography>
          <Typography variant="body2">
            {JSON.parse(getValues('candidate'))?.firstname}{' '}
            {JSON.parse(getValues('candidate'))?.lastname}
          </Typography>
        </Grid>
        <Grid item style={{ height: '85px' }}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item className={classes.party}>
          <Grid container spacing={1}>
            <Grid item>
              <img
                src={candidateParty?.flag}
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'contain',
                }}
                alt="Party flag"
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                {candidateParty?.alias}
              </Typography>
              <Typography variant="body2">{candidateParty?.name}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ my: 3 }}>
        <Grid item sm={12}>
          <Divider />
        </Grid>
      </Grid>
      <Grid container className={classes.manager}>
        <Grid item>
          <Typography variant="body2">
            Campaign Manager:
            <Typography color="primary" component="span">
              {JSON.parse(getValues('manager'))?.firstname}{' '}
              {JSON.parse(getValues('manager'))?.lastname}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Summary;
