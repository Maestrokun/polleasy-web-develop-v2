import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '& .img': {
      backgroundSize: 'cover',
      maxHeight: '100%',
      marginLeft: 0,
      marginTop: '11px',
      padding: 0,
    },
    '& .menuCard': {
      marginBottom: 20,
      height: 'min-content',
      paddingBottom: 0,
    },
  },
});

export default useStyles;
