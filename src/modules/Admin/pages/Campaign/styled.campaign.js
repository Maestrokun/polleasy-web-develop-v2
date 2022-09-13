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
      padding: '0px !important',
    },
    '& .MuiTypography-h3': {
      color: '#393A4A !important',
    },
    '& a': {
      color: 'unset !important',
    },
  },
  election_empty: {
    width: '50%',
    position: 'absolute',
    top: '100%',
    left: '50%',
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
    textDecoration: 'none !important',
  },
  role: {
    '& .MuiTypography-subtitle1': {
      padding: '0px 0px .2em',
    },
  },
  locationName: {
    padding: '.8em 0px 0px',
  },
  status: {
    padding: '2px 6px !important',
    background: '#D4F7DC',
    borderRadius: '4px',
    '& .MuiTypography-subtitle1': {
      color: '#15692A',
    },
  },
  campaign_empty: {
    width: '50%',
    position: 'absolute',
    top: '200%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  pattern: {
    display: 'flex',
    alignItems: 'flex-end',
    width: 'fit-content',
    position: 'absolute',
    bottom: -5,
    right: 0,
  },
});

export default useStyles;
