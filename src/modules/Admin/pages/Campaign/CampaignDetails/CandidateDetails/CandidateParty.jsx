import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import useStyles from 'modules/Admin/pages/Campaign/CampaignDetails/CandidateDetails/styled.candidateDetails';

function CandidateParty({ data }) {
  const classes = useStyles();
  return (
    <Box className={classes.party}>
      <Typography variant="body1" textTransform="uppercase">
        Party Details
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box className="row">
          <Typography variant="subtitle1">Party Name</Typography>
          <Typography variant="body2">{data?.candidate_party?.name}</Typography>
        </Box>
        <img
          src={data?.candidate_party?.flag}
          alt="party logo"
          style={{ width: 32, height: 32 }}
        />
      </Stack>
      <Box className="row">
        <Typography variant="subtitle1">Party Alias</Typography>
        <Typography variant="body2">{data?.candidate_party?.alias}</Typography>
      </Box>
    </Box>
  );
}

CandidateParty.propTypes = {
  data: PropTypes.string.isRequired,
};

export default CandidateParty;
