/* eslint-disable */
import React from 'react';
// import Typography from '@mui/material/Typography';
import { v4 as uuid } from 'uuid';
import { styled } from '@mui/material/styles';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '../FormElements/Checkbox';
import { ControlledCheckBox } from 'shared';

function MultipleAnswer({ field, control, watch, errors, name, helperText }) {
  return (
    <>
      <ControlledCheckBox
        errors={errors}
        watch={watch}
        formLabel={'--'}
        options={
          field?.options?.map((v) => ({ label: v?.key, value: v?.id })) || []
        }
        helperText={helperText}
        name={name}
        control={control}
      />
    </>
  );
}

MultipleAnswer.propTypes = {};

export default MultipleAnswer;
