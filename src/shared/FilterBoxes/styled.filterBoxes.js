import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      borderRadius: '4px',
      boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1) !important',
    },
    '& .MuiButton-outlined': {
      background: '#F0F5FF',
      color: '#0050C8',
      border: '1px solid #F0F5FF',
      '&:hover': {
        background: '#B3CDFF',
        border: '1px solid #B3CDFF',
      },
    },
  },
  dropdownLabel: {
    textTransform: 'capitalize !important',
  },
});

export default useStyles;
