import { makeStyles } from '@mui/styles';
import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  root: {
    marginBottom: '5em',
    '& .MuiTextField-root, .MuiFormControl-root': {
      marginBottom: '1.5em',
    },
    '& .MuiTypography-h3': {
      margin: '.8em 0px 1em',
      color: '#1E0A3C',
    },
    '& .MuiTypography-h5': {
      color: '#6B6C7E',
      fontWeight: 400,
      lineHeight: pxToRem(20),
      textTransform: 'uppercase',
      margin: '.8em 0px 1em',
    },
    '& .btnCancel': {
      background: '#F0F5FF',
      color: '#0050C8',
      '&:hover': {
        color: '#FFF',
      },
    },
    '& .MuiInputBase-multiline': {
      height: 'unset !important',
    },
  },
  searchBox: {
    width: '90%',
    margin: 'auto',
    '& .MuiTextField-root': {
      margin: '.7em 0px 1em',
    },
  },
  selectedParty: {
    border: '1px solid #CDCED9',
    borderRadius: '4px',
    background: '#FAFAFA',
    padding: '16px',
    '& .MuiTypography-body1': {
      padding: '0px',
      color: '#6B6C7E',
      '& span': {
        color: '#393A4A',
        paddingLeft: '.5em',
      },
    },
  },
});

export default useStyles;
