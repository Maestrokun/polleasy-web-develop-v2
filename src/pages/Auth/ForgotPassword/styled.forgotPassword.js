import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const inputStyle = {
  '& .MuiInputBase-root': {
    borderRadius: '3px !important',
    border: '0',
    height: 48,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
};

const BoxBottom = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '',
});

const Wrapper = styled(Box)({
  marginTop: '4em',
});

const Return = styled(Typography)({
  width: '100%',
  fontSize: '14px',
  display: 'flex',
  height: '50px',
  cursor: 'pointer',
  alignItems: 'center',
  color: '#0050c8',
  padding: 16,
});

const Card = styled(Paper)(({ theme }) => ({
  width: '360px',
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '2em',
  elevation: 0,
  borderRadius: '4px',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
  boxShadow: '0px 3px 16px 0px #0000001A',
  [theme.breakpoints.down('sm')]: {
    width: '320px',
  },
}));

const Container = styled(Box)({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: ' #E5E5E5',
});

export { Card, Container, BoxBottom, Wrapper, inputStyle, Return };
