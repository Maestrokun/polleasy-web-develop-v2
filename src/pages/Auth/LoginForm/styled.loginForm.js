import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const inputStyle = {
  '& .MuiInputBase-root': {
    borderRadius: '3px !important',
    border: '0',
    height: 48,
    display: 'flex',
    alignItems: 'center',
  },
};

const BoxBottom = styled(Box)({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '',
});

const Card = styled(Paper)(({ theme }) => ({
  width: '85%',
  display: 'flex',
  padding: 16,
  elevation: 0,
  borderRadius: '4px',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
  boxShadow: '0px 3px 16px 0px #0000001A',
  margin: '2em auto',
  [theme.breakpoints.down('sm')]: {
    width: '320px',
  },
}));

const Container = styled(Box)({
  width: '100%',
  height: '100%',
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: ' #E5E5E5',
});

const Wrapper = styled(Box)({
  marginTop: '4em',
  '& .MuiTextField-root': {
    '&:nth-child(2)': {
      marginTop: '1em',
    },
  },
});

export { Card, Container, BoxBottom, Wrapper, inputStyle };
