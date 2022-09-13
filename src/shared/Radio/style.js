/* eslint-disable import/prefer-default-export */
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  radio: {
    '& .MuiRadio-root': {
      borderRadius: 3,
      // border: `1px solid ${theme.palette.border.primary}`,
      boxShadow: ' 0px 1px 0px rgba(22, 29, 37, 0.05)',
      boxSizing: 'border-box',
      height: 16,
      width: 16,
    },
    '& span.Mui-focused': {
      color: theme.palette.text.primary,
    },
    '& span': {
      margin: '4px 10px',
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
}));
