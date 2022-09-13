import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import CheckBox from './CheckBox';

function ControlledCheckBox({
  control,
  name,
  watch,
  formLabel,
  options,
  helperText,
  allLabel,
  errors,
  row,
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <CheckBox
          onChange={onChange}
          formLabel={formLabel}
          value={watch(name)}
          helperText={helperText}
          options={options}
          allLabel={allLabel}
          error={errors?.[name]}
          name={name}
          row={row}
        />
      )}
    />
  );
}

ControlledCheckBox.propTypes = {
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
  watch: PropTypes.arrayOf(PropTypes.string),
  errors: PropTypes.objectOf(PropTypes.string),
  helperText: PropTypes.string,
  formLabel: PropTypes.string,
  control: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.string }),
  ]),
  allLabel: PropTypes.string,
  row: PropTypes.bool,
};

ControlledCheckBox.defaultProps = {
  options: [],
  control: () => {},
  helperText: '',
  formLabel: '',
  errors: {},
  watch: [''],
  allLabel: '',
  row: false,
};

export default ControlledCheckBox;
