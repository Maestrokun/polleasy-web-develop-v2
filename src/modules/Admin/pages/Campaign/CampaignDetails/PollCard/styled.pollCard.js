import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '& .MuiBox-root': {
      '&:nth-child(1)': {
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#FAF9F8',
          boxShadow: '1px 3px lightgray',
        },
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
      '& .MuiTypography-root-2': {
        backgroundColor: '#1E0A3C',
      },
    },
  },
  title: {
    '& .MuiTypography-subtitle1': {
      border: '1px solid #0047BD',
      background: '#F0F5FF',
      padding: '.4em',
      borderRadius: '4px',
    },
    '& .MuiTypography-body1': {
      padding: '20px 0px 4px',
    },
    '& .MuiTypography-h3': {
      marginBottom: '10px',
    },
  },
  status: {
    padding: '4px 8px 4px 8px',
    alignItems: 'left',
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
  callCenterLead: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '.5em',
  },
  readMoreLink: {
    color: 'blueviolet',
    textDecoration: 'none',
    cursor: 'pointer',
  },
});

export default useStyles;
