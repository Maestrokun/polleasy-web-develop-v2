import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform//resolvers/yup';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import logo from 'assets/svg/PollEasy.svg';
import vector from 'assets/svg/Vector.svg';
import bgimg from 'assets/svg/Illustration-Authentication.svg';

import { Button, TextField } from 'shared';

import {
  Card,
  Container,
  BoxBottom,
  Wrapper,
  inputStyle,
} from 'pages/Auth/LoginForm/styled.loginForm';

import Roles from 'constant/personnel';

import useAuth from 'hooks/useAuth';
import useAlert from 'hooks/useAlert';

import Auth from 'utils/Auth';
import handleApiError from 'utils/handleApiError';

function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { auth } = useAuth();
  const { showNotification } = useAlert();

  const validationSchema = yup.object().shape({
    email: yup.string().email().required('Required'),
    password: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (payload) => {
    try {
      const response = await auth.signIn(payload);
      if (response) {
        const { access } = response;

        if (access) {
          Auth.setToken(access);

          const decodedUser = Auth.getDecodedJwt();
          if (decodedUser && decodedUser.role === Roles.ADMIN) {
            navigate('/admin/campaign', { replace: true });
          } else if (
            decodedUser &&
            decodedUser.role.includes(Roles.CALLGROUPAGENT)
          ) {
            navigate('/lead-call-agent/', { replace: true });
          } else if (
            decodedUser &&
            decodedUser.role.includes(Roles.CAMPAIGNMANAGER)
          ) {
            navigate('/campaign-manager/', { replace: true });
          } else if (
            decodedUser &&
            decodedUser.role.split(',').includes(Roles.INBOUNDAGENT)
          ) {
            navigate('/inbound-call-agent', { replace: true });
          } else if (
            decodedUser &&
            decodedUser.role.split(',').includes(Roles.OUTBOUNDAGENT)
          ) {
            navigate('/outbound-call-agent/', { replace: true });
          } else if (
            decodedUser &&
            decodedUser.role.includes(Roles.CALLGROUPLEADOUTBOUND)
          ) {
            navigate('/call-group-lead-outbound', { replace: true });
          } else {
            Auth.removeToken('token');
          }
        }
      }
    } catch (error) {
      showNotification?.(handleApiError(error), { type: 'error' });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <Wrapper>
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
            <Stack spacing={3} direction="column" mt="15px">
              <TextField
                name="email"
                label="Email"
                type="email"
                control={control}
                sx={inputStyle}
                showHelperText={false}
              />

              <TextField
                name="password"
                label="Password"
                control={control}
                type={showPassword ? 'text' : 'password'}
                sx={inputStyle}
                showHelperText={false}
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
            <Typography
              variant="body2"
              color="#0050C8"
              mt="8px"
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </Typography>
            <Box mt="16px">
              <Button
                fullWidth
                disableElevation
                variant="contained"
                sx={{
                  textTransform: 'none',
                  padding: '10px',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={25} sx={{ color: 'white' }} />
                ) : (
                  'Sign In'
                )}
              </Button>
            </Box>
          </form>
          <Box mt="20px" fontSize={12} fontWeight={300}>
            By signing in, you are agreeing to our
            <span style={{ color: ' #0050c8' }}>
              {' '}
              Terms &amp; Conditions and Privacy Policy.
            </span>
          </Box>
        </Card>
      </Wrapper>
      <BoxBottom>
        <img src={bgimg} alt="logo" />
      </BoxBottom>
    </Container>
  );
}

export default LoginForm;
