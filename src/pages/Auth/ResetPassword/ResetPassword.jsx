import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform//resolvers/yup';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import logo from 'assets/svg/PollEasy.svg';
import vector from 'assets/svg/Vector.svg';
import bgimg from 'assets/svg/Illustration-Authentication.svg';

import { Button, TextField, Toast } from 'shared';

import PasswordValidationChecks from 'shared/PasswordValidationChecks';

import useModal from 'hooks/useModal';

import SuccessModal from 'components/Modal';

import {
  Card,
  Container,
  AppBar,
  PasswordValidator,
  BoxBottom,
  Wrapper,
  inputStyle,
} from 'pages/Auth/ResetPassword/styled.resetPassword';
// import useAlert from 'hooks/useAlert';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCreatePassword } from '../hooks/useAuthentication';

const validationSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .required()
    .when('password', (password, schma) => {
      return password
        ? schma.test({
            test: (val) => val === password,
            message: 'password does not match',
          })
        : schma.required('Confirm Password is Required');
    }),
});

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState(false);
  // const { showNotification } = useAlert();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [disable, setDisable] = useState(false);
  const [state, setState] = useModal();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { createPassword, isSuccess, creatingPassword } = useCreatePassword({
    // showNotification,
    setModal: setState,
    state,
  });
  const onSubmit = (data) => {
    return data;
  };

  React.useEffect(() => {
    let timer;
    if (isSuccess) {
      timer = setTimeout(() => {
        navigate('/signin');
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isSuccess]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPassword(!confirmPassword);
  };

  const { password } = watch();

  const watchPasswordChange = (disableButton) => {
    setDisable(disableButton);
  };

  const handleResetPassword = (data) => {
    const payload = {
      token,
      password: data?.password,
    };
    createPassword({ payload });
  };

  return (
    <Container>
      <Wrapper>
        {errors.password || errors.password ? (
          <Toast message="Password used previously" />
        ) : null}
        <Card>
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="center"
          >
            <img
              src={vector}
              alt="Logo"
              style={{ marginTop: '24px', marginRight: '9px' }}
            />
            <img src={logo} alt="Logo" style={{ marginTop: '30px' }} />
          </Box>
          <Typography mt={6} fontSize={14} fontWeight={400} textAlign="center">
            Sign in with your email
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} direction="column" mt="15px" px={4}>
              <TextField
                name="password"
                label="Password"
                control={control}
                type={showPassword ? 'text' : 'password'}
                sx={inputStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack spacing={3} direction="column" mt="15px" px={4}>
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                control={control}
                type={confirmPassword ? 'text' : 'password'}
                sx={inputStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleConfirmPasswordVisibility}>
                        {confirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <PasswordValidator>
              <AppBar
                minLength={4}
                // barColors={[
                //   '#ddd',
                //   '#ddd',
                //   '#E8150B',
                //   '#FF8A00',
                //   '#FFCD28',
                //   // '#00BFA6',
                // ]}
                barColors={['#ddd', '#ef4836', '#f6b44d', '#2b90ef', '#25c281']}
                scoreWords={[
                  'Weak',
                  'Weak',
                  'Fair',
                  'Good',
                  'Strong',
                  // 'Very Strong',
                ]}
                shortScoreWord="Weak"
                scoreWordStyle={{
                  textAlign: `right`,
                  fontSize: '14px',
                  color: '#6B6C7E',
                }}
                password={password}
              />
            </PasswordValidator>
            <Box px={4} mt={3} mb={4}>
              <Typography
                fontSize="14px"
                color="#6B6C7E"
                sx={{ fontWeight: 500, mb: 1 }}
              >
                Password must contain:
              </Typography>
              <PasswordValidationChecks
                password={password}
                onPasswordChange={watchPasswordChange}
              />
            </Box>
            <Box mt="16px" px={4}>
              <Button
                fullWidth
                disableElevation
                disabled={disable || creatingPassword}
                variant="contained"
                sx={{
                  textTransform: 'none',
                  padding: '10px',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
                onClick={handleSubmit(handleResetPassword)}
                type="submit"
                startIcon={
                  creatingPassword && (
                    <CircularProgress
                      size={16}
                      sx={{
                        fontSize: 1,
                      }}
                    />
                  )
                }
              >
                {creatingPassword ? 'Saving...' : `Save & Continue`}
              </Button>
            </Box>
          </form>
          <Typography mb="20px" variant="body1" px={4}>
            By signing in, you are agreeing to our
            <span style={{ color: ' #0050c8' }}>
              {' '}
              Terms &amp; Conditions and Privacy Policy.
            </span>
          </Typography>
        </Card>
      </Wrapper>
      <BoxBottom>
        <img src={bgimg} alt="logo" />
      </BoxBottom>
      <SuccessModal />
    </Container>
  );
}

export default ResetPassword;
