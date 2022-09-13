import { makeStyles } from '@mui/styles';
import palette from 'theme/palette';
import { pxToRem } from 'utils/formatFont';

const useStyles = makeStyles({
  root: {
    width: '90%',
    margin: '1.5em auto',
    '& .MuiTextField-root': {
      marginBottom: '2em',
    },
    '& .MuiFormControl-root': {
      marginBottom: '2em',
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
  },
  searchBox: {
    width: '90%',
    margin: 'auto',
    '& .MuiTextField-root': {
      margin: '.7em 0px 1em',
    },
  },
  searchBox2: {
    margin: 'auto',
    position: 'sticky',
    top: 0,
    background: 'white',
    textAlign: 'center',
    zIndex: 9999,
    '& .MuiTextField-root': {
      margin: '.7em 0px 1em',
      width: '90%',
    },
  },
  selectedAgents: {
    background: '#F3F2F1',
    marginRight: '1em',
    padding: '.4em .8em',
    display: 'inline-block',
    marginTop: '.3em',
  },
  actionWrapper: {
    position: 'sticky',
    bottom: 0,
    background: 'white',
    zIndex: 999999,
    padding: '1em 1.8em',
  },
  actions: {
    '& .btnCancel': {
      background: '#F0F5FF',
      color: '#0050C8',
      '&:hover': {
        color: '#FFF',
      },
    },
  },
  formSectionTitle: {
    color: `${palette.text.secondary}`,
    fontSize: '18px',
    fontWeight: 400,
  },
  regionalSplitBox: {
    border: `1px solid ${palette.border.default}`,
    borderRadius: '8px',
    '& .title': {
      fontWeight: 600,
      fontSize: '16px',
    },
    '& .editButton': {
      color: `${palette.primary.main}`,
      fontSize: 14,
    },
  },
  counterChips: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '14px',
    color: `${palette.text.main}`,
    '& .chipItem': {
      background: `${palette.info.background}`,
      padding: '4px 6px 4px 8px',
      marginTop: '6px',
      marginRight: '8px',
      fontSie: 14,
      fontWeight: 500,
      height: '28px',
      borderRadius: '22px',
      '& .count': {
        fontSize: '12px',
        background: `${palette.secondary.background}`,
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        marginLeft: '8px',
        textAlign: 'center',
        fontWeight: 450,
      },
    },
  },
});

export default useStyles;
