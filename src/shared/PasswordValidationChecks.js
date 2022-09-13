/* eslint-disable */

import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

import { ReactComponent as CheckIcon } from '../assets/svg/check-icon.svg';
import {
  hasLowerCase,
  hasNumber,
  hasSpecialCharacter,
  hasUpperCase,
} from '../utils/inputUtils';

const PasswordValidationChecks = ({ password }) => {
  return (
    <Box display="flex" flexWrap="wrap">
      {passwordRequirements(password).map((requirement) => (
        <Box
          mr={3}
          my={0.5}
          display="flex"
          alignItems="center"
          key={requirement.id}
          sx={{
            color: requirement.isValid ? 'primary.main' : 'text.secondary',
          }}
        >
          <CheckIcon />
          <Typography
            variant="subtitle1"
            sx={{ minWidth: 'min-content' }}
            ml={0.5}
          >
            {requirement.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

PasswordValidationChecks.propTypes = {
  password: PropTypes.string.isRequired,
};

const passwordRequirements = (password = '') => [
  { text: 'Lower-case', isValid: hasLowerCase(password), id: 'lowerCase' },
  { text: 'At least 1 number', isValid: hasNumber(password), id: 'number' },
  {
    text: 'Special character',
    isValid: hasSpecialCharacter(password),
    id: 'specialCharacter',
  },
  {
    text: '8 or more characters',
    isValid: password?.length >= 8,
    id: 'minLength',
  },
  { text: 'Upper-case', isValid: hasUpperCase(password), id: 'upperCase' },
];

export default PasswordValidationChecks;
