import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  form: {
    // padding: '20px',
    height: '80vh',
    // overflowY: 'scroll',
    '& .MuiTextField-root': {
      margin: '.7em 0px 1em',
    },
  },
  checkbox: {
    paddingLeft: '30px',
  },
  button: {
    width: '80px',
    paddingLeft: '30px',
    '& .btnCancel': {
      background: '#F0F5FF',
      color: '#0050C8',
      textDecoration: 'none',
      '&:hover': {
        color: '#FFF',
      },
    },
  },
  languageBox: {
    backgroundColor: '#F3F2F1',
    height: '35px',
    width: '80px',
    left: '4px',
    top: '4px',
    borderRadius: '2px',
  },
  actionWrapper: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'flex-end',
    background: 'white',
    zIndex: 999999,
    padding: '1em 1.8em',
  },
  actions: {
    '& .btnCancel': {
      background: '#F0F5FF',
      color: '#0050C8',
      '&:hover': {
        color: '#FFF',
      },
    },
  },
  selectedLanguages: {
    backgroundColor: '#F3F2F1',
    height: '35px',
    width: '80px',
    left: '4px',
    top: '4px',
    borderRadius: '5px',
    padding: '5px',
    marginLeft: '10px',
  },
  searchBox: {
    width: '0%',
    margin: 'auto',
    '& .MuiTextField-root': {
      margin: '.7em 0px 1em',
    },
  },
}));

export default useStyles;
