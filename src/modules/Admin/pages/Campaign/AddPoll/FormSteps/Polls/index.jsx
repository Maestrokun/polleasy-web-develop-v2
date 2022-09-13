import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import SearchIcon from '@mui/icons-material/Search';
// import InputAdornment from '@mui/material/InputAdornment';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { styled } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { ReactComponent as QuestionEmptyState } from 'assets/QuestionEmptyStateIcon.svg';

import { TextField, Button, Loader } from 'shared';

import useElectionStepper from 'hooks/useCampaignStepper';

import useAlert from 'hooks/useAlert';
import {
  getCandidatesAndParties,
  getPollById,
  getPollQuestions,
  setPollQuestions,
  updatePollQuestions,
} from 'modules/Admin/services/polls';
import useStyles from 'modules/Admin/pages/Campaign/AddPoll/FormSteps/Polls/styled.polls';
import handleApiError from 'utils/handleApiError';
import { partiesAndCandidatesTransform } from 'utils/questionDataTransform';
import QuestionsSidebar from './QuestionsSidebar';
import {
  questionTypeLookup,
  fieldTypes,
  pollTypeLookUp,
} from './pollConstants';

import PollField from './PollField';

let partyPopularityIndexField = {
  label: 'Who wil you be voting for in the upcoming presidential election?',
  options: [],
  type: 'PartyPopularity',
  id: uuid(),
  key: uuid(),
  immutable: true,
};

let candidatePopularityIndexField = {
  label: 'Who wil you be voting for in the upcoming presidential election?',
  options: [],
  type: 'CandidatePopularity',
  id: uuid(),
  key: uuid(),
  immutable: true,
};

const schema = Yup.object({
  poll_instruction: Yup.string().required('Poll instruction is required'),
});

