import { makeStyles } from '@mui/styles';

import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  root: {
    '& .MuiAvatar-root': {
      width: pxToRem(25),
      height: pxToRem(25),
    },
  },
  emptyState: {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50, -50)',
  },
});

export default useStyles;
