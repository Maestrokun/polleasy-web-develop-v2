/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { Button } from 'shared';

import { createCampaign } from 'modules/Admin/services/campaigns';

import Oppositions from 'modules/Admin/pages/Campaign/AddNew/FormSteps/Preview/Oppositions';
import Summary from 'modules/Admin/pages/Campaign/AddNew/FormSteps/Preview/Summary';
import useStyles from 'modules/Admin/pages/Campaign/AddNew/FormSteps/Preview/styled.preview';

import useModal from 'hooks/useModal';

function Preview({
  getValues,
  oppositionDetails,
  candidateParty,
  payload,
  handleSubmit,
  handleView,
}) {
  const classes = useStyles();
  const [state, setState] = useModal();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/admin/campaign');
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h3">Preview</Typography>

      <Summary getValues={getValues} candidateParty={candidateParty} />
      <Oppositions oppositionDetails={oppositionDetails} />

      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        <Grid item>
          <Button className="btnCancel" onClick={handleCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={handleSubmit(handleView)}>Save &amp; Exit</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Preview;
