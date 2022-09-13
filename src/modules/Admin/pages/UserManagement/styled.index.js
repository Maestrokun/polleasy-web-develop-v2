import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '& .topWrapper': {
      background: '#FFF',
      position: 'fixed',
      paddingBottom: '1em',
      paddingTop: '2em',
      width: '80%',
      zIndex: 4,
    },
    '& .MuiTypography-body1': {
      color: '#6B6C7E',
      padding: '0px !important',
    },
    '& .MuiTypography-h3': {
      color: '#393A4A !important',
    },
    '& a': {
      color: 'unset !important',
    },
  },
  card: {
    height: '100px',
    background: '#FAF9FB',
  },
});

export default useStyles;
