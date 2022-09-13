import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '& .MuiBreadcrumbs-root': {
      '& .MuiTypography-body1': {
        padding: '0px',
      },
      '& a': {
        textDecoration: 'none',
        color: 'unset',
      },
    },
    '& .topContainer': {
      position: 'fixed',
      background: 'white',
      width: '80%',
      paddingBottom: '2em',
      zIndex: 2,
    },
    '& .main': {
      padding: '15em 0px 5em',
      '& .score': {
        position: 'fixed',
        width: '20%',
        height: '80vh',
      },
    },
  },
  workbench: {
    '& .MuiLinearProgress-root': {
      background: '#bbbcbe',
    },
    '& .MuiBox-root': {
      '&:nth-child(1)': {
        '&:hover': {
          border: '1px solid #0050C8',
          background: '#FAF9F8',
          cursor: 'pointer',
        },
      },
    },
  },
  wrapper: {
    border: 'unset !important',
    '& .container': {
      '& .MuiTypography-subtitle1': {
        '&:nth-child(1)': {
          border: '1px solid #0047BD',
          background: '#F0F5FF',
          color: '#0047BD',
          borderRadius: '4px',
          padding: '4px 7px',
        },
      },
    },
  },
});

export default useStyles;
