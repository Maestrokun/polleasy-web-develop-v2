import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import useStyles from 'modules/Admin/pages/Campaign/CampaignDetails/CandidateDetails/styled.candidateDetails';

function CandidateOpposition({ data }) {
  const classes = useStyles();

  return (
    <Box>
      <Typography textTransform="uppercase">Opposition Details</Typography>
      {data?.opponents?.map((oppositionCandidate) => (
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          key={oppositionCandidate?.id}
          className={classes.opposition}
        >
          <Box>
            <Typography variant="subtitle1">
              {oppositionCandidate?.party?.name ?? 'N/A'}
            </Typography>
            <Typography variant="body2">{`${oppositionCandidate?.firstname} ${oppositionCandidate?.lastname}`}</Typography>
          </Box>
          <img
            src={oppositionCandidate?.party?.flag}
            alt="party logo"
            style={{ width: 32, height: 32 }}
          />
        </Stack>
      ))}
    </Box>
  );
}

CandidateOpposition.propTypes = {
  data: PropTypes.string.isRequired,
};

export default CandidateOpposition;
