import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiFormControl-root': {
      marginBottom: '2em',
    },
  },
  form: {
    padding: '20px',
    height: '80vh',
    overflowY: 'scroll',
  },
  searchBox: {
    width: '90%',
    margin: 'auto',
    '& .MuiTextField-root': {
      margin: '.7em 0px 1em',
    },
  },
}));

export default useStyles;
