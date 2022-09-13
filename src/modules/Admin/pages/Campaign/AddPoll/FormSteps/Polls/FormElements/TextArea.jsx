/* eslint-disable */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { TextareaAutosize, FormHelperText, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { pxToRem } from 'utils/formatFont';

const TextArea = ({
  value,
  onChange,
  label,
  error,
  errorMessage,
  maxRows,
  minRows,
  maxLength,
  defaultValue,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleBlur = (e) => {
    const trimmedValue = e.target.value?.trim()?.length;
    if (maxLength && trimmedValue > maxLength) {
      // mocking the event object
      onChange({
        target: {
          value: '',
        },
      });
    } else {
      onChange(e);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    handleBlur(e);
  };

  const lengthErrorMessage =
    maxLength && maxLength < inputValue.length
      ? `Enter a maximum of ${maxLength} characters`
      : '';

  const { inputRef, helperText, ...rest } = props;

  // eslint-disable-next-line
  const classes = useStyles({ error, maxLength });
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <TextareaAutosize
        defaultValue={defaultValue}
        className={classes.root}
        value={inputValue || value}
        onChange={handleChange}
        maxRows={maxRows}
        minRows={minRows}
        ref={inputRef}
        {...rest}
      />
      {maxLength && inputValue.length <= maxLength ? (
        <span className="word-count">
          {inputValue.length} / {maxLength}
        </span>
      ) : (
        <FormHelperText error className="defaultError">
          {lengthErrorMessage}
        </FormHelperText>
      )}
      {!lengthErrorMessage ? (
        <FormHelperText error>{error?.message}</FormHelperText>
      ) : null}
    </>
  );
};

TextArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  maxRows: PropTypes.number,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  defaultValue: PropTypes.string,
};

TextArea.defaultProps = {
  value: '',
  onChange: () => {},
  label: '',
  maxRows: 10,
  maxLength: undefined,
  defaultValue: '',
};

export default TextArea;

const useStyles = makeStyles((theme) => ({
  root: ({ error, maxLength }) => ({
    color: theme.palette.primary.input,
    fontWeight: '400',
    fontSize: pxToRem(14),
    fontFamily: 'inherit',
    borderColor: 'none',
    outlineColor: error ? theme.palette.error.main : theme.palette.primary.main,
    border: `1px solid ${error ? theme.palette.error.main : '#C8C6C4'}`,
    borderRadius: 4,
    width: '100%',
    padding: '6px 8px',
    background: 'transparent',
    resize: 'none',

    '&+.word-count': {
      textAlign: 'right',
      width: '100%',
      display: 'block',
      fontSize: pxToRem(12),
      color: 'rgba(0, 0, 0, 0.4)',
    },

    '&+.MuiFormHelperText-root': {
      color: theme.palette.error.main,
      marginLeft: 16,
      marginTop: maxLength ? '-20px' : 0,
    },
    '&+.defaultError': {
      marginTop: 0,
      marginBottom: 0,
    },
  }),
}));
