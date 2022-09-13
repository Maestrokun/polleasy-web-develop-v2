import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function AlertRef(props, ref) {
  return <MuiAlert ref={ref} variant="outlined" {...props} />;
}

const Alert = React.forwardRef(AlertRef);

const NotificationContext = createContext({});

function RenderSnack({ id, message, open, type, handleClose }) {
  const messageId = `message-${id}`;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 999999 }}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': messageId,
      }}
      message={<span id={messageId}>{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={handleClose}
        >
          x
        </IconButton>,
      ]}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{
          width: '100%',
          backgroundColor: (theme) => theme.palette[type].light,
          borderSize: '1px',
          borderColor: (theme) => theme.palette[type].main,
          borderRadius: '4px',
          color: '#FFF',
          '& .MuiAlert-icon': {
            color: (theme) => theme.palette[type].dark,
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

const uniqueId = 2;

function NotificationProvider({ children }) {
  const [state, setState] = useState({ current: null, queue: [] });

  const { current, queue } = useMemo(() => state, [state]);

  const showNotification = (message, options) => {
    const id = uniqueId + 1;
    const snack = { id, message, open: true, options };

    if (current) {
      setState({ current, queue: queue.concat(snack) });
    } else {
      setState({ queue, current: snack });
    }

    return id;
  };

  function openNext() {
    if (queue.length) {
      setState({ current: queue[0], queue: queue.slice(1) });
    } else {
      setState({ current: null, queue: [] });
    }
  }

  function handleClose() {
    setState((currentState) => ({
      ...currentState,
      current: { ...currentState.current, open: false },
    }));
    // time to snack close animation
    setTimeout(openNext, 1000);
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <NotificationContext.Provider value={{ showNotification }}>
      {current && (
        <RenderSnack
          key={current.id}
          {...current}
          type={current?.options?.type}
          // eslint-disable-next-line react/jsx-no-bind
          handleClose={handleClose}
        />
      )}
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationProvider };
export default NotificationContext;

RenderSnack.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
