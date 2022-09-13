/* eslint-disable */
import { styled, InputLabel, Box } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { ReactComponent as RatingStar } from 'assets/RatingStar.svg';
import Radio from './FormElements/Radio';
import Checkbox from './FormElements/Checkbox';
import FormLabel from '@mui/material/FormLabel';


export const SingleAnswer = ({ field }) => (
  <>
    <SingleAnswerOptions>
      <Label>{field.label}</Label>
      {field.options.map((option) => (
        <span key={uuid()}>
          <Radio label={option.value} checked={false} />
        </span>
      ))}
    </SingleAnswerOptions>
  </>
);

export const MultipleAnswers = ({ field }) => (
  <>
    <Label>{field.label}</Label>
    {field.options.map((option) => (
      <div key={uuid()}>
        <Checkbox label={option.value} />
      </div>
    ))}
  </>
);

export const Rating = ({ field }) => {
  const ratings = new Array(field.options.length).fill(
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
};

export const Popularity = ({ field }) => (
  <>
    <Label>{field.label}</Label>
    <Box mt="24px">
      {field?.options?.map((option, index) => (
          <PopularityOption>
            <div className="count">{index + 1}</div>
            <div className="partyName">{option.value}</div>
          </PopularityOption>
      ))}
    </Box>
  </>
);

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

const PopularityOption = styled('div')(() => ({
  height: 40,
  width: 498,
  border: '2px solid #E7E7ED',
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
  marginRight: '24px',
  '& .count': {
    height: 24,
    width: 24,
    marginRight: 16,
    backgroundColor: '#A7A9BC',
    borderRadius: '50%',
    color: '#F5F7FA',
    fontSize: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .partyName': {
    fontWeight: 600,
    color: '#393A4A',
    fontSize: 14,
  },
}));

