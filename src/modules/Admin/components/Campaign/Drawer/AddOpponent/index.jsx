/* eslint-disable */
import React, { useCallback, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';

import { Drawer, TextField } from 'shared';

import useModal from 'hooks/useModal';

import useStyles from 'modules/Admin/components/Campaign/Drawer/AddOpponent/styled.addOpponent';
import { Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const schema = Yup.object({
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
  party: Yup.string().required('Required'),
});

function AddOpponent({
  opponents,
  setOpponents,
  data,
  isLoading,
  payload,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  setSearch,
  search,
}) {
  const { ref, inView } = useInView();
  const classes = useStyles();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      party: '',
    },
    resolver: yupResolver(schema),
  });
  const [state, setState] = useModal();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = useCallback(
    (data) => {
      setState({
        ...state,
        modalName: 'successModal',
        message: 'Opponent Successfully Added',
        redirect: 'You will be redirected to opponent page',
        data: payload,
      });
      setOpponents([
        ...opponents,
        {
          party: JSON.parse(data.party)?.id,
          firstname: data.firstname,
          lastname: data.lastname,
          flag: JSON.parse(data.party)?.flag,
          alias: JSON.parse(data.party)?.alias,
          name: JSON.parse(data.party)?.name,
        },
      ]);
      reset();
    },
    [state]
  );

  return (
    <Drawer
      drawerName="addOpposition"
      titleText="Add Opponent"
      primaryButton="Add"
      secondaryButton="Cancel"
      handleSubmit={handleSubmit(onSubmit)}
    >
      <Box className={classes.root} component="form">
        <TextField control={control} name="firstname" label="First Name" />
        <TextField control={control} name="lastname" label="Last Name" />
        <TextField control={control} name="party" label="Party" select>
          <Box className={classes.searchBox}>
            <TextField
              control={control}
              value={search}
              name="search"
              placeholder="Search"
              type="search"
              onChange={handleSearch}
              onKeyDown={(e) => e.stopPropagation()}
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

export default AddOpponent;
