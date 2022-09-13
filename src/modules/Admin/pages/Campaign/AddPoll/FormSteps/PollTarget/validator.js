import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const pollTarget = Yup.object({
  has_occupation: Yup.boolean().nullable(),
  occupations: Yup.array().nullable(),
  allow_null_occupations: Yup.boolean().nullable(),
  has_gender: Yup.boolean().nullable(),
  gender: Yup.string().nullable(),
  allow_binary_gender: Yup.boolean(),
  has_age: Yup.boolean().required('Required'),
  allow_null_age: Yup.boolean().nullable(),
  min_age: Yup.number().nullable(),
  max_age: Yup.number().nullable(),
  has_location: Yup.boolean(),
  locations: Yup.array().min(1).required('Location is required'),
});

export const pollTargetSchma = yupResolver(pollTarget);
