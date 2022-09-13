import { makeStyles } from '@mui/styles';

import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  root: {},
  topInfo: {
    background: '#DEECF9',
    padding: `${pxToRem(18)} ${pxToRem(24)}`,
    '& .MuiTypography-body1': {
      color: '#323130',
      paddingBottom: '.3em',
      fontSize: pxToRem(20),
    },
    '& .MuiTypography-subtitle1': {
      color: '#605E5C',
      paddingTop: '.3em',
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
      width: 80,
      height: 80,
      background: '#4F6BED',
    },
  },
  bottomInfo: {
    position: 'fixed',
    overflowY: 'scroll',
    height: '60vh',
    top: 205,
    zIndex: -1,
    width: '450px',
    padding: `${pxToRem(40)} ${pxToRem(24)} ${pxToRem(2)}`,
    '& .MuiDivider-root': {
      margin: '0px',
    },
    '& .MuiTypography-body2': {
      padding: '.8em 0px',
    },
    '& .address, & .personalInfo, & .kinInfo, & .healthInfo': {
      '& .MuiTypography-body1': {
        color: '#6B6C7E',
        fontWeight: 700,
        padding: '4.0em 0px 1em',
      },
      '& .MuiTypography-body2': {
        color: '#393A4A',
        padding: '.3em 0px 1.5em',
      },
    },
  },
  information: {
    background: '#FFF',
    boxShadow:
      '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
    padding: '8px 22px',
  },
});

export default useStyles;
