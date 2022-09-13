import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '& .MuiTypography-h5': {
      color: '#272833',
    },
    '& .MuiTypography-subtitle1': {
      color: '#6B6C7E',
      padding: '.5em 0px 1.5em',
    },
    '& .MuiTypography-body2': {
      padding: '2em 0px',
    },
    '& .MuiTypography-body1': {
      paddingBottom: '0em !important',
      paddingTop: '0px !important',
      color: '#0050C8',
    },
    '& a': {
      textDecoration: 'unset',
      color: 'unset',
    },
    '& .MuiSvgIcon-root': {
      color: '#0050C8',
    },
  },
});

export default useStyles;
