import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  wrapper: {
    '& .MuiBreadcrumbs-root': {
      '& .MuiTypography-body1': {
        padding: '0px',
      },
      '& a': {
        textDecoration: 'none',
        color: 'unset',
      },
    },
  },
  createdParty: {
    border: '1px solid #CDCED9',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    background: '#FAFAFA',
    padding: '10px',
    '& .MuiTypography-h2': {
      fontSize: '23px',
      fontWeight: '500px',
      lineHeight: '30.59px',
      padding: '0px',
      width: '300px',
      height: '31px',
      color: '#1E0A3C',
    },
    '& .MuiTypography-body1': {
      padding: '0px',
      color: '#6B6C7E',
      '& span': {
        width: '170px',
        color: '#1E0A3C',
        paddingLeft: '.5em',
      },
    },
  },
  edit: {
    '& .MuiButton-contained': {
      border: '1px dashed #CDCED9',
      background: '#FFF',
      color: '#0050C8',
      '&:hover': {
        color: '#fff',
      },
    },
  },
  table: {
    height: '60vh',
    // overflowY: 'scroll',
  },
  emptyState: {
    width: '50%',
    margin: '10em auto',
    textAlign: 'center',
  },
});

export default useStyles;
