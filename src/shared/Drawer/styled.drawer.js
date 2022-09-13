import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {},
  header: {
    padding: '11px 24px',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
  },
  btn: {
    padding: '1em 40px',
    position: 'absolute',
    bottom: 0,
    background: '#F5F7FA',
    '& .MuiButton-text': {
      color: '#0050C8',
      background: '#F0F5FF',
      '&:hover': {
        background: '#B3CDFF',
      },
    },
    '& .MuiGrid-item': {
      paddingTop: '0px !important',
    },
  },
  drawer: {
    '& .MuiPaper-root': {
      width: '500px',
    },
  },
  progressWrapper: {
    width: '100%',
    padding: '.1em 2em',
    alignItems: 'center',
    display: 'flex',
  },
});

export default useStyles;
