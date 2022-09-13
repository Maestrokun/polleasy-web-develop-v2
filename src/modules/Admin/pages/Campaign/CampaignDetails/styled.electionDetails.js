import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    background: '#FFF',
    position: 'relative',
    paddingBottom: '1em',
    paddingTop: '2em',
    marginRight: '10em',
    width: '100%',
    textTransform: 'none',
    zIndex: 4,
    '& .MuiTypography-body1': {
      color: '#6B6C7E',
      padding: '0px !important',
    },
    '& .MuiTypography-h3': {
      color: '#393A4A !important',
    },
    '& a': {
      color: 'unset !important',
    },
    '& .MuiTypography-body2': {
      fontSize: '16px',
      color: '#393A4A',
      padding: '0px !important',
    },
    '& .MuiBreadcrumbs-root': {
      '& a': {
        textDecoration: 'none',
      },
    },
    '& .img': {
      backgroundSize: 'cover',
      maxHeight: '100%',
      marginLeft: 0,
      marginTop: '11px',
      padding: 0,
    },
    '& .box': {
      display: 'flex',
      alignItems: 'center',
      gap: '7px',
      paddingBottom: '5px',
    },
  },
  election_empty: {
    width: '50%',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    cursor: 'pointer',
  },
});

export default useStyles;
