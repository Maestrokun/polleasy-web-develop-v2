import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  copy: {
    textAlign: 'center',
    padding: '5em 2em 1.5em',
    '& img': {
      marginBottom: '.4em',
    },
    '& .MuiTypography-body1': {
      width: '80%',
      margin: 'auto',
      padding: '1.5em 0px 2em',
      color: '#6B6C7E',
    },
  },
});

export default useStyles;
