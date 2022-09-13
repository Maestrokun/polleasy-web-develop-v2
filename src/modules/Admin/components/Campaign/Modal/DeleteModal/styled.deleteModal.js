import { makeStyles } from '@mui/styles';
import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  close: {
    width: '90% !important',
    margin: '2em auto 0px',
    '& .MuiSvgIcon-root': {
      cursor: 'pointer',
    },
  },
  copy: {
    textAlign: 'center',
    padding: '0em 2em 1.5em',
    '& .MuiTypography-body1': {
      width: '80%',
      margin: 'auto',
      color: '#6B6C7E',
    },
  },
  action: {
    background: '#F1F2F6',
    borderBottomLeftRadius: pxToRem(10),
    borderBottomRightRadius: pxToRem(10),
    padding: '.8em',
    '& .MuiButton-text': {
      color: '#0050C8',
      '&:hover': {
        background: 'none',
      },
    },
  },
});

export default useStyles;
