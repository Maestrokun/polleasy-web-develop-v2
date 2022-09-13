/* eslint-disable */

import { createTheme } from '@mui/material/styles';
import { pxToRem } from 'utils/formatFont';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';

let themeInstance = createTheme({});

themeInstance = createTheme({
  components: {
    MuiOutlinedInput: {
      defaultProps: {
        size: 'small',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          '& .Mui-disabled': {
            backgroundColor: '#F1F2F6',
          },
        },
        sizeSmall: {
          height: 48,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableTouchRipple: true,
        disableFocusRipple: true,
        variant: 'contained',
        disableElevation: true,
        color: 'primary',
        fullWidth: true,
        size: 'medium',
      },
      styleOverrides: {
        root: {
          borderRadius: '4px',
          color: '#fff',
          fontSize: pxToRem(14),
          textTransform: 'capitalize',
          fontFamily: "'Ubuntu', sans-serif",
          marginRight: '4px',
          '& .MuiCircularProgress-root': {
            marginLeft: '4px',
          },
        },
      },
    },
  },
  card: {
    bg: '#F8F7FA',
  },
  palette,
  typography,
  breakpoints,
  spacing: (factor) => `${0.25 * factor}rem`,
});

const theme = { ...themeInstance };

export default theme;
