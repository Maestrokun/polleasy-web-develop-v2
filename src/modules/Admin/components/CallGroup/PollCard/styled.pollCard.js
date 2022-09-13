import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    height: '100%',
    '& .MuiBox-root': {
      '&:nth-child(1)': {
        '&:hover': {
          background: '#FAF9F8',
          cursor: 'pointer',
          boxShadow: '1px 3px lightgray',
        },
      },
    },
  },
  wrapper: {
    boxShadow: 'unset !important',
  },
  progress: {
    '& .MuiTypography-body1': {
      paddingBottom: '.4em',
    },
  },
  stack: {
    '& .MuiTypography-subtitle1': {
      border: '1px solid #0047BD',
      background: '#F0F5FF',
      padding: '.4em',
      borderRadius: '4px',
    },
  },
  agents: {
    '& .MuiAvatarGroup-avatar': {
      marginRight: '.3em',
    },
    '& .MuiAvatar-colorDefault': {
      fontSize: '12px',
      color: '#201F1E',
      background: '#F3F2F1',
    },
    '& .MuiTypography-subtitle1': {
      paddingBottom: '.4em',
    },
  },
  title: {
    '& .MuiTypography-body1': {
      padding: '20px 0px 4px',
    },
    '& .MuiTypography-h3': {
      marginBottom: '10px',
    },
  },
  status: {
    padding: '4px 8px 4px 8px',
    borderRadius: '8px',
    '& .MuiTypography-body1': {
      padding: '0px',
    },
  },
  timeline: {
    '& .MuiTypography-body1': {
      paddingBottom: '0px',
    },
  },
  callCenterLead: {
    display: 'flex',
    alignItems: 'center',
  },
  date: {
    '& .MuiTypography-body1': {
      paddingTop: '.4em',
    },
  },
});

export default useStyles;
