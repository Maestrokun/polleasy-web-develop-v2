import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';

import { TextField, Drawer } from 'shared';

import useModal from 'hooks/useModal';

import useStyles from 'modules/Admin/components/CallCenter/Drawer/AddCallCenter/styled.addCallCenter';

function AddCallCenter() {
  const classes = useStyles();
  const { control } = useForm({});
  const [state, setState] = useModal();
  const [selectedManager, setSelectedManager] = useState('');

  const handleDropdown = (e) => {
    setSelectedManager(e.target.value);
  };

  const handleSubmit = useCallback(() => {
    setState({
      ...state,
      modalName: 'successModal',
      message: 'Call Center Created Successfully',
      redirect: 'Redirecting in 0:6 seconds',
    });
  }, [state]);

  return (
    <Drawer
      drawerName="createCallCenter"
      handleSubmit={handleSubmit}
      titleText="Add Call Center"
      primaryButton="Create Center"
      secondaryButton="Cancel"
    >
      <Box className={classes.root} component="form">
        <TextField
          control={control}
          name="Name"
          label="Name"
          onChange={() => {}}
        />
        <TextField
          control={control}
          name="manager"
          label="Manager"
          select
          value={selectedManager}
          onChange={handleDropdown}
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
          <MenuItem
            value="Adeola Badmus"
            sx={{ m: 'auto', width: '90%', px: 0 }}
          >
            Adeola Badmus
          </MenuItem>
          <MenuItem value="Jude Benson" sx={{ m: 'auto', width: '90%', px: 0 }}>
            Jude Benson
          </MenuItem>
        </TextField>
      </Box>
    </Drawer>
  );
}

export default AddCallCenter;
