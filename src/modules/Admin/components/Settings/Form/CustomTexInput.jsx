import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

const ITEM_HEIGHT = 80;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      overflowX: 'hidden',
      boxSizing: 'border-box',
    },
  },
};

function TextField({
  label,
  name,
  type,
  control,
  className,
  multiline,
  variant,
  showHelperText,
  select,
  children,
  onChange,
  ...rest
}) {
  if (multiline) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { value, ref }, fieldState: { error } }) => (
          <MuiTextField
            size="medium"
            label={label}
            onChange={onChange}
            multiline
            variant={variant}
            rows={8}
            type={type}
            inputRef={ref}
            value={value}
            error={!!error}
            helperText={error?.message}
            className={className}
            fullWidth
            {...rest}
          />
        )}
      />
    );
  }

  if (select) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, value, onBlur }, fieldState: { error } }) => (
          <FormControl sx={{ width: '100%', mb: 4 }} error={!!error}>
            <InputLabel>{label}</InputLabel>
            <Select
              onChange={onChange}
              onBlur={onBlur}
              label={label}
              value={value}
              inputRef={ref}
              input={<OutlinedInput label={label} />}
              MenuProps={MenuProps}
              fullWidth
              sx={{ textTransform: 'capitalize' }}
            >
              {children}
            </Select>
            <FormHelperText>{error && error.message}</FormHelperText>
          </FormControl>
          // />
        )}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ref, onBlur }, fieldState: { error } }) => (
        <MuiTextField
          size="medium"
          label={label}
          onBlur={onBlur}
          onChange={onChange}
          type={type}
          variant={variant}
          inputRef={ref}
          value={value}
          error={!!error}
          helperText={showHelperText ? error?.message : null}
          className={className}
          fullWidth
          {...rest}
        />
      )}
    />
  );
}

export default TextField;

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  control: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  multiline: PropTypes.bool,
  className: PropTypes.string,
  showHelperText: PropTypes.bool,
  select: PropTypes.bool,
  children: PropTypes.node,
};

TextField.defaultProps = {
  multiline: false,
  variant: 'outlined',
  className: '',
  label: '',
  type: 'text',
  showHelperText: true,
  select: false,
  children: null,
};
