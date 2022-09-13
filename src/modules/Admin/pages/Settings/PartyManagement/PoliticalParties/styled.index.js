import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '& .topWrapper': {
      background: '#FFF',
      position: 'fixed',
      paddingBottom: '1em',
      paddingTop: '1em',
      width: '80%',
      zIndex: 4,
    },
    '& .MuiTypography-body1': {
      color: '#0050C8',
      padding: '0px !important',
    },
    '& .MuiTypography-h5': {
      color: '#393A4A !important',
    },
    '& a': {
      color: 'unset !important',
      textDecoration: 'none',
    },
  },
});

export default useStyles;
