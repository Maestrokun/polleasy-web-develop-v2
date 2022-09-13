import { makeStyles } from '@mui/styles';
import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  root: {
    '& .MuiTypography-body1': {
      color: '#004AD7',
      cursor: 'pointer',
      marginLeft: '1.5em',
      marginTop: '2em',
      fontSize: pxToRem(16),
    },
  },
});

export default useStyles;
