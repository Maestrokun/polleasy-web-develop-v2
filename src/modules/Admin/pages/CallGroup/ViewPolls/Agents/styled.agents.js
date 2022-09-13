import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    height: '50vh',
    overflow: 'scroll',
    '& .MuiTableBody-root': {
      '& .MuiTypography-body1': {
        padding: '0px',
      },
    },
  },
  wrapper: {
    '& .MuiAvatar-root': {
      bgcolor: '#4F6BED',
      height: 32,
      width: 32,
      textTransform: 'uppercase',
      fontSize: 14,
    },
  },
});

export default useStyles;
