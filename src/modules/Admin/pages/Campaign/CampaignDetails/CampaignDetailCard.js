import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import useStyles from 'modules/Admin/pages/Campaign/CampaignDetails/CandidateDetails/styled.candidateDetails';

function CampaignDetailCard({ data }) {
  const classes = useStyles();
  return (
    <Box className={classes.info} sx={{ pb: 5, mb: 8 }}>
      <Stack direction="row">
        <Typography variant="subtitle2">{data?.type}</Typography>
        <Typography variant="subtitle2">{data?.election_year}</Typography>
      </Stack>
      <Typography variant="h2" sx={{ my: 2 }}>
        {data?.name}
      </Typography>
      <Typography>{data?.description}</Typography>
    </Box>
  );
}

CampaignDetailCard.propTypes = {
  data: PropTypes.string.isRequired,
};

export default CampaignDetailCard;
