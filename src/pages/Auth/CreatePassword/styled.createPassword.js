import { styled } from '@mui/material/styles';
import PasswordStrengthBar from 'react-password-strength-bar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Card = styled(Paper)(({ theme }) => ({
  width: '448px',
  display: 'flex',
  // padding: 16,
  elevation: 0,
  borderRadius: '4px',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '1em',
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

const AppBar = styled(PasswordStrengthBar)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  minLength: 6,
  justifyContent: 'space-around',
  '& > :first-child': {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    '& > div': {
      minLength: 6,
      height: `5px !important`,
      borderRadius: 5,
    },
  },
});

const PasswordValidator = styled('div')({
  marginTop: '10px',
  width: '100%',
});

const BoxBottom = styled(Box)({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '',
});

const Wrapper = styled(Box)({
  marginTop: '4em',
});

const inputStyle = {
  '& .MuiInputBase-root': {
    borderRadius: '3px !important',
    border: '0',
    height: 48,
    display: 'flex',
    alignItems: 'center',
  },
};

export {
  Card,
  Container,
  AppBar,
  PasswordValidator,
  BoxBottom,
  Wrapper,
  inputStyle,
};
