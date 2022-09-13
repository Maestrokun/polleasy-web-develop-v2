import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    background: '#FFF',
    position: 'relative',
    paddingBottom: '1em',
    paddingTop: '2em',
    marginRight: '10em',
    width: '100%',
    zIndex: 4,
    '& .MuiTypography-body1': {
      color: '#6B6C7E',
    },
    '& .MuiTypography-h3': {
      color: '#393A4A !important',
    },
    '& a': {
      color: 'unset !important',
    },
    '& .MuiBreadcrumbs-root': {
      '& .MuiTypography-body1': {
        padding: '0px !important',
      },
      '& a': {
        textDecoration: 'none',
      },
    },
  },
  pattern: {
    display: 'flex',
    alignItems: 'flex-end',
    width: 'fit-content',
    position: 'absolute',
    bottom: -5,
    right: 0,
  },
  poll_empty: {
    width: '50%',
    position: 'absolute',
    top: '160%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    cursor: 'pointer',
  },
});

export default useStyles;
