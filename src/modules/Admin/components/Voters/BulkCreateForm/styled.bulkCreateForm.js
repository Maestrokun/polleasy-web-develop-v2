import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '88vh',
    width: '100%',
  },
  form: {
    marginTop: '10px',
    '& > *': {
      marginBottom: '22px',
    },
  },
}));

export default useStyles;
