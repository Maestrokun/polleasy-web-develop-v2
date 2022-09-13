import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Radio as MuiRadio, styled } from '@mui/material';
import { pxToRem } from 'utils/formatFont';

const Label = styled(FormControlLabel)(() => ({
  '&.MuiFormControlLabel-root': {
    margin: 0,
  },
  '& .MuiRadio-root': {
    width: 20,
    marginRight: 8,
  },
  '& .MuiFormControlLabel-label': {
    fontSize: pxToRem(14),
  },
}));

// eslint-disable-next-line
const Radio = ({ label, ...rest }) => (
  <Label control={<MuiRadio />} label={label} {...rest} />
);

Radio.propTypes = {
  label: PropTypes.string,
};

Radio.defaultProps = {
  label: '',
};

export default Radio;
