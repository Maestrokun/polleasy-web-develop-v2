/* eslint-disable  */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Box sx={{ width: '50%', mx: 'auto', mt: 4, textAlign: 'center' }}>
          <Typography variant="subtitle2">
            Oopps, Something went wrong.
          </Typography>
          <Typography variant="subtitle1">
            Please check your internet connection or refresh page
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
