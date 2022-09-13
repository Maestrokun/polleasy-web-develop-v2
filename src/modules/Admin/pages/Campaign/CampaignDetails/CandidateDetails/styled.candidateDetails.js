import { makeStyles } from '@mui/styles';
import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  root: {
    '& .MuiAvatar-root': {
      width: pxToRem(25),
      height: pxToRem(25),
    },
    '& .MuiLinearProgress-root': {
      backgroundColor: '#EDEBE9',
      height: pxToRem(2),
    },
    '& .MuiTypography-h4': {
      fontSize: pxToRem(23),
    },
    '& .MuiDivider-root': {
      margin: '1em 0px',
    },
  },
  info: {
    '& .MuiTypography-subtitle2': {
      padding: '1px 6px',
      borderRadius: '4px',
      '&:nth-child(1)': {
        background: '#F0F5FF',
        color: '#0050C8',
        marginRight: '1em',
      },
      '&:nth-child(2)': {
        background: '#FFF8CC',
        color: '#806B00',
      },
    },
    '& .MuiTypography-subtitle1': {
      color: '#0050C8',
      cursor: 'pointer',
      padding: '.4em 0px 0px',
    },
  },
  edit: {
    background: '#F0F5FF',
    padding: '.8em 1em',
    '& .MuiTypography-body1': {
      display: 'flex',
      alignItems: 'center',
      '& .MuiSvgIcon-root': {
        fontSize: '15px',
        marginLeft: '.2em',
      },
    },
  },
  party: {
    '& .row': {
      marginTop: '.8em',
    },
  },
  opposition: {
    marginTop: '1em',
  },
});

export default useStyles;
