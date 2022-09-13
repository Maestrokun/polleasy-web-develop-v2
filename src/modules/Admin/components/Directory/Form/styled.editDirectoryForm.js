import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  form: {
    marginTop: '22px',
    '& > *': {
      marginBottom: '22px',
    },
  },
  root: {
    width: '90%',
    margin: '1.5em auto',
    '& .MuiTextField-root': {
      marginBottom: '2em',
    },
    '& .MuiInputBase-root': {
      '& .MuiOutlinedInput-root': {
        marginBottom: '10px',
      },
    },
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
