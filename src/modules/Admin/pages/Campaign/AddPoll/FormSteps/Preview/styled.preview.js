import { makeStyles } from '@mui/styles';

import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  root: {
    marginBottom: 50,
    '& .MuiTypography-h3': {
      margin: '.8em 0px 1em',
      color: '#1E0A3C',
    },
    '& .MuiTypography-h4': {
      padding: '.4em 0px 0px',
      color: '#1E0A3C',
      fontSize: pxToRem(23),
      lineHeight: '30.59px',
    },
    '& .btnCancel': {
      background: '#F0F5FF',
      color: '#0050C8',
      '&:hover': {
        color: '#FFF',
      },
    },
  },
  info: {
    '& .MuiTypography-body2': {
      padding: '0px',
      marginTop: '10px',
      marginBottom: '10px',
    },
  },
  container: {
    margin: '1em 0px',
    '& .MuiTypography-body2': {
      padding: '1em 0px 1.5em',
      textTransform: 'uppercase',
      color: '#6B6C7E',
    },
    '& .MuiTypography-h5': {
      paddingBottom: '.6em',
      color: '#393A4A',
    },
    '& .MuiTypography-subtitle1': {
      color: '#605E5C',
    },
  },
  post: {
    background: '#F0F5FF',
    padding: '1.5px 6px',
    borderRadius: '4px',
    marginRight: '1em !important',
    border: '1px solid #393A4A',
  },
  center: {
    background: '#F0F5FF',
    padding: '1.5px 6px',
    borderRadius: '4px',
    marginRight: '1em !important',
  },
  region: {
    background: '#E5EDFF',
    padding: '4.5px 16px',
    borderRadius: '16px',
    marginRight: '1em !important',
  },
  year: {
    background: '#FFF8CC',
    padding: '1.5px 6px',
    borderRadius: '4px',
  },
  header: {
    fontSize: pxToRem(23),
  },
  description: {
    color: '#6B6C7E',
    padding: '1em 0px',
  },
  name: {
    '& .MuiTypography-subtitle1': {
      color: '#6B6C7E',
    },
    '& .MuiTypography-body2': {
      color: '#1E0A3C',
      fontSize: pxToRem(16),
      lineHeight: pxToRem(24),
    },
  },
  party: {
    '& .MuiTypography-subtitle1': {
      color: '#605E5C',
      lineHeight: pxToRem(16),
    },
    '& .MuiTypography-body2': {
      color: '#393A4A',
    },
  },
  manager: {
    '& .MuiTypography-body2': {
      color: '#6B6C7E ',
      fontWeight: 400,
      '& span': {
        paddingLeft: '.4em',
        fontWeight: 500,
      },
    },
  },
});

export default useStyles;
