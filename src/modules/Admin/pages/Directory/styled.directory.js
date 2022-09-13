import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    background: '#FFF',
    position: 'absolute',
    paddingBottom: '1em',
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
    left: '55%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    cursor: 'pointer',
  },
  directory: {
    background: '#FFF',
    position: 'fixed',
    paddingBottom: '1em',
    paddingTop: '1em',
    width: '80%',
    zIndex: 4,
  },
  switch_tab: {
    width: '230px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRadius: '4px',
    mt: 4,
    p: 5,
    backgroundColor: '#F1F2F6',
  },
  location: {
    paddingTop: '21em',
    paddingBottom: '5em',
    position: 'absolute',
    width: '80vw',
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
  active: {
    '& .MuiButton-contained': {
      border: '1px solid #black',
      borderRadius: '8px',
      background: '#FFFFFF',
      color: '#6B6C7E',
      '&:hover': {
        color: '#fff',
      },
    },
  },
  archive: {
    '& .MuiButton-contained': {
      border: '1px solid #F1F2F6',
      borderRadius: '8px',
      background: '#F1F2F6',
      color: '#A7A9BC',
      '&:hover': {
        color: '#fff',
      },
    },
  },
});

export default useStyles;
