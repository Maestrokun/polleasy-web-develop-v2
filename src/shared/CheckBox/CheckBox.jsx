/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import MuiCheckbox from '@mui/material/Checkbox';

function CheckBox({
  name,
  onChange,
  options = [],
  row,
  value,
  formLabel,
  helperText,
  error,
  allLabel,
}) {
  const allValue = options.map((v) => v.value);
  const handleChange = (e, value1) => {
    if (value1 === 'all') {
      if (value.length === options.length) {
        return [];
      }
      return allValue;
    }

    if (value?.includes(value1)) {
      return [...value, value1];
    }

    const filterValue = value?.filter((v) => v !== value1);
    return filterValue;
  };
  return (
    <FormControl
      data-testid="reusable-checkbox-control"
      margin="none"
      fullWidth
      // sx={{ m: 3 }}
      component="fieldset"
      variant="standard"
      name={name}
    >
      <FormLabel component="legend">{formLabel}</FormLabel>
      <FormGroup row={row}>
        {allLabel && (
          <FormControlLabel
            labelPlacement="end"
            label="All"
            control={
              <MuiCheckbox
                size="medium"
                checked={value === allValue}
                onChange={(e) => onChange(handleChange(e, 'all'))}
              />
            }
            sx={{
              '& .MuiFormControlLabel-label': {
                marginLeft: '6px',
              },
            }}
          />
        )}
        {options.length &&
          options?.map((option) => (
            <FormControlLabel
              key={option.label}
              labelPlacement="end"
              label={option?.label}
              control={
                <MuiCheckbox
                  size="medium"
                  checked={value?.includes(option?.value)}
                  onChange={(e) => onChange(handleChange(e, option?.value))}
                />
              }
              sx={{
                '& .MuiFormControlLabel-label': {
                  marginLeft: '6px',
                },
              }}
            />
          ))}
      </FormGroup>
      {helperText && error && (
        <FormHelperText
          component="span"
          data-testid="reusable-checkbox-message"
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

CheckBox.propTypes = {
  formLabel: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.array,
  row: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  error: PropTypes.object,
  allLabel: PropTypes.bool,
};

CheckBox.defaultProps = {
  value: [],
  row: false,
  onChange: () => null,
  helperText: '',
  error: null,
  allLabel: false,
};

export default CheckBox;
