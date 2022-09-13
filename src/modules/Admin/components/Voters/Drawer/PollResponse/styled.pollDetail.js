import { makeStyles } from '@mui/styles';

import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  root: {
    '& .MuiDivider-root': {
      padding: '2em 0px',
    },
  },
  topInfo: {
    background: '#DEECF9',
    padding: `${pxToRem(18)} ${pxToRem(24)}`,
    '& .MuiTypography-body1': {
      color: '#0A3E94',
    },
    '& .MuiTypography-subtitle1': {
      color: '#605E5C',
      paddingTop: '.8em',
    },
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
      width: 65,
      height: 65,
      background: '#4F6BED',
    },
  },
  bottomInfo: {
    position: 'fixed',
    overflowY: 'scroll',
    height: '60vh',
    top: 205,
    zIndex: -1,
    padding: `${pxToRem(24)} ${pxToRem(24)} ${pxToRem(2)}`,
    '& .MuiDivider-root': {
      margin: '1em 0px',
    },
    '& .MuiTypography-body2': {
      padding: '.8em 0px',
    },
  },
});

export default useStyles;
