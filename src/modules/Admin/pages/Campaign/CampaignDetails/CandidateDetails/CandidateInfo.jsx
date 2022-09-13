import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

import nameInitial from 'utils/nameInitial';

import useStyles from 'modules/Admin/pages/Campaign/CampaignDetails/CandidateDetails/styled.candidateDetails';

function CandidateInfo({ data }) {
  const classes = useStyles();
  const firstName = data?.candidate?.firstname;
  const lastName = data?.candidate?.lastname;

  return (
    <Box className={classes.info}>
      <Grid container spacing={8} justifyContent="center" alignItems="center">
        <Grid item md={3}>
          <Avatar
            sx={{
              bgcolor: '#4F6BED',
              height: 32,
              width: 32,
              textTransform: 'uppercase',
              fontSize: 20,
              padding: 8,
            }}
          >
            {nameInitial(`${firstName} ${lastName}`)}
          </Avatar>
        </Grid>
        <Grid item md={9}>
          <Typography variant="h4" sx={{ my: 2 }}>
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography variant="body1" sx={{ my: 2 }}>
            Candidate
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

CandidateInfo.propTypes = {
  data: PropTypes.string.isRequired,
};

export default CandidateInfo;
