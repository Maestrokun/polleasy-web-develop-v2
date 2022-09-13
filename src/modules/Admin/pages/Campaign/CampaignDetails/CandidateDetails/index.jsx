import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

import { Card } from 'shared';

import CandidateInfo from 'modules/Admin/pages/Campaign/CampaignDetails/CandidateDetails/CandidateInfo';
import CandidateParty from 'modules/Admin/pages/Campaign/CampaignDetails/CandidateDetails/CandidateParty';
import CandidateManager from 'modules/Admin/pages/Campaign/CampaignDetails/CandidateDetails/CandidateManager';
import CandidateOpposition from 'modules/Admin/pages/Campaign/CampaignDetails/CandidateDetails/CandidateOpposition';

import useStyles from 'modules/Admin/pages/Campaign/CampaignDetails/CandidateDetails/styled.candidateDetails';

function ElectCampaigns({ data }) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Card style={{ padding: '0px' }}>
        <Box sx={{ padding: '1rem' }}>
          <CandidateInfo data={data} />
          <Divider />
          <CandidateParty data={data} />
          <Divider />
          <CandidateManager data={data} />
          <CandidateOpposition data={data} />
        </Box>
        <Box className={classes.edit}>
          <Typography variant="body1" color="#0050C8 !important">
            Edit
            <ModeEditOutlinedIcon fontSize="small" />
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

ElectCampaigns.propTypes = {
  data: PropTypes.string.isRequired,
};

export default ElectCampaigns;
