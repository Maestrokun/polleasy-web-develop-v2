import { makeStyles } from '@mui/styles';
import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  root: {
    marginBottom: '5em',
    '& .MuiTextField-root': {
      marginBottom: '1.5em',
    },
    '& .MuiTypography-h3': {
      margin: '.8em 0px 1em',
      color: '#1E0A3C',
    },
    '& .MuiTypography-h5': {
      color: '#6B6C7E',
      fontWeight: 400,
      lineHeight: pxToRem(20),
      textTransform: 'uppercase',
      margin: '.8em 0px 1em',
    },
    '& .btnCancel': {
      background: '#F0F5FF',
      color: '#0050C8',
      '&:hover': {
        color: '#FFF',
      },
    },
  },
});

export default useStyles;
