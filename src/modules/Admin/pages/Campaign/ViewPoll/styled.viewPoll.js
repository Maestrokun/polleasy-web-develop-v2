import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    background: '#FFF',
    position: 'relative',
    paddingBottom: '1em',
    paddingTop: '2em',
    marginRight: '10em',
    width: '100%',
    zIndex: 4,
    '& .MuiTypography-body1': {
      color: '#6B6C7E',
    },
    '& .MuiTypography-h3': {
      color: '#393A4A !important',
    },
    '& a': {
      color: 'unset !important',
    },
    '& .MuiBreadcrumbs-root': {
      '& .MuiTypography-body1': {
        padding: '0px !important',
      },
      '& a': {
        textDecoration: 'none',
      },
    },
  },
  rate: {
    '& .MuiTypography-h5': {
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        paddingRight: '6px',
      },
    },
  },
  topStack: {
    '& span': {
      background: 'rgba(95, 210, 85, 0.2)',
      padding: '4px 8px',
      borderRadius: '4px',
      color: '#107C10',
    },
  },
  table: {
    '& .MuiTypography-body1': {
      padding: '0px !important',
    },
  },
  response: {
    display: 'flex',
    '& .MuiFormControlLabel-root': {
      '& .MuiTypography-root': {
        padding: '0px',
      },
    },
    '& .responseContainer': {
      position: 'relative',
      width: '35%',
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
      boxShadow:
        'inset -1px 0px 0px #E5E5EA, inset 1px 0px 0px #E5E5EA, inset 0px -1px 0px #E5E5EA, inset 0px 1px 0px #E5E5EA',
      background: '#FFF',
      zIndex: 2,
    },
  },
  details: {
    width: '65%',
    height: '60vh',
    overflowY: 'scroll',
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
