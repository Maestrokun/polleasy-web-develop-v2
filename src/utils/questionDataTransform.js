/* eslint-disable */

import { fieldTypes } from 'modules/Admin/pages/Campaign/AddPoll/FormSteps/Polls/pollConstants';
import { v4 as uuid } from 'uuid';

export const questionDataTransform = (data) => {
  const newShape = data.map((question) => ({
    label: question.title,
    options: question.options,
    type: fieldTypes[question.type],
    id: question.id,
    pollInstruction: question.poll_instruction,
    key: uuid(),
    immutable:
      fieldTypes[question.type] === 'CandidatePopularity' ||
      fieldTypes[question.type] === 'PartyPopularity',
  }));

  return newShape;
}


export const partiesAndCandidatesTransform = (data) => {
  const contestants = [data.candidate.name, 'Neutral'];
  const parties = [data.candidate.party.alias, 'Neutral'];
  data?.opponents?.forEach((field) => {
    contestants.push(field.name);
    parties.push(field.party.alias);
  });

  return { contestants, parties };
};
