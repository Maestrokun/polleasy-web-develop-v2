/* eslint-disable */
import React from 'react';
// import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
// import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { useQuery } from 'react-query';

import { TextField, Card, MultiSelect } from 'shared';
// import { TARGET_COUNT } from 'constant/callCenterData';

import targetIcon from 'assets/blueTarget.svg';
import { getPollPreview } from 'modules/Admin/services/polls';

// const defaultValues = {
//   has_occupation: true,
//   occupations: ['string'],
//   allow_null_occupations: true,
//   has_gender: true,
//   gender: 'MALE',
//   allow_binary_gender: true,
//   has_age: true,
//   allow_null_age: true,
//   min_age: 2147483647,
//   max_age: 2147483647,
//   has_location: true,
//   locations: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
// };

export const CAMPAIGN_TYPE = [
  { PRESIDENTIAL: 'PRESIDENTIAL' },
  { GUBERNATORIAL: 'GUBERNATORIAL' },
  { SENATORIAL: 'SENATORIAL' },
  { HOUSE_ASSEMBLY: 'HOUSE_ASSEMBLY' },
  { HOUSE_OF_REPRESENTATIVE: 'HOUSE_OF_REPRESENTATIVE' },
  { CHAIRMANSHIP: 'CHAIRMANSHIP' },
  { COUNCILLORSHIP: 'COUNCILLORSHIP' },
];

function ManualTarget({ control, setValue, watch, options, errors, pollId }) {
  const {
    has_gender,
    has_age,
    allow_null_age,
    has_location,
    gender,
    allow_binary_gender,
  } = watch();

  const { data } = useQuery(['poll-preview'], () => getPollPreview(pollId));

  const handleGenderSelection = () => {
    setValue('gender', gender === 'MALE' ? 'FEMALE' : 'MALE');
  };

  const handleGender = (event) => {
    setValue('has_gender', event.target.checked);
    if (event.target.checked) {
      setValue('gender', 'MALE');
    } else {
      setValue('gender', null);
      setValue('allow_binary_gender', false);
    }
  };

  const handleAgeRange = (event) => {
    setValue('has_age', event.target.checked);
    if (!event.target.checked) {
      setValue('min_age', null);
      setValue('max_age', null);
      setValue('allow_null_age', false);
    }
    // setAgeRange(event.target.checked);
  };

  return (
    <>
      <Card>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 2,
            p: 2,
          }}
        >
          <img src={targetIcon} alt="" />
          <Typography
            variant="title1"
            sx={{
              ml: 2,
            }}
          >
            {' '}
            Target Count :
            <Typography variant="h5" component="span">
              {` ${data?.data?.data?.targets?.toLocaleString('en-US') ?? 0}`}
            </Typography>
          </Typography>
        </Box>
      </Card>
      {/* <Box mt="24px">
        <Typography>Location</Typography>
        <TextField select control={control} name="locations" label="location">
          {options?.map(({ label, value }) => (
            <MenuItem key={label} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      </Box> */}
      <Box mt="32px">
        <MultiSelect
          options={options}
          errors={errors}
          setValue={setValue}
          control={control}
          formlabel="Location"
          name="locations"
          watch={watch}
        />
      </Box>
      <Box mt="24px" display="flex" alignItems="center">
        <Typography>Gender (optional)</Typography>
        <Switch
          checked={watch('gender')}
          onChange={handleGender}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <GenderBox
          onClick={handleGenderSelection}
          disabled={gender === 'FEMALE' || !has_gender}
        >
          Male
        </GenderBox>
        <GenderBox
          onClick={handleGenderSelection}
          disabled={gender === 'MALE' || !has_gender}
        >
          Female
        </GenderBox>
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            defaultUnChecked
            checked={allow_binary_gender}
            size="small"
          />
        }
        disabled={!has_gender}
        onClick={() => setValue('allow_binary_gender', !allow_binary_gender)}
        inputProps={{ 'aria-label': 'controlled' }}
        label="Voters without a stated gender should be added"
      />
      <Box mt="24px" display="flex" alignItems="center">
        <Typography>Age Range (optional)</Typography>
        <Switch
          checked={has_age}
          onChange={handleAgeRange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        width="346px"
        justifyContent="space-between"
      >
        <TextField
          disabled={!has_age}
          control={control}
          name="min_age"
          label={has_age ? 'min' : ''}
          sx={{ width: 162 }}
          type="number"
        />
        <TextField
          disabled={!has_age}
          control={control}
          name="max_age"
          label={has_age ? 'max' : ''}
          sx={{ width: 162 }}
          type="number"
        />
      </Box>
      <FormControlLabel
        control={
          <Checkbox checked={allow_null_age} defaultUnChecked size="small" />
        }
        onClick={() => setValue('allow_null_age', !allow_null_age)}
        disabled={!has_age}
        inputProps={{ 'aria-label': 'controlled' }}
        label="Voters without a stated age should be added"
      />
    </>
  );
}

const GenderBox = styled('div')(({ disabled }) => ({
  height: 33,
  borderRadius: 8,
  width: 131,
  padding: 8,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: disabled ? '1px solid #A7A9BC' : '1px solid #0050C8',
  background: disabled ? '#E7E7ED' : '#F0F5FF',
  color: disabled ? '#A7A9BC' : '#0050C8',
  fontSize: 14,
  marginRight: 16,
  cursor: 'pointer',
}));

ManualTarget.propTypes = {
  control: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  setValue: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  watch: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  options: PropTypes.array,
  errors: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

ManualTarget.defaultProps = {
  setValue: () => {},
  watch: () => {},
  options: [],
  errors: () => {},
  loading: false,
};

export default ManualTarget;
