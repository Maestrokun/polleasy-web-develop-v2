import { makeStyles } from '@mui/styles';

import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  top: {
    //  p: 4,
    position: 'sticky',
    top: 0,
    zIndex: 2,
    background: '#fff',
    borderBottom: '1px solid #E5E5EA',
    // padding: '10px',
    '& .MuiTypography-h5': {
      color: '#272833',
    },
    // '& .MuiTypography-body1': {
    //   color: '#0053F0',
    //   padding: '5px 8px 6px',
    // },
    '& .timeline': {
      display: 'flex',
      alignItems: 'center',
      background: '#F0F5FF',
      borderRadius: '4px',
      '& .MuiDivider-root': {
        background: '#0053F0',
        fontWeight: 400,
      },
    },
    '& .MuiOutlinedInput-root': {
      height: '35px',
    },
  },
  switch_tab: {
    // width: '240px',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '90%',
    borderRadius: '10px',
    mt: 4,
    padding: 5,
    backgroundColor: '#F1F2F6',
  },
  presidential: {
    border: '1px solid #0050C8',
    padding: 3,
    background: '#F0F5FF',
    borderRadius: '4px',
    textTransform: 'uppercase',
  },
  year: {
    border: '1px solid #E0B878',
    padding: '1px 6px',
    background: '#FFF5EA',
    borderRadius: '4px',
    ml: 5,
  },
  total: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  dates: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    m: 5,
  },
  user: {
    marginBottom: '.6em',
    padding: '5px 10px',
    '& .MuiTypography-body1': {
      margin: '0px',
      padding: '0px',
      color: '#393A4A',
    },
    '& .MuiTypography-subtitle1': {
      margin: '0px',
      padding: '0px',
      lineHeight: '16px',
      color: '#605E5C',
    },
    '& .MuiAvatar-root': {
      fontSize: pxToRem(14),
      fontWeight: 500,
      lineHeight: '21px',
      width: 30,
      height: 30,
    },
    '&:hover': {
      background: '#F1F2F6',
      cursor: 'pointer',
    },
  },
  question: {
    border: '1px solid #F3F2F1',
    margin: '0px 0px 1em 10px',
    padding: '.4em .6em',
    width: '70%',
    borderRadius: '4px',
    '& .MuiTypography-subtitle2': {
      textTransform: 'capitalize',
    },
    '& .MuiTypography-body2': {
      padding: '.8em 0px .5em',
    },
    '& .MuiFormControlLabel-root': {
      height: '40px',
    },
  },
  wrapper: {
    marginTop: '2em',
    cursor: 'pointer',
  },
});

export default useStyles;
