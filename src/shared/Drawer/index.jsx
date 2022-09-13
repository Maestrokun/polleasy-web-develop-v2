import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { Drawer as MuiDrawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

import useDrawer from 'hooks/useDrawer';

import useStyles from 'shared/Drawer/styled.drawer';

import { Button } from 'shared';

function Drawer({
  anchor,
  titleText,
  primaryButton,
  secondaryButton,
  handleSubmit,
  drawerName,
  children,
  isSubmitting,
  onClose,
  additionalNode,
}) {
  const classes = useStyles();
  const [state, setState] = useDrawer();

  const handleCloseDrawer = () => {
    setState({ ...state, drawerName: '', data: null });
  };

  return (
    <Box className={classes.root}>
      <MuiDrawer
        anchor={anchor}
        open={state.drawerName === drawerName}
        onClose={handleCloseDrawer}
        className={classes.drawer}
      >
        <Box className={classes.header}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={5}
          >
            <Grid item>
              <Typography variant="h3">{titleText}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleCloseDrawer}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Box width="100%">{additionalNode}</Box>
        </Box>
        {children}
        <Grid
          container
          spacing={4}
          justifyContent="flex-end"
          alignItems="center"
          className={primaryButton || secondaryButton ? classes.btn : ''}
        >
          {primaryButton && (
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <Box className={classes.progressWrapper}>
                    <CircularProgress size={20} sx={{ color: '#fff' }} />
                  </Box>
                ) : (
                  primaryButton
                )}
              </Button>
            </Grid>
          )}
          {secondaryButton && (
            <Grid item>
              <Button
                variant="text"
                onClick={() => {
                  handleCloseDrawer();
                  onClose();
                }}
              >
                {secondaryButton}
              </Button>
            </Grid>
          )}
        </Grid>
      </MuiDrawer>
    </Box>
  );
}

Drawer.propTypes = {
  anchor: PropTypes.string,
  drawerName: PropTypes.string,
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func,
  titleText: PropTypes.string.isRequired,
  primaryButton: PropTypes.string,
  secondaryButton: PropTypes.string,
  isSubmitting: PropTypes.bool,
  onClose: PropTypes.func,
  additionalNode: PropTypes.node,
};

Drawer.defaultProps = {
  anchor: 'right',
  drawerName: '',
  primaryButton: '',
  secondaryButton: '',
  handleSubmit: () => {},
  isSubmitting: false,
  onClose: () => {},
  additionalNode: '',
};

export default Drawer;
