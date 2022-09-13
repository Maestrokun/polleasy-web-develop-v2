/* eslint-disable */

export const hasNumber = (myString) => {
  return /\d/.test(myString);
};

export const hasLowerCase = (str) => {
  return /[a-z]/.test(str);
};

export const hasUpperCase = (str) => {
  return /[A-Z]/.test(str);
};

export const hasSpecialCharacter = (str) => {
  return /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(str);
};

export const inputRules = {
  email: {
    required: 'Invalid email address',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Invalid email address',
    },
  },
  phoneNumber: {
    required: 'This field is required',
    validate: {
      hasNumber: (value) => !!value.number || 'Phone number is required',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password should be minimum of 8 characters',
    },
    validate: {
      // hasUpperCase: (value) => hasUpperCase(value) || 'Should have an upper-case',
      // hasLowerCase: (value) => hasLowerCase(value) || 'Should have a lower-case',
      // hasNumber: (value) => hasNumber(value) || 'Should contain number',
      // hasSpecialCharacter: (value) => hasSpecialCharacter(value) || 'Should contain special charaters'
    },
  },
};

export const passControllerProps = ({ field: { ref, ...rest } }) => ({
  ...rest,
  inputRef: ref
});
