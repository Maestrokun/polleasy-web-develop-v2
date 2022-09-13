/* eslint-disable */
import { Box, Button, IconButton, styled, TextField } from '@mui/material';
import { ReactComponent as PencilIcon } from 'assets/PencilWrite.svg';
import { ReactComponent as TrashIcon } from 'assets/Trash.svg';
import { pxToRem } from 'utils/formatFont';
import { fieldTypes } from './pollConstants';
import { Option, Rating, Popularity } from './PollEditQuestionType';


const components = {
  [fieldTypes.SINGLE_ANSWER]: Option,
  [fieldTypes.MULTIPLE_ANSWER]: Option,
  [fieldTypes.STAR_RATING]: Rating,
  [fieldTypes.CANDIDATE_POPULARITY]: Popularity,
  [fieldTypes.PARTY_POPULARITY]: Popularity,
};

const PollEdit = ({ onClose, updateField, field, onDelete }) => {
  const handleInputChange = (name) => (e) => {
    name === 'required'
      ? updateField({ required: e.target.checked }, field.id)
      : updateField({ [name]: e.target.value }, field.id);
  };

  const Component = components[field.type];

  return (
    <Wrapper>
      <section className="header">
        <div>
          <Button startIcon={<PencilIcon />}>Edit</Button>
        </div>
        <div>
          <IconButton
            disabled={field.immutable}
            disableRipple
            onClick={() => onDelete(field.id)}
          >
            <TrashIcon style={{ opacity: field.immutable ? 0.3 : 1 }} />
          </IconButton>
        </div>
      </section>
      <section>
        <div className="input-changer-div">
          <TextField
            value={field.label}
            onChange={handleInputChange('label')}
          />
        </div>
        <Component field={field} updateField={updateField} />
        <Box
          display="flex"
          mt="24px"
          mr="8px"
          justifyContent="end"
          width="100%"
        >
          <DoneButton onClick={onClose}>Done</DoneButton>
        </Box>
      </section>
    </Wrapper>
  );
};

export default PollEdit;

const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 606,
  background: '#F9FAFB',
  padding: 8,
  paddingBottom: 14,
  boxShadow:
    '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',

  '& .MuiInputBase-root': {
    '& .Mui-disabled': {
      background: 'white',
    },
  },

  '& textarea': {
    resize: 'none',
    background: 'white',
  },

  '& .MuiButton-root': {
    background: '#F9FAFB',
    color: '#6B6C7E',
  },

  '& .header': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .small-input': {
      width: 219,

      '& .MuiInputBase-root input': {
        color: theme.palette.text.secondary,
      },
    },

    '& .MuiIconButton-root': {
      paddingRight: 0,
      '&:hover': {
        background: 'transparent',
      },
    },
  },

  '& .small-input .MuiInputBase-root input': {
    padding: 6.5,
  },
  '& .MuiInputAdornment-root': {
    background: '#F3F2F1',
    textAlign: 'center',
    height: 31,
    maxHeight: 31,
    margin: 0,
    width: 60,
    '& span': {
      margin: 'auto',
      display: 'block',
      color: theme.palette.text.secondary,
      fontSize: pxToRem(14),
    },
  },

  '& .input-changer-div': {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 8,

    '& > :first-child': {
      width: 418,
      maxWidth: '69%',
    },
    '& .small-input': {
      marginTop: -2,
    },
    '& .small-input .MuiSelect-select': {
      width: 158 - 12,
      padding: 6,
    },
  },

  '& .MuiFormControlLabel-label': {
    fontWeight: 400,
  },
  '& .btn-div': {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '12px',
    width: 63,

    '& .MuiButton-root': {
      fontWeight: 600,
      padding: '6px 20px',
    },
  },
}));

const DoneButton = styled('button')(({ theme }) => ({
  background: theme.palette.primary.main,
  color: '#fff',
  width: 68,
  borderRadius: 4,
  padding: '5px 16px',
  outline: 'none',
  cursor: 'pointer',
  boxShadow: 0,
  fontSize: 14,
  fontWeight: 550,
  border: 'none',
  height: 36,
  marginRight: 18,
}));
