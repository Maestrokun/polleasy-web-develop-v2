import React, { useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

import warningAnimation from 'assets/warning.gif';

import { Button, Modal } from 'shared';

import useModal from 'hooks/useModal';

import useStyles from 'modules/Admin/components/Directory/Modal/ArchiveModal/styled.archiveModal';

function ArchiveModal() {
  const classes = useStyles();
  const [state, setState] = useModal();

  const handleClose = useCallback(() => {
    setState({ ...state, modalName: '' });
  }, [state]);

  const handleArchive = useCallback(() => {
    setState({
      ...state,
      modalName: 'successModal',
      message: 'Directory has been archive Successfully',
    });
  }, [state]);

  return (
    <Modal modalName="archiveModal">
      <Grid container justifyContent="flex-end" className={classes.close}>
        <Grid item>
          <CloseIcon onClick={handleClose} />
        </Grid>
      </Grid>
      <Box className={classes.copy}>
        <img
          src={warningAnimation}
          alt="warning icon"
          style={{ width: '20%' }}
        />
        <Typography variant="h3">Are you sure you want to archive?</Typography>
        <Typography variant="body1">
          If you archive this directory, you can unarchive later
        </Typography>
      </Box>
      <Box className={classes.action}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button onClick={handleClose}>Cancel</Button>
          </Grid>
          <Grid item>
            <Button variant="text" color="primary" onClick={handleArchive}>
              Yes, archive
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
export default ArchiveModal;
