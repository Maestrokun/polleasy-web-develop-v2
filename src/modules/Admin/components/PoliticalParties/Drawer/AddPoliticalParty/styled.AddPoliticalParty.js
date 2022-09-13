import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    width: '90%',
    margin: '1.5em auto',
    '& .MuiTextField-root': {
      marginBottom: '2em',
    },
    '& .MuiFormControl-root': {
      marginBottom: '2em',
    },
    '& .bg-yellow-400': {
      color: '#f00',
      fontSize: '13px',
      paddingLeft: '11px',
    },
  },
  actionWrapper: {
    position: 'sticky',
    bottom: 0,
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
  fileUpload: {
    paddingTop: 0,
    marginTop: 0,
    marginLeft: '2em',
    color: '#004AD7',
  },
});

export default useStyles;
