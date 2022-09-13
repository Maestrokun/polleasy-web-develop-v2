import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {},
  asideWrapper: {
    borderLeft: '1px solid #E5E5EA',
    height: '100vh',
    position: 'fixed',
    right: 0,
    top: 64,
    padding: '0px 0px 0px',
    width: '100%',
    '& .container': {
      '& .MuiTypography-body2': {
        color: '#6B6C7E',
        padding: '28px 24px 20px',
        background: '#FFF',
        boxShadow: 'inset 0px -1px 0px #E5E5EA',
      },
      '& .MuiTypography-h3': {
        padding: '15px 24px 10px',
        fontWeight: 400,
        color: '#1E0A3C',
        width: '90%',
        overflowWrap: 'break-word',
        fontSize: '.9rem !important',
      },
      '& .MuiTypography-body1': {
        padding: '0px 24px 22px',
        width: '70%',
      },
      '& .MuiTypography-h5': {
        color: '#1E0A3C',
      },
      '& .stepper': {
        padding: '1em 1em',
        // cursor: 'pointer',
      },
    },
    '& .MuiBadge-badge': {
      background: '#1E0A3C',
      height: '21px',
      width: '21px',
      color: '#FFF',
      marginRight: '2em',
      '& .MuiSvgIcon-root': {
        padding: '0px',
        width: '14px',
      },
    },
  },
});

export default useStyles;
