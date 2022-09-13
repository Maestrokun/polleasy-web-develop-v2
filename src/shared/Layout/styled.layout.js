import { makeStyles } from '@mui/styles';
import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  root: {
    '& .MuiAppBar-root': {
      boxShadow: 'inset 0px -1px 0px #E5E5EA;',
      background: '#fff',
    },
    '& .sidenav': {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#041E44',
      color: 'red',
      justifyContent: 'space-around',
      '& img': {
        marginRight: pxToRem(10),
      },
      '& a': {
        display: 'flex',
        textDecoration: 'none',
        color: '#A7A9BC',
        // marginBottom: '1em',
        paddingLeft: pxToRem(20),
        '& .MuiTypography-body1': {
          padding: '10px 10px',
        },
      },
    },
    '& .main': {
      height: '100vh',
      padding: '0px 1.5em 2em',
    },
    '& .MuiTypography-subtitle2': {
      color: '#9DA0A7',
      textTransform: 'uppercase',
    },
    '& .MuiTypography-body1': {
      padding: '1em 0px',
    },
    '& .setting': {
      '& a': {
        paddingLeft: '0px !important',
        marginLeft: '0px !important',
      },
      '& .MuiTypography-body1': {
        padding: ' 0px',
        color: '#6B6C7E',
      },
    },
    '& .active': {
      color: '#FFF !important',
      background: 'rgba(248, 247, 250, 0.32)',
      boxShadow: 'inset 4px 0px 0px #FFFFFF',
    },
    '& .MuiAvatar-root': {
      background: '#0047BD',
    },
    '& .gear': {
      '& a': {
        color: '#9A9AAF',
      },
    },
  },
});

export default useStyles;
