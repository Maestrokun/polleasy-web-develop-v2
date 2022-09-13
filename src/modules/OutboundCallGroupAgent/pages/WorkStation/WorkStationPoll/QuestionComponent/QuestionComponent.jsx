/* eslint-disable */
import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { fieldTypes } from 'utils/questionConfig';

function QuestionComponent({ field, qtn, control, watch, errors }) {
  const Component = fieldTypes[field?.type || 'SINGLE_ANSWER'];
  return (
    <Box>
      <Typography sx={{ fontSize: 14 }}>{`Question ${
        qtn + 1 || 0
      }`}</Typography>
      <Typography sx={{ fontSize: 12 }}>{`${field?.title || '--'}`}</Typography>
      <Component
        key={field.id}
        field={field}
        errors={errors}
        watch={watch}
        helperText={'field required'}
        name={`name-${qtn || 0}`}
        control={control}
      />
      {/* {field?.options?.map((v, i) => {
        const Component = fieldTypes[v?.type || 'SINGLE_ANSWER'];
        return (
          <Component
            key={field.id}
            field={field}
            errors={errors}
            watch={watch}
            options={
              field?.options?.map((v) => ({ label: v?.key, value: v?.id })) ||
              []
            }
            helperText={'field required'}
            name={`name-${i}`}
            control={control}
          />
        );
      })} */}
    </Box>
  );
}

QuestionComponent.propTypes = {};

export default QuestionComponent;
