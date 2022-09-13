import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '& .MuiButton-root': {
      padding: '0px',
      color: '#0050C8 ',
      fontSize: '12px',
      fontWeight: 400,
      textTransform: 'none',
      justifyContent: 'flex-start',
      '&:hover': {
        backgroundColor: 'unset !important',
      },
    },
  },
  edit: {
    '& .MuiTypography-body1': {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      '& .MuiSvgIcon-root': {
        fontSize: '14px !important',
        marginLeft: '.2em',
      },
    },
  },
  title: {
    '& .MuiTypography-subtitle1': {
      border: '#0047BD',
      background: '#F0F5FF',
      padding: '.4em',
      margin: '0 1em 4em 0',
      borderRadius: '4px',
      color: '#0050C8',
    },
    '& .MuiTypography-body1': {
      padding: '20px 0px 4px',
    },
    '& .MuiTypography-h3': {
      marginTop: '10px',
      marginBottom: '10px',
      fontSize: '23px',
      fontWeight: 500,
      color: '#1E0A3C',
    },
  },
  status: {
    background: '#FFF8CC',
    color: '#806B00',
    border: '#0047BD',
    margin: '0 1em 4em 1em',
    padding: '.4em',
    borderRadius: '4px',
    '& .MuiTypography-body1': {
      padding: '0px',
    },
  },
  timeline: {
    '& .MuiTypography-body1': {
      paddingBottom: '0px',
    },
  },
  candidate: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '.5em',
  },
  manager: {
    display: 'flex',
    alignItems: 'center',
  },
  bottom: {
    display: 'flex',
    backgroundColor: '#F0F5FF',
    cursor: 'pointer',
    padding: '.2em',
    paddingLeft: '1em !important',
    border: '1px solid #F0F5FF',
    '& .MuiSvgIcon-root': {
      fontSize: '14px !important',
      marginLeft: '.2em',
    },
  },
});

export default useStyles;
