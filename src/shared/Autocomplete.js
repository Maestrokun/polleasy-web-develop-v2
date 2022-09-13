/* eslint-disable no-shadow */
import React from 'react';
import { Autocomplete as MuiAutocomplete } from '@mui/lab';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

function AutoComplete({ name, options, variant, ...rest }) {
  const { onChange, placeholder, value, additionalRenderer } = rest;

  return (
    <MuiAutocomplete
      value={value}
      getOptionSelected={(option, value) => {
        return option.value === value;
      }}
      options={Array.isArray(options) ? options : []}
      onChange={onChange}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.title
      }
      renderInput={(params) => (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>{additionalRenderer}</Box>
          <TextField
            {...params}
            fullWidth
            label={placeholder}
            variant={variant || 'outlined'}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        </Box>
      )}
      {...rest}
    />
  );
}

export default AutoComplete;

AutoComplete.propTypes = {
  control: PropTypes.func,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  variant: PropTypes.string,
  //   renderInput: PropTypes.func,
};

AutoComplete.defaultProps = {
  control: () => {},
  variant: 'outlined',
};
