import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '& .MuiBreadcrumbs-root': {
      marginBottom: '0px !important',
      '& .MuiTypography-body1': {
        padding: '0px',
      },
      '& a': {
        textDecoration: 'none',
        color: 'unset',
      },
    },
  },
  topStack: {
    '& span': {
      background: 'rgba(95, 210, 85, 0.2)',
      padding: '4px 8px',
      borderRadius: '4px',
      color: '#107C10',
    },
  },
  dates: {
    // display: 'flex',
    '& .MuiTypography-h5': {
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        paddingRight: '6px',
      },
    },
  },
});

export default useStyles;
