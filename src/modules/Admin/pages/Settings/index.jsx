import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { Card } from 'shared';

import SETTINGS from 'constant/settings';

import useStyles from 'modules/Admin/pages/Settings/styled.index';

function Settings() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="body2">Settings</Typography>
      </Box>
      <Grid container spacing={5}>
        {SETTINGS.map((setting) => (
          <Grid item key={setting.title}>
            <Link to={setting.path}>
              <Card>
                <Grid container justifyContent="space-between">
                  <Grid item md={8.2}>
                    <Typography variant="h5">{setting.title}</Typography>
                    <Typography variant="subtitle1">
                      {setting.subTitle}
                    </Typography>
                  </Grid>
                  <Grid item md={2}>
                    <img src={setting.icon} alt="" />
                  </Grid>
                </Grid>
                <Grid
                  container
                  alignItems="flex-start"
                  className={classes.view}
                >
                  <Grid item>
                    <Typography variant="body1">Click to manage</Typography>
                  </Grid>
                  <Grid item>
                    <ChevronRightIcon fontSize="small" />
                  </Grid>
                </Grid>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Settings;
