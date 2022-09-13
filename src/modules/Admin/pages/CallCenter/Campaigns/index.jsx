import React from 'react';
import Box from '@mui/material/Box';

import CampaignCard from 'modules/Admin/components/CallCenter/CampaignCard';

import CAMPAIGNS from 'constant/campaigns';

import useStyles from 'modules/Admin/pages/CallCenter/Campaigns/styled.campaign';

function Campaigns() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {CAMPAIGNS.map((campaign) => (
        <CampaignCard campaign={campaign} key={campaign.id} />
      ))}
    </Box>
  );
}

export default Campaigns;
