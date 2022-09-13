import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '& .MuiTextField-root': {
      marginBottom: '1.5em',
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
  pollQuestionsBox: {
    border: `1px solid #E5E5EA`,
    borderRadius: '4px',
    display: 'flex',

    '& .questionArea': {
      width: '91%',
      borderRight: `1px solid #E5E5EA`,
      minHeight: 700,
    },
    '& .dragArea': {
      minHeight: 700,
    },
  },
});

export default useStyles;
