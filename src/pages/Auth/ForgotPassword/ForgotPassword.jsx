import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import * as yup from 'yup';
import { yupResolver } from '@hookform//resolvers/yup';

import logo from 'assets/svg/PollEasy.svg';
import vector from 'assets/svg/Vector.svg';
import bgimg from 'assets/svg/Illustration-Authentication.svg';

import { Button, TextField, Toast } from 'shared';

import {
  Card,
  Container,
  BoxBottom,
  Wrapper,
  inputStyle,
  Return,
} from 'pages/Auth/ForgotPassword/styled.forgotPassword';
import useAlert from 'hooks/useAlert';
import { useForgotPassword } from '../hooks/useAuthentication';

function ForgotPassword() {
  const navigate = useNavigate();
  const { showNotification } = useAlert();
  const { resetPassword } = useForgotPassword({ showNotification });
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data) => {
    const payload = {
      email: data?.email,
    };
    resetPassword({ payload });
  };

  return (
    <Container>
      <Wrapper>
        {errors.email ? <Toast message="email not found" /> : null}
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
          <Box>
            <Typography mt={6} variant="body1" textAlign="center">
              Sign in with your email
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} direction="column" mt="15px" px={3}>
              <TextField
                name="email"
                label="Email"
                type="email"
                control={control}
                sx={inputStyle}
              />
            </Stack>
            <Box mt="16px" px={3}>
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  textTransform: 'none',
                  padding: '10px',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
                type="submit"
                disabled={false}
                startIcon={
                  <CircularProgress
                    size={16}
                    sx={{
                      fontSize: 1,
                    }}
                  />
                }
              >
                Send Reset Link
              </Button>
            </Box>
          </form>
          <Return
            variant="body2"
            onClick={() => navigate('/')}
            justifyContent="center"
          >
            Back to Login
          </Return>
        </Card>
      </Wrapper>
      <BoxBottom>
        <img src={bgimg} alt="background" />
      </BoxBottom>
    </Container>
  );
}

export default ForgotPassword;
