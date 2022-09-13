import { makeStyles } from '@mui/styles';

import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  root: {
    '& .MuiDivider-root': {
      padding: '2em 0px',
    },
  },
  topInfo: {
    background: '#F2F7F9',
    padding: pxToRem(24),
    '& .status': {
      marginLeft: '.5em',
    },
    '& .MuiTypography-h5': {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 400,
    },
    '& img': {
      marginRight: '.5em',
    },
    '& .MuiAvatar-root': {
      width: 60,
      height: 60,
      background: '#4F6BED',
    },
  },
  bottomInfo: {
    padding: pxToRem(24),
    '& .MuiDivider-root': {
      margin: '1em 0px',
    },
  },
});

export default useStyles;
