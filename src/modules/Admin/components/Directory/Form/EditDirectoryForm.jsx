import * as React from 'react';
// import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

import { TextField } from 'shared';

import { userDesignation, userStates, userLGA } from 'constant/directoryData';

import useStyles from 'modules/Admin/components/Directory/Form/styled.editDirectoryForm';

function EditDirectoryForm({ control }) {
  const classes = useStyles();
  // const inputFieldMargin = 5;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '88vh' }}>
      <Box m={4} sx={{ flex: 1 }}>
        <Box className={classes.form}>
          <TextField
            control={control}
            label="First Name"
            name="firstname"
            // sx={{ mt: inputFieldMargin }}
          />
          <TextField
            control={control}
            label="Last Name"
            name="lastname"
            // sx={{ mt: inputFieldMargin }}
          />
          <TextField
            control={control}
            label="Phone Number"
            name="phone_number"
            // sx={{ mt: inputFieldMargin }}
          />
          <TextField
            select
            control={control}
            label="Designation"
            name="designation"
            // sx={{ mt: inputFieldMargin }}
          >
            <Box className={classes.searchBox}>
              <TextField
                control={control}
                name="search"
                placeholder="Search"
                type="search"
                onChange={() => {}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <MenuItem value="">None</MenuItem>
            {userDesignation.map((item) => (
              <MenuItem key={item.key} value={item.value}>
                {item.title}
              </MenuItem>
            ))}
          </TextField>
          <Box mt={6} mb={0} pb={0}>
            <Typography variant="body1">COVERAGE</Typography>
          </Box>
          <TextField
            select
            control={control}
            label="State"
            name="state"
            // sx={{ mt: inputFieldMargin }}
          >
            <Box className={classes.searchBox}>
              <TextField
                control={control}
                name="search"
                placeholder="Search"
                type="search"
                onChange={() => {}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <MenuItem value="">None</MenuItem>
            {userStates.map((item) => (
              <MenuItem key={item.key} value={item.value}>
                {item.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            control={control}
            label="LGA"
            name="lga"
            // sx={{ mt: inputFieldMargin }}
          >
            <Box className={classes.searchBox}>
              <TextField
                control={control}
                name="search"
                placeholder="Search"
                type="search"
                onChange={() => {}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <MenuItem value="">None</MenuItem>
            {userLGA.map((item) => (
              <MenuItem key={item.key} value={item.value}>
                {item.title}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
    </Box>
  );
}

EditDirectoryForm.propTypes = {
  control: PropTypes.shape({}),
};

EditDirectoryForm.defaultProps = {
  control: {},
};

export default EditDirectoryForm;
