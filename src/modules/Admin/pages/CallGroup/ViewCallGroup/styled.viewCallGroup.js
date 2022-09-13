import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '& .MuiBreadcrumbs-root': {
      '& .MuiTypography-body1': {
        padding: '0px',
      },
      '& a': {
        textDecoration: 'none',
        color: 'unset',
      },
    },
    '& .MuiTableBody-root': {
      '& .MuiTypography-body1': {
        padding: '0px',
      },
    },
  },
  wrapper: {
    background: '#FFF',
    position: 'fixed',
    paddingBottom: '1em',
    paddingTop: '0px',
    width: '85%',
    zIndex: 4,
  },
  editDetail: {
    '& .MuiButton-contained': {
      border: '1px dashed #CDCED9',
      background: '#FFF',
      color: '#0050C8',
      '&:hover': {
        color: '#fff',
      },
    },
  },
  managerWrapper: {
    background: '#F0F5FF',
    boxShadow:
      'inset -1px 0px 0px #E5E5EA, inset 1px 0px 0px #E5E5EA, inset 0px 1px 0px #E5E5EA, inset 0px -1px 0px #E5E5EA',
    borderRadius: '4px',
    padding: '16px',
    '& .status': {
      fontWeight: 400,
      fontSize: '12px',
      padding: '4px 8px',
      marginLeft: '.5em',
      borderRadius: '4px',
    },
  },
  manager: {
    padding: '0px',
    marginTop: '1.5em',
    '& .MuiTypography-body1': {
      padding: '0px !important',
      color: '#6B6C7E',
      marginBottom: '.2em',
    },
  },
  tabWrapper: {
    width: '82%',
    paddingTop: '18em',
  },
  loader: {
    padding: '0px',
    margin: '0px',
    position: 'relative',
    height: '145px',
    overflow: 'hidden',
    '& .MuiSkeleton-root': {
      height: '250px',
      padding: '0px',
      position: 'relative',
      top: '-60px',
    },
  },
});

export default useStyles;
