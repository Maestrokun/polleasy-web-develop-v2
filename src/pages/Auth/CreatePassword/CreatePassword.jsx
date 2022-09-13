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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import logo from 'assets/svg/PollEasy.svg';
import vector from 'assets/svg/Vector.svg';
import bgimg from 'assets/svg/Illustration-Authentication.svg';

import { Button, TextField } from 'shared';

import PasswordValidationChecks from 'shared/PasswordValidationChecks';

import {
  Card,
  Container,
  AppBar,
  PasswordValidator,
  BoxBottom,
  Wrapper,
  inputStyle,
} from 'pages/Auth/CreatePassword/styled.createPassword';

function CreatePassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [disable, setDisable] = useState(false);

  const validationSchema = yup.object().shape({
    password: yup.string().required(),
  });

  const onSubmit = (data) => {
    return data;
  };

  const { handleSubmit, control, watch } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: '',
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setShowPasswordAgain(!showPasswordAgain);
  };

  const { password } = watch();

  const watchPasswordChange = (disableButton) => {
    disable();
    setDisable(disableButton);
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
            Create New Password
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
                name="passwordagain"
                label="Confirm Password"
                control={control}
                type={showPasswordAgain ? 'text' : 'password'}
                sx={inputStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPasswordAgain ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <PasswordValidator>
              <AppBar
                minLength={6}
                barColors={[
                  '#ddd',
                  '#ddd',
                  '#E8150B',
                  '#FF8A00',
                  '#FFCD28',
                  '#00BFA6',
                ]}
                scoreWords={[
                  'Weak',
                  'Weak',
                  'Fair',
                  'Good',
                  'Strong',
                  'Strong',
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
                disabled={false}
                variant="contained"
                onClick={() => navigate('/signin')}
                sx={{
                  textTransform: 'none',
                  padding: '10px',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
                type="submit"
                startIcon={
                  <CircularProgress
                    size={16}
                    sx={{
                      fontSize: 1,
                    }}
                  />
                }
              >
                Sign Up
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
    </Container>
  );
}

export default CreatePassword;
