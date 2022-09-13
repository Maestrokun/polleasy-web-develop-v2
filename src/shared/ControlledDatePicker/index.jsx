/* eslint-disable */
import { Controller } from 'react-hook-form';
import DatePicker from './DatePicker';

export default function ControlledDatePicker({
  control,
  name,
  rules = {},
  label,
  ...restDateProps
}) {
  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { ref, ...rest }, fieldState: { error } }) => (
        <DatePicker
          inputFormat="MMM dd, yyyy"
          inputRef={ref}
          label={label}
          error={error}
          helperText={error?.message}
          {...restDateProps}
          {...rest}
        />
      )}
    />
  );
}
