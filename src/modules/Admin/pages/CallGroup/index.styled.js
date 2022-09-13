import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
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
  },
  callCenters_empty: {
    width: '50%',
    position: 'absolute',
    top: '70%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    cursor: 'pointer',
  },
  location: {
    paddingTop: '20em',
    paddingBottom: '5em',
    '& .MuiTypography-subtitle1': {
      padding: '.8em 0px 1.5em',
    },
  },
  view: {
    color: '#0050C8',
    marginTop: '.6em',
    marginBottom: '0px',
    '& .MuiTypography-subtitle1': {
      color: '#0050C8',
      padding: '0px',
    },
  },
  preview: {
    textDecoration: 'none',
  },
  role: {
    '& .MuiTypography-subtitle1': {
      padding: '1em 0px .2em',
    },
  },
  locationName: {
    padding: '.8em 0px 0px',
  },
  status: {
    padding: '2px 6px !important',
    borderRadius: '4px',
    '& .MuiTypography-subtitle1': {},
  },
  wrapper: {
    background: '#FFF',
    position: 'fixed',
    paddingBottom: '1em',
    paddingTop: '2em',
    width: '80%',
    zIndex: 4,
  },
  emptyState: {
    paddingTop: '20em',
    paddingBottom: '2em',
    '& .MuiGrid-item': {
      maxHeight: '200px',
      padding: '0px',
    },
  },
});

export default useStyles;
