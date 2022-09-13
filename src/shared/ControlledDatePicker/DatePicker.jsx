/* eslint-disable */
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, SvgIcon } from '@mui/material';
// import { LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import PropTypes from 'prop-types';

import { ReactComponent as Calendar } from 'assets/calendarIcon.svg';
// import InputField from './InputField';

const CalendarIcon = () => <SvgIcon component={Calendar} viewBox="0 0 16 16" />;

const DatePicker = ({ value, error, helperText, label, sx, ...rest }) => {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line
  const classes = useStyles();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        disableMaskedInput
        open={open}
        onClose={() => setOpen(false)}
        className={classes.root}
        fullWidth
        label={label}
        value={value}
        onChange={() => {}}
        components={{
          OpenPickerIcon: CalendarIcon,
        }}
        {...rest}
        renderInput={(params) => (
          <TextField
            inputProps={{ readOnly: true }}
            onClick={() => setOpen(true)}
            fullWidth
            {...params}
            helperText={helperText}
            className={classes.root}
            error={error}
            sx={sx}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;

DatePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  helperText: PropTypes.string,
};

DatePicker.defaultProps = {
  label: '',
  value: null,
  error: null,
  helperText: '',
};

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiIconButton-edgeEnd': {
      marginRight: 0,
    },

    '& input::placeholder': {
      opacity: 0,
    },

    '& .MuiOutlinedInput-root .Mui-disabled': {
      background: '#EDEBE9',
    },

    '& .MuiSvgIcon-root': {
      color: 'transparent',
      fontSize: 15,
      stroke: '#8A8886',
    },
  },
}));
