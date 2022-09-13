/* eslint-disable */
import { v4 as uuid } from 'uuid';
import {
  Button,
  styled,
  TextField,
  InputLabel,
  MenuItem,
  Box,
  IconButton,
  Switch,
} from '@mui/material';
import { ReactComponent as RatingStar } from 'assets/RatingStar.svg';
import { pxToRem } from 'utils/formatFont';
import Radio from './FormElements/Radio';
import TextArea from './FormElements/TextArea';
import Checkbox from './FormElements/Checkbox';
import { ReactComponent as TrashIcon } from 'assets/Trash.svg';
import { fieldConfigs } from './pollConstants';


import { fieldTypes } from './pollConstants';

export const ShortAnswer = ({ field }) => (
  <TextField fullWidth disabled value={field.placeholder} sx={{ mb: 2 }} />
);

export const LongAnswer = ({ field }) => (
  <TextArea
    maxRows={5}
    minRows={4}
    placeholder={field.placeholder}
    style={{ marginBottom: 8 }}
  />
);

export const Option = ({ field, updateField }) => {
  const onAddField = () => {
    updateField(
      {
        options: [
          ...field.options,
          { key: `option${field.options.length + 1}`, label: '' },
        ],
      },
      field.id
    );
  };

  const onRemoveField = (key) => {
    const newOptions = field.options.filter((option) => option.key !== key);
    updateField({ options: newOptions }, field.id);
  };

  const handleInputChange = (index, value) => {
    const options = field.options.map((option) => {
      if (field.options.indexOf(option) === index) {
        return { label: value, key: value, value };
      }
      return option;
    });

    updateField({ options }, field.id);
  };
  return (
    <>
      <InputLabel>{field.label}</InputLabel>
      <Box mt="15px">
        {field?.options?.map((option, index) => (
          <OptionsDiv key={uuid()}>
            {field.type === fieldTypes.SINGLE_ANSWER ? (
              <Radio checked={false} />
            ) : (
              <Checkbox checked={false} />
            )}
            <TextField
              placeholder="Answer here..."
              defaultValue={option.value}
              onBlur={(e) => handleInputChange(index, e.target.value)}
              sx={{ marginTop: '6px', marginRight: '16px' }}
            />
            <IconButton
              disabled={index < 2}
              sx={{ marginRight: '14px', opacity: index > 1 ? '1' : '0.3' }}
              disableRipple
              onClick={() => onRemoveField(option.key)}
            >
              <TrashIcon />
            </IconButton>
          </OptionsDiv>
        ))}
      </Box>
      <Button color="primary" onClick={onAddField}>
        + Add option
      </Button>
    </>
  );
};

export const Rating = ({ field, updateField }) => {
  const handleChange = (max_field_rating) => {
    const options = Array.from(new Array(max_field_rating)).map((opt, index) => ({
      key : `option${index+1}`,
      value: index +1,
      label: `${index+1}`
     }))
    updateField({ max_field_rating, options }, field.id);
  };
  const ratings = new Array(field.options.length).fill(
    <RatingStar style={{ margin: '16px 10px 12px 0' }} />
  );
  return (
    <>
      {ratings}
      <div>
        <InputLabel style={{ display: 'block', marginRight: 16 }}>
          Levels
        </InputLabel>
        <TextField
          select
          value={field.max_field_ratings}
          onChange={(e) => handleChange(e.target.value)}
          sx={{ width: 75 }}
        >
          {[
            { value: 5, name: 5 },
            { value: 4, name: 4 },
            { value: 3, name: 3 },
            { value: 2, name: 2 },
            { value: 1, name: 1 },
          ].map(({ value, name }) => (
            <MenuItem key={value} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </>
  );
};

export const Popularity = ({ field, updateField }) => {
  const handleSwitch = (e, option) => {
    if (e.target.checked) {
      updateField(
        {
          options: [...field.options, option],
        },
        field.id
      );
    } else {
      const newOptions = field.options.filter((x) => x.value !== option.value);
      updateField({ options: newOptions }, field.id);
    }
  };

  return (
    <>
      <InputLabel>{field.label}</InputLabel>
      <Box mt="24px">
        {field.staticOptions?.map((option, index) => (
          <Box display="flex" alignItems="center">
            <PopularityOption>
              <div className="count">{index + 1}</div>
              <div className="partyName">{option.value}</div>
            </PopularityOption>
            <OptionSwitch
              disabled={index < 2}
              checked={
                index < 2
                  ? false
                  : field?.options?.some(({ value }) => value === option.value)
              }
              onChange={(e) => handleSwitch(e, option)}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

const OptionsDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '40px',
  '& > *': {
    display: 'block',
    margin: 'auto 0',
  },

  '& .MuiOutlinedInput-root': {
    height: 32,
    width: 498,
  },

  '&+ button': {
    color: `${theme.palette.primary.main} !important`,
    textTransform: 'none',
    fontSize: pxToRem(14),
    display: 'block',
    paddingLeft: 0,
  },
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

const OptionSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#0050C8',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#0050C8',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: '#E7E7ED',
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
