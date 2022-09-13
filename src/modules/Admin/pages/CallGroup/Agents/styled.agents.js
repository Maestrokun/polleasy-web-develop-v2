import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {},
  loader: {
    position: 'fixed',
    width: '70%',
    height: '400px',
    maxHeight: '400px',
    overflow: 'hidden',
    '& .MuiSkeleton-root': {
      height: '100vh !important',
      top: -200,
      position: 'relative',
      width: '100%',
    },
  },
});

export default useStyles;
