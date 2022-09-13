import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    width: '80%',
    '& .MuiTypography-body1': {
      color: '#6B6C7E',
      padding: '0px !important',
    },
    '& .topContainer': {
      paddingTop: '1em',
    },
  },
  filterContainer: {
    height: '60vh',
    border: '1px solid #EDEBE9',
    borderRadius: '4px',
    overflow: 'scroll',
    '& .fixedLabel': {
      position: 'sticky',
      top: 0,
      background: 'white',
      zIndex: 2,
      padding: '1em 0px',
      borderBottom: '1px solid #EDEBE9',
    },
  },
  filterWrapper: {
    background: '#FBFAF9',
    padding: '1em .8em',
    margin: '1em .8em',
    borderRadius: '4px',
    zIndex: -1,
    '& .MuiOutlinedInput-root': {
      background: 'white',
    },
    '& .MuiTypography-subtitle2': {
      textTransform: 'capitalize',
      color: '#393A4A',
      display: 'flex',
      textAlign: 'center',
      marginBottom: '.7em',
    },
  },
  table: {
    height: '60vh',
    overflowY: 'scroll',
  },
  emptyState: {
    width: '50%',
    margin: '10em auto',
    textAlign: 'center',
  },
});

export default useStyles;
