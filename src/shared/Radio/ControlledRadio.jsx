/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { capitalize } from 'lodash';
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import { useStyles } from './style';

function ControlRadioButton({
  formLabel,
  options,
  control,
  selected,
  isAll,
  allValue,
  setSelected,
  name,
  helperText,
  watch,
  errors,
  ...rest
}) {
  const classes = useStyles();
  const handleChange = (evt, onChange) => {
    setSelected && setSelected(evt.target.value);
    onChange(evt.target.value);
  };
  return (
    <>
      {options?.length > 0 && (
        <FormControl
          data-testid="reusable-checkbox-control"
          margin="none"
          fullWidth
          error={!!errors[name]}
          classes={{ root: clsx(classes.checkbox, rest?.className) }}
          {...rest}
        >
          <FormLabel>{formLabel}</FormLabel>
          <Controller
            control={control}
            name={name}
            render={({ field: { ref, onChange, ...fields } }) => (
              <RadioGroup
                aria-label={name}
                onChange={(evt) => handleChange(evt, onChange)}
                {...fields}
                row
              >
                {isAll && (
                  <FormControlLabel
                    labelPlacement="end"
                    control={
                      <Radio
                        sx={{
                          '& .MuiSvgIcon-root': {
                            fontSize: '16px',
                          },
                        }}
                      />
                    }
                    label="All"
                    value={allValue ?? 'all'}
                  />
                )}
                {options?.map((option) => (
                  <FormControlLabel
                    key={option?.label}
                    labelPlacement="end"
                    control={
                      <Radio
                        sx={{
                          '& .MuiSvgIcon-root': {
                            fontSize: '16px',
                          },
                        }}
                      />
                    }
                    label={`${capitalize(option?.label || '')}`}
                    value={option?.value}
                  />
                ))}
              </RadioGroup>
            )}
          />
          {helperText && errors[name] && (
            <FormHelperText
              component="span"
              data-testid="reusable-radio-message"
            >
              {helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    </>
  );
}
ControlRadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
      ]),
    })
  ),
  watch: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  errors: PropTypes.objectOf(PropTypes.string),
  helperText: PropTypes.string,
  formLabel: PropTypes.string,
  control: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.string }),
  ]),
  selected: PropTypes.arrayOf(PropTypes.string),
  setSelected: PropTypes.func,
  isAll: PropTypes.bool,
  allValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
ControlRadioButton.defaultProps = {
  options: [],
  control: () => {},
  helperText: '',
  formLabel: '',
  errors: {},
  watch: '',
  selected: [''],
  setSelected: () => {},
  isAll: false,
  allValue: '',
};
export default ControlRadioButton;
