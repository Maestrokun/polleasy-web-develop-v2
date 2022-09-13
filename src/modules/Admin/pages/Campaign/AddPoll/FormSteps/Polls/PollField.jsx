/* eslint-disable */
import { useState } from 'react';
import { IconButton, styled } from '@mui/material';
import { ReactComponent as DirectionArrows } from 'assets/DirectionArrows.svg';
import { ReactComponent as PencilWrite } from 'assets/PencilWrite.svg';
import { ReactComponent as Duplicate } from 'assets/Duplicate.svg';
import { fieldTypes } from './pollConstants';
import PollEdit from './PollEdit';
import {
  SingleAnswer,
  MultipleAnswers,
  Rating,
  Popularity,
} from './PollQuestionTypes';

const components = {
  [fieldTypes.SINGLE_ANSWER]: SingleAnswer,
  [fieldTypes.MULTIPLE_ANSWER]: MultipleAnswers,
  [fieldTypes.STAR_RATING]: Rating,
  [fieldTypes.CANDIDATE_POPULARITY]: Popularity,
  [fieldTypes.PARTY_POPULARITY]: Popularity,
};

const PollField = ({
  field,
  updateField,
  onDuplicate,
  onDelete,
  setCurrentDraggable,
  readOnly = false,
}) => {
  const [showControls, setShowControls] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleOnMouseEnter = () => {
    setShowControls(true);
  };
  const handleOnMouseLeave = () => {
    setShowControls(false);
  };

  const handleClose = () => {
    setShowControls(false);
    setEditMode(false);
  };

  if (editMode)
    return (
      <PollEdit
        onClose={handleClose}
        updateField={updateField}
        field={field}
        onDelete={onDelete}
      />
    );

  const Component = components[field.type];

  if (readOnly) {
    return (
      <Wrapper>
        <Component field={field} />
      </Wrapper>
    );
  }

  return (
    <Wrapper
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className="control">
        {showControls ? (
          <Control>
            {!field.immutable && (
              <IconButton
                disableRipple
                onMouseEnter={() => {
                  setCurrentDraggable(field.id);
                }}
                onMouseLeave={() => setCurrentDraggable('')}
              >
                <DirectionArrows />
              </IconButton>
            )}
            <IconButton disableRipple onClick={() => setEditMode(true)}>
              <PencilWrite />
            </IconButton>
            {!field.immutable && (
              <IconButton disableRipple onClick={() => onDuplicate(field)}>
                <Duplicate />
              </IconButton>
            )}
          </Control>
        ) : null}
      </div>
      <Component field={field} />
    </Wrapper>
  );
};

const Wrapper = styled('div')(({ theme }) => ({
  border: `1px solid #E5E5EA`,
  padding: 8,
  width: '100%',
  borderRadius: '8px',
  '& .MuiTextField-root .Mui-disabled': {
    background: 'white',
    opacity: 1,
    '-webkit-text-fill-color': theme.palette.text.primary,
  },
  '& .control': {
    height: 32,
  },
  '& .MuiIconButton-root:hover': {
    background: 'transparent',
  },
  '& textarea': {
    resize: 'none',
  },
}));

const Control = styled('div')(({ theme }) => ({
  background: theme.palette.grey.light,
  borderRadius: '8px 8px 0 0',
}));

export default PollField;
