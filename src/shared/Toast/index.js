/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import ErrorIcon from '@mui/icons-material/Error';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      width: '80%',
      margin: 'auto',
      background: '#FEEFEF',
      color: '#DA1414',
      justifyContent: 'center',
      border: '1px solid #DA1414',
    },
    '& .MuiSvgIcon-root': {
      color: '#DA1414',
      '& > *': {
        background: 'red',
      },
    },
  },
});

function Toast({ message }) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Alert
        icon={<ErrorIcon fontSize="small" />}
        severity="error"
        variant="outlined"
      >
        <Typography variant="body1">{message}</Typography>
      </Alert>
    </Box>
  );
}

export default Toast;

Toast.propTypes = {
  message: PropTypes.string.isRequired,
};
