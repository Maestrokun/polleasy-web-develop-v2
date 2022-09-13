/* eslint-disable */
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { Drawer, TextField } from 'shared';

import useModal from 'hooks/useModal';
import useDrawer from 'hooks/useDrawer';

import useStyles from 'modules/Admin/components/Campaign/Drawer/EditOpponent/styled.editOpponent';

function EditOpponent({ data, isLoading, isFetchingNextPage, hasNextPage }) {
  const classes = useStyles();
  const { ref } = useInView();
  const { control, reset, getValues, handleSubmit } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      party: '',
    },
  });

  const [state, setState] = useModal();
  const [drawer, setDrawer] = useDrawer();

  useEffect(() => {
    reset({
      firstname: drawer?.data?.firstname,
      lastname: drawer?.data?.lastname,
      party: drawer?.data?.name,
    });
  }, [drawer]);

  const onSubmit = useCallback(() => {
    setState({
      ...state,
      modalName: 'successModal',
      message: 'Opponent Successfully Edited',
      redirect: 'You will be redirected to opponent page',
    });
  }, [state]);

  return (
    <Drawer
      drawerName="editOpposition"
      titleText="Edit Opponent"
      primaryButton="Save"
      secondaryButton="Cancel"
      handleSubmit={handleSubmit(onSubmit)}
    >
      <Box className={classes.root} component="form">
        <TextField control={control} name="firstname" label="First Name" />
        <TextField control={control} name="lastname" label="Last Name" />
        <TextField
          control={control}
          name="party"
          label="Party"
          select
          defaultValue="Accord"
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
          {isLoading ? (
            <Typography>Please wait</Typography>
          ) : !isLoading &&
            data?.pages?.results?.filter((party) => !party.my_party)?.length ===
              0 ? (
            <Typography>Party not found</Typography>
          ) : (
            data &&
            data?.pages
              ?.filter((party) => !party.my_party)
              ?.map((page) =>
                page?.results?.map((party) => (
                  <MenuItem
                    defaultValue={'Accord'}
                    value={JSON.stringify(party)}
                    sx={{ m: 'auto', width: '90%', px: 0 }}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    {party.name}
                  </MenuItem>
                ))
              )
          )}
          {data && data?.pages && (
            <Box
              ref={ref}
              sx={{
                mt: '2em',
                textAlign: 'center',
                height: '10px',
              }}
            >
              {isFetchingNextPage && hasNextPage && (
                <CircularProgress size={20} />
              )}
            </Box>
          )}
        </TextField>
      </Box>
    </Drawer>
  );
}

export default EditOpponent;
