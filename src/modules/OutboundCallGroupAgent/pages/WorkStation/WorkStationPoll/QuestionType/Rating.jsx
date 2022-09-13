/* eslint-disable */
import { InputLabel } from '@mui/material';
import React from 'react';
import { ReactComponent as RatingStar } from 'assets/RatingStar.svg';

function Rating({ field }) {
  const ratings = new Array(field.max_field_rating).fill(
    <RatingStar style={{ marginRight: 10 }} />
  );
  return (
    <>
      <InputLabel
        style={{ marginBottom: 16, color: '#201F1E', fontWeight: 500 }}
      >
        {field.label}
      </InputLabel>
      {ratings}
    </>
  );
}
Rating.propTypes = {};

export default Rating;
