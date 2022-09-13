/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
// import Typography from '@mui/material/Typography';
import { v4 as uuid } from 'uuid';
import { ControlRadioButton } from 'shared';
import { styled } from '@mui/material/styles';
import FormLabel from '@mui/material/FormLabel';

function SIngleAnswer({ field, control, watch, errors, name, helperText }) {
  return (
    <ControlRadioButton
      formLabel={`Question ${(field?.position || 0) + 1}`}
      options={
        field?.options?.map((v) => ({ label: v?.key, value: v?.id })) || []
      }
      control={control}
      watch={watch}
      errors={errors}
      name={name}
      helperText={helperText}
    />
  );
}

SIngleAnswer.propTypes = {
  field: PropTypes.shape({
    options: PropTypes.array.isRequired,
  }).isRequired,
};

export default SIngleAnswer;

const SingleAnswerOptions = styled('div')(() => ({
  marginBottom: 0,
  padding: 0,
  '& > span': {
    display: 'block',
  },
}));

const Label = styled(FormLabel)(() => ({
  fontSize: 14,
  fontWeight: 500,
  color: '#201F1E',
}));