function Polls() {
  const { campaignId, pollId } = useParams();
  const classes = useStyles();
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
  });
  const { handleNext, handlePrev } = useElectionStepper();
  const [fields, setFields] = useState([]);
  const [fetchedPolls, setFetchedPolls] = useState([]);
  // eslint-disable-next-line
  const [currentDraggable, setCurrentDraggable] = useState('');
  const { showNotification } = useAlert();
  const [pollType, setPollType] = useState(null);
  const [fetchQuestions, setFetchQuestions] = useState(false);
  const [presetOptions, setPresetOptions] = useState({
    candidates: [],
    parties: [],
  });

  const questionDataTransform = (data) => {
    const newShape = data.map((question) => ({
      label: question.title,
      options: question.options,
      type: fieldTypes[question.type],
      id: question.id,
      staticOptions:
        data[0].type === 'CANDIDATE_POPULARITY'
          ? presetOptions.candidates
          : presetOptions.parties,
      pollInstruction: question.poll_instruction,
      key: uuid(),
      immutable:
        fieldTypes[question.type] === 'CandidatePopularity' ||
        fieldTypes[question.type] === 'PartyPopularity',
    }));
    return newShape;
  };

  const { isLoading: loadingPartiesAndCandidates } = useQuery(
    ['get-candidates-parties'],
    () => getCandidatesAndParties(campaignId),
    {
      enabled: !!campaignId,
      onError: (e) => {
        showNotification(handleApiError(e), { type: 'error' });
      },
      onSuccess: ({ data }) => {
        const { contestants, parties } = partiesAndCandidatesTransform(
          data?.data
        );

        const candidatesOptions = contestants?.map((candidate, index) => ({
          key: `option${index + 1}`,
          value: candidate,
          label: candidate,
        }));

        const partiesOptions = parties?.map((party, index) => ({
          key: `option${index + 1}`,
          value: party,
          label: party,
        }));

        setPresetOptions({
          candidates: candidatesOptions,
          parties: partiesOptions,
        });

        candidatePopularityIndexField = {
          ...candidatePopularityIndexField,
          options: candidatesOptions,
          staticOptions: candidatesOptions,
        };

        partyPopularityIndexField = {
          ...partyPopularityIndexField,
          options: partiesOptions,
          staticOptions: partiesOptions,
        };

        setFetchQuestions(true);
      },
    }
  );

  useQuery(['get-single-poll'], () => getPollById(pollId), {
    enabled: !!pollId && fetchQuestions,
    onError: (e) => {
      showNotification(handleApiError(e), { type: 'error' });
    },
    onSuccess: ({ data }) => {
      setPollType(data?.type);
      setValue('poll_instruction', data?.poll_instruction);
    },
  });

  const { isLoading: loadingQuestions } = useQuery(
    ['get-questions'],
    () => getPollQuestions(pollId),
    {
      enabled: !!pollId && fetchQuestions,
      onSuccess: ({ data }) => {
        const incomingFields = questionDataTransform(data?.data);

        setFields(incomingFields);
        setFetchedPolls(incomingFields);
      },
      onError: (e) => {
        showNotification(handleApiError(e), { type: 'error' });
      },
    }
  );

  const handlePopulateFields = (_pollType) => {
    switch (_pollType) {
      case 'CANDIDATE_POPULARITY':
        setFields([candidatePopularityIndexField, ...fields]);
        break;
      case 'PARTY_POPULARITY':
        setFields([partyPopularityIndexField, ...fields]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (fetchedPolls.length === 0) {
      handlePopulateFields(pollType);
    }
  }, [pollType, fetchedPolls]);

  const handleAddField = (selected) => {
    setFields([...fields, selected]);
  };

  const updateField = (newValues, id) => {
    const newFields = fields.map((field) => {
      if (field.id === id) return { ...field, ...newValues };
      return field;
    });
    setFields(newFields);
  };

  const handleDuplicate = (field) => {
    const uniqueId = uuid();
    const parentIndex = fields.indexOf(field);
    // eslint-disable-next-line
    const _fields = [...fields];
    const removed = _fields.splice(parentIndex + 1, _fields.length);
    setFields([
      ..._fields,
      { ...field, id: uniqueId, key: uniqueId },
      ...removed,
    ]);
  };

  const handleDelete = (id) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    setFields(reorder(fields, result.source.index, result.destination.index));
  };

  const { mutate, isLoading } = useMutation(
    fetchedPolls.length < 1 ? setPollQuestions : updatePollQuestions,
    {
      onSuccess: () => {
        showNotification(`Poll questions set successfully`, {
          type: 'success',
        });
        handleNext();
      },
      onError: (e) => {
        showNotification(handleApiError(e), { type: 'error' });
      },
    }
  );

  const onSubmit = (values) => {
    const data = fields.map((field) => ({
      options: field.options,
      required: true,
      type: questionTypeLookup[field.type],
      title: field.label,
      max_field_rating: field.max_field_rating ?? 0,
    }));
    const payload = {
      questions: data,
      poll_instruction: values.poll_instruction,
    };
    mutate({ pollId, payload });
  };

  if (loadingQuestions || loadingPartiesAndCandidates) {
    return <Loader />;
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h3">Polls</Typography>
      <div style={{ color: '#6B6C7E', fontSize: 14 }}>
        {pollTypeLookUp[pollType]}
      </div>
      <form>
        <Box mt="32px" className={classes.pollQuestionsBox}>
          <div className="questionArea">
            <Box sx={{ padding: '8px', height: '68px' }}>
              <TextField
                placeholder="Type an instruction for the call agent"
                control={control}
                label="Instruction"
                name="poll_instruction"
              />
            </Box>
            <ScrollArea>
              {fields.length > 0 ? (
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="customFormFields">
                    {(provided) => (
                      <Wrapper
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <FormFields>
                          {fields.map((field, index) => (
                            <Draggable
                              key={field.id}
                              isDragDisabled={field.immutable}
                              index={index}
                              draggableId={field.id}
                            >
                              {(_provided) => (
                                <div
                                  ref={_provided.innerRef}
                                  {..._provided.draggableProps}
                                  {..._provided.dragHandleProps}
                                >
                                  <PollField
                                    field={field}
                                    updateField={updateField}
                                    onDuplicate={handleDuplicate}
                                    onDelete={handleDelete}
                                    setCurrentDraggable={setCurrentDraggable}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </FormFields>
                      </Wrapper>
                    )}
                  </Droppable>
                </DragDropContext>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: 632,
                  }}
                >
                  <QuestionEmptyState />
                  <Typography
                    sx={{
                      textAlign: 'center',
                      padding: '12px',
                      maxWidth: '320px',
                      color: '#6B6C7E',
                    }}
                    variant="caption"
                  >
                    Drag or click a field option from the right to create
                    questions or use the search field above to browse an
                    editable template from previous poll questions.
                  </Typography>
                </Box>
              )}
            </ScrollArea>
          </div>
          <div className="dragArea">
            <Box sx={{ padding: '8px', height: '68px', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ m: 3.7 }}>
                Fields
              </Typography>
            </Box>
            <QuestionsSidebar onAddField={handleAddField} />
          </div>
        </Box>

        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          className="btnAction"
          sx={{ mt: 2 }}
        >
          <Grid item>
            <Button onClick={handlePrev} className="btnCancel">
              Previous
            </Button>
          </Grid>
          <Grid item>
            <Button loading={isLoading} onClick={handleSubmit(onSubmit)}>
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

const Wrapper = styled('div')(() => ({
  width: '100%',
  minHeight: 450,
  margin: 0,
}));

const FormFields = styled('div')(() => ({
  width: 606,
  maxWidth: 606,
  margin: 0,
  '& > *': {
    marginTop: 16,
  },
  '& > :first-child': {
    marginTop: 0,
  },
}));

const ScrollArea = styled('div')(() => ({
  borderTop: `1px solid #E5E5EA`,
  // padding: 15,
  height: 632,
  margin: 0,
  overflowY: 'auto',
  width: '100%',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
}));

export default Polls;
