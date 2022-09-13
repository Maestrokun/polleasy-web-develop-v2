import { makeStyles } from '@mui/styles';
import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  root: {
    border: '1px solid #E5E5EA',
    borderRadius: pxToRem(4),
    padding: pxToRem(16),
  },
});

export default useStyles;
