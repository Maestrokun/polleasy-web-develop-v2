import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    '& .MuiAvatarGroup-avatar': {
      width: '30px',
      height: '30px',
      background: 'gray',
    },
  },
  assignLayout: {
    overflowY: 'scroll',
  },
  unassignedWrapper: {
    overflowY: 'scroll',
    width: '20%',
    position: 'fixed',
    right: 0,
    height: '100vh',
    padding: '1rem',
  },
});
export default useStyles;
