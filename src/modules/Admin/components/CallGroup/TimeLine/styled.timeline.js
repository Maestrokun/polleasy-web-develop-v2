import { makeStyles } from '@mui/styles';

import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  root: {
    '& .MuiLinearProgress-root': {
      backgroundColor: '#EDEBE9',
      height: pxToRem(2),
    },
    '& .MuiTypography-body1': {
      paddingBottom: '.4em',
    },
  },
});

export default useStyles;
