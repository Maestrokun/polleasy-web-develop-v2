import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    background: 'white',
    color: 'black',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    borderRadius: '10px',
    width: '30%',
    '& .MuiBox-root': {
      outline: 'none',
      border: 'none',
    },
  },
});

export default useStyles;
