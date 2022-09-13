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
    '& .MuiSelect-multiple': {
      textTransform: 'capitalize',
    },
  },
  searchBox: {
    width: '90%',
    margin: 'auto',
    '& .MuiTextField-root': {
      margin: '.7em 0px 1em',
    },
  },
  searchBox2: {
    margin: 'auto',
    position: 'sticky',
    top: 0,
    background: 'white',
    textAlign: 'center',
    zIndex: 9999,
    '& .MuiTextField-root': {
      margin: '.7em 0px 1em',
      width: '90%',
    },
  },
  selectedAgents: {
    background: '#F3F2F1',
    marginRight: '1em',
    padding: '.4em .8em',
    display: 'inline-block',
    marginTop: '.3em',
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
});

export default useStyles;
