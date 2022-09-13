import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

function SearchComp({ search }) {
  return (
    <TextField
      type="text"
      label="Search"
      fullWidth
      onChange={search.onChange}
      variant="outlined"
      size="small"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

SearchComp.propTypes = {
  search: PropTypes.string.isRequired,
};

export default SearchComp;
