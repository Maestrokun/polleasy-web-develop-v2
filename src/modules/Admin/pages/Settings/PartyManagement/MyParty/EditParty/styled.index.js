import { makeStyles } from '@mui/styles';
import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  bread: {
    '& .MuiBreadcrumbs-root': {
      '& .MuiTypography-body1': {
        padding: '0px',
      },
      '& a': {
        textDecoration: 'none',
        color: 'unset',
      },
    },
  },
  root: {
    '& .MuiTextField-root': {
      marginBottom: '1.5em',
      width: '744px',
      height: '48px',
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
      textDecoration: 'none',
      '&:hover': {
        color: '#FFF',
      },
    },
  },
});

export default useStyles;
