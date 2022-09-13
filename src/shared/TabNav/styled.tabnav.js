import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '& .MuiTabs-flexContainer': {
      padding: '6px',
      width: 'fit-content !important',
      background: '#F1F2F6 !important',
      borderRadius: '12px',
    },
    '& .MuiTab-root': {
      padding: '0px',
      textTransform: 'capitalize',
      minHeight: '33px !important',
      color: '#A7A9BC !important',
    },
    '& .MuiTabs-indicator': {
      height: '0px !important',
      border: 'none !important',
    },
    '& .Mui-selected': {
      background: '#FFF !important',
      boxShadow: ' 0px 1px 3px rgba(0, 0, 0, 0.1)',
      color: '#6B6C7E !important',
      border: 'none !important',
      borderRadius: '8px',
      marginRight: '2px',
      marginLeft: '2px',
    },
  },
});

export default useStyles;
