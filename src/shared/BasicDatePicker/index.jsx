/* eslint-disable */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes from 'prop-types';

export default function BasicDatePicker({ label, value, setValue,...rest }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
      
        label={label}
        inputFormat="dd-MM-yyyy"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        {...rest}
        renderInput={(params) => (
          <TextField {...params} sx={{ width: '100%' }} />
        )}
      />
    </LocalizationProvider>
  );
}

// BasicDatePicker.propTypes = {
//   label: PropTypes.string.isRequired,
//   onChange: Proptypes.func.isRequired
// }
