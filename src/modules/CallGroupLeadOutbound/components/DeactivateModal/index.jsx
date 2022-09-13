import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import warningAnimation from 'assets/warning.gif';

import { Button, Modal } from 'shared';
import useStyles from 'modules/Admin/components/Agent/Modal/DeactivateModal/styled.deactivateModal';

function DeactivateModal() {
  const classes = useStyles();

  return (
    <Modal modalName="agentDeactivateModal">
      <Box className={classes.copy}>
        <img
          src={warningAnimation}
          alt="warning icon"
          style={{ width: '20%' }}
        />
        <Typography variant="h3">
          Are you sure you want to deactivate this Agent?
        </Typography>
        <Typography variant="body1">
          If you deactivate, you will be able to activate this agent in the
          Agents page.
        </Typography>
      </Box>
      <Box className={classes.action}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button>Cancel</Button>
          </Grid>
          <Grid item>
            <Button variant="text" color="primary">
              Deactivating
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default DeactivateModal;
