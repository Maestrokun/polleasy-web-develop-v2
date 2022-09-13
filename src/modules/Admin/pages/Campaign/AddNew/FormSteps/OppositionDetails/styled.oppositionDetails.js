import { makeStyles } from '@mui/styles';

import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  root: {
    marginBottom: '5em',
    '& .opponentWrapper': {
      border: '1px dashed #E5E5EA',
      background: '#F8F7FA',
      padding: `${pxToRem(26)} ${pxToRem(135)}`,
      textAlign: 'center',
      cursor: 'pointer',
      '& .MuiTypography-body1': {
        paddingTop: '0px',
      },
    },
    '& .MuiTypography-h3': {
      margin: '.8em 0px 1em',
      color: '#1E0A3C',
    },
    '& .btnCancel': {
      background: '#F0F5FF',
      color: '#0050C8',
      '&:hover': {
        color: '#FFF',
      },
    },
    '& .addOpponentWrapper': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      border: '1px dashed #E5E5EA',
      background: '#F8F7FA',
      // padding: '16px',
      textAlign: 'center',
      cursor: 'pointer',
      height: '110px !important',
      '& .MuiTypography-body1': {
        padding: '5px 0px 0px',
      },
    },
    '& .MuiIconButton-root': {
      borderRadius: '4px',
    },
  },
});

export default useStyles;
