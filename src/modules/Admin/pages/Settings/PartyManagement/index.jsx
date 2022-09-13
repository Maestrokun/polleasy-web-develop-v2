import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { Card } from 'shared';

import PARTY_MANAGEMENT from 'constant/partyManagement';

import useStyles from 'modules/Admin/pages/Settings/PartyManagement/styled.index';

function PartyManagement() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box>
        <Breadcrumbs sx={{ p: 0, mb: 5, mt: 5 }} style={{ color: '#6B6C7E' }}>
          <Link to="/admin/settings">
            <Typography
              sx={{ p: 0 }}
              variant="body1"
              style={{ color: '#6B6C7E' }}
            >
              Settings
            </Typography>
          </Link>
          <Typography
            sx={{ p: 0 }}
            variant="body2"
            style={{ color: '#393A4A' }}
          >
            Party Management
          </Typography>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={5}>
        {PARTY_MANAGEMENT.map((section) => (
          <Grid item key={section.title}>
            <Link to={section.path}>
              <Card>
                <Grid container justifyContent="space-between">
                  <Grid item md={8.2}>
                    <Typography variant="h5">{section.title}</Typography>
                    <Typography variant="subtitle1">
                      {section.subTitle}
                    </Typography>
                  </Grid>
                  <Grid item md={2}>
                    <img src={section.icon} alt="" />
                  </Grid>
                </Grid>
                <Grid
                  container
                  alignItems="flex-start"
                  className={classes.view}
                >
                  <Grid item>
                    <Typography variant="body1">click to manage</Typography>
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

export default PartyManagement;
