import { v4 as uuid } from 'uuid';

import { ReactComponent as PartyIcon } from 'assets/svg/partyPopularity.svg';
import { ReactComponent as MultipleAnswerIcon } from 'assets/svg/MultipleQuestionIcon.svg';
import { ReactComponent as CandidateIcon } from 'assets/svg/candidatePopularity.svg';
import { ReactComponent as RatingIcon } from 'assets/svg/RatingIcon.svg';
import { ReactComponent as SingleAnswerIcon } from 'assets/svg/singleAnswerIcon.svg';

export const fieldTypes = Object.freeze({
  SINGLE_ANSWER: 'SingleAnswer',
  MULTIPLE_ANSWER: 'MultipleAnswer',
  STAR_RATING: 'Rating',
  CANDIDATE_POPULARITY: 'CandidatePopularity',
  PARTY_POPULARITY: 'PartyPopularity',
});

export const fieldLabels = {
  [fieldTypes.SINGLE_ANSWER]: 'Single Answer',
  [fieldTypes.MULTIPLE_ANSWER]: 'Multiple Answer',
  [fieldTypes.STAR_RATING]: 'Rating',
  [fieldTypes.PARTY_POPULARITY]:
    'Who wil you be voting for in the upcoming presidential election?',
  [fieldTypes.CANDIDATE_POPULARITY]:
    'Who will you be supporting in the upcoming presidential election?',
};

const options = [
  { key: 'option1', value: 'Option 1', label: 'Option 1' },
  { key: 'option2', value: 'Option 2', label: 'Option 2' },
  { key: 'option3', value: 'Option 3', label: 'Option 3' },
];

const ratingOptions = [
  { key: 'option1', value: 1, label: '1' },
  { key: 'option2', value: 2, label: '2' },
  { key: 'option3', value: 3, label: '3' },
  { key: 'option4', value: 4, label: '4' },
  { key: 'option5', value: 5, label: '5' },
];

const createConfig = (type, specialConfig = {}) => ({
  type,
  id: uuid(),
  key: '',
  label: fieldLabels[type],
  max_field_rating: type === 'Rating' ? 5 : 0,
  ...specialConfig,
});

export const fieldConfigs = [
  createConfig(fieldTypes.SINGLE_ANSWER, { options }),
  createConfig(fieldTypes.MULTIPLE_ANSWER, { options }),
  createConfig(fieldTypes.STAR_RATING, { options: ratingOptions }),
  createConfig(fieldTypes.PARTY_POPULARITY, { options: [] }),
  createConfig(fieldTypes.CANDIDATE_POPULARITY, { options: [] }),
];

export const icons = {
  [fieldTypes.SINGLE_ANSWER]: SingleAnswerIcon,
  [fieldTypes.MULTIPLE_ANSWER]: MultipleAnswerIcon,
  [fieldTypes.STAR_RATING]: RatingIcon,
  [fieldTypes.PARTY_POPULARITY]: PartyIcon,
  [fieldTypes.CANDIDATE_POPULARITY]: CandidateIcon,
};

export const questionTypeLookup = {
  SingleAnswer: 'SINGLE_ANSWER',
  MultipleAnswer: 'MULTIPLE_ANSWER',
  Rating: 'STAR_RATING',
  CandidatePopularity: 'CANDIDATE_POPULARITY',
  PartyPopularity: 'PARTY_POPULARITY',
};

export const partyPopularityDefault = {
  label: 'Who wil you be voting for in the upcoming presidential election?',
  options: [
    { key: 'option1', value: 'APC', label: 'APC' },
    { key: 'option2', value: 'Neutral', label: 'Neutral' },
    { key: 'option3', value: 'PDP', label: 'PDP' },
    { key: 'option4', value: 'LP', label: 'LP' },
    { key: 'option5', value: 'APGA', label: 'APGA' },
  ],
  type: 'PartyPopularity',
  id: uuid(),
  key: uuid(),
  immutable: true,
};

export const candidatePopularityDefault = {
  label: 'Who wil you be voting for in the upcoming presidential election?',
  options: [
    { key: 'option1', value: 'Peter Obi', label: 'Peter Obi' },
    { key: 'option2', value: 'Neutral', label: 'Neutral' },
    { key: 'option3', value: 'Rabiu KwanKwaso', label: 'Rabiu KwanKwaso' },
    { key: 'option4', value: 'Bola Ahmed Tinubu', label: 'Bola Ahmed Tinubu' },
    { key: 'option5', value: 'Adewole Adebayo', label: 'Adewole Adebayo' },
  ],
  type: 'CandidatePopularity',
  id: uuid(),
  key: uuid(),
  immutable: true,
};

export const pollTypeLookUp = {
  GENERIC: 'Generic',
  PARTY_POPULARITY: 'Party Popularity',
  CANDIDATE_POPULARITY: 'Candidate Popularity',
};
