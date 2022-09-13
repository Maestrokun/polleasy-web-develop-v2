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
});

export default useStyles;
