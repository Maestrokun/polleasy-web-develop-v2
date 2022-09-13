import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  styled,
} from '@mui/material';
import { pxToRem } from 'utils/formatFont';

const Label = styled(FormControlLabel)(() => ({
  '&.MuiFormControlLabel-root': {
    margin: 0,
  },
  '& .MuiCheckbox-root': {
    width: 20,
    marginRight: 8,
  },
  '& .MuiFormControlLabel-label': {
    fontSize: pxToRem(14),
  },
}));

// eslint-disable-next-line
const Checkbox = ({ label, ...rest }) => {
  return (
    <Label control={<MuiCheckbox disableRipple />} label={label} {...rest} />
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
};

Checkbox.defaultProps = {
  label: '',
};

export default Checkbox;
