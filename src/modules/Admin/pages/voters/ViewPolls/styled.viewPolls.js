import { makeStyles } from '@mui/styles';
import { pxToRem } from 'utils/formatFont';

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
    '& .topCard': {
      '& .MuiTypography-h3': {
        fontSize: pxToRem(23),
        color: '#1E0A3C',
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
      padding: '10em 0px 5em',
      '& .score': {
        position: 'fixed',
        width: '20%',
        height: '60vh',
      },
    },
    '& .bottomCard': {
      '& img': {
        marginRight: '.6em',
      },
      '& .MuiTypography-body1': {
        paddingBottom: '0px !important',
      },
    },
    '& .wrapper': {
      '& .MuiTypography-body1': {
        color: '#9DA0A7',
        '& span': {
          color: '#1E0A3C',
          paddingLeft: '.3em',
        },
      },
    },
    '& .gender': {
      '& .MuiTypography-body1': {
        color: '#1E0A3C !important',
      },
    },
    '& .MuiAvatar-root': {
      width: '120px',
      height: '120px',
      background: '#4F6BED !important',
    },
    '& .MuiTypography-h3': {
      fontSize: '46px',
      fontWeight: 500,
    },
  },
  topContainer: {
    position: 'fixed',
    width: '80%',
    background: 'white',
    paddingBottom: '2em',
    zIndex: 4,
  },
  viewDetailBtn: {
    '& .MuiButton-contained': {
      border: '1px dashed #CDCED9',
      background: '#FFF',
      color: '#0050C8',
      '&:hover': {
        color: '#fff',
      },
    },
  },
  pollCard: {
    '& .MuiLinearProgress-root': {
      background: '#bbbcbe',
    },
    '& .MuiBox-root': {
      '&:nth-child(1)': {
        '&:hover': {
          // border: '1px solid #0050C8',
          boxShadow: '1px 3px lightgray',
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
