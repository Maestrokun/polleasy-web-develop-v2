import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    width: '90%',
    margin: '1.5em auto',
    '& .MuiTextField-root': {
      marginBottom: '2em',
    },
  },
  searchBox: {
    width: '90%',
    margin: 'auto',
    '& .MuiTextField-root': {
      margin: '.7em 0px 1em',
    },
  },
});

export default useStyles;
