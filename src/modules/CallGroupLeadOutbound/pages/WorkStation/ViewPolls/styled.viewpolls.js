import { makeStyles } from '@mui/styles';
import CallGroupbackgroundpattern from 'assets/svg/CallGroupbackgroundpattern.svg';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  '& .background-pattern': {
    backgroundImage: `${CallGroupbackgroundpattern}`,
  },
  arrowRight: {
    marginTop: '11px!important',
  },
  pollImg: {
    marginLeft: '13px',
  },
  response: {
    display: 'flex',
    '& .responseContainer::-webkit-scrollbar': {
      display: 'none',
      '-ms-overflow-style': 'none',
    } /* Chrome */,
    '& .MuiFormControlLabel-root': {
      '& .MuiTypography-root': {
        padding: '0px',
      },
    },
    '& .responseContainer': {
      position: 'relative',
      width: '30%',
      height: '60vh',
      overflowY: 'scroll',
      background: '#fff',
      boxShadow:
        'inset -1px 0px 0px #E5E5EA, inset 1px 0px 0px #E5E5EA, inset 0px -1px 0px #E5E5EA, inset 0px 1px 0px #E5E5EA',
    },
    '& .responseWrapper': {
      position: 'sticky',
      top: 0,
      padding: '1em',
      // boxShadow:
      //   'inset -1px 0px 0px #E5E5EA, inset 1px 0px 0px #E5E5EA, inset 0px -1px 0px #E5E5EA, inset 0px 1px 0px #E5E5EA',
      background: '#FFF',
      zIndex: 2,
    },
  },
  details: {
    width: '65%',
    height: '60vh',
    // overflowY: 'scroll',
    background: '#fff',
    boxShadow:
      'inset -1px 0px 0px #E5E5EA, inset 1px 0px 0px #E5E5EA, inset 0px -1px 0px #E5E5EA, inset 0px 1px 0px #E5E5EA',
    '& .detailsContainer': {
      position: 'sticky',
      top: 0,
      padding: '1em',
      background: '#FFF',
      boxShadow:
        'inset -1px 0px 0px #E5E5EA, inset 1px 0px 0px #E5E5EA, inset 0px -1px 0px #E5E5EA, inset 0px 1px 0px #E5E5EA',
      zIndex: 2,
    },
    '& .detailsComment': {
      borderRadius: '4px',
      background: '#F8F7FA',
      padding: '1em',
      margin: '1.5em 1em',
    },
    '& .question': {
      border: '1px solid #F3F2F1',
      margin: '1em 1em 1.5em',
      padding: '1em',
    },
  },
  pollAgent_empty: {
    width: '50%',
    position: 'absolute',
    top: '130%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    cursor: 'pointer',
  },
});

export default useStyles;
