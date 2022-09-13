import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import { ReactComponent as FilterIcon } from 'assets/filter.svg';

import { Card, TextField } from 'shared';

import useStyles from 'modules/Admin/pages/CallGroup/ViewPolls/Response/styled.response';

function Response() {
  const classes = useStyles();
  const { control } = useForm({});
  const [isEmpty, setIsEmpty] = useState(false);

  const handleToggle = () => {
    setIsEmpty(!isEmpty);
  };

  return (
    <Card style={{ height: '50vh', padding: '0px', overflowY: 'scroll' }}>
      <Box className={classes.top}>
        <Stack sx={{ mb: 3 }}>
          <Typography variant="h5">Response</Typography>
        </Stack>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item md={10}>
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
          </Grid>
          <Grid item md={2} sx={{ textAlign: 'end' }}>
            <FilterIcon />
          </Grid>
        </Grid>
      </Box>
      <Box>
        {isEmpty ? (
          <Box onClick={handleToggle}>
            <Typography>No response yet</Typography>
          </Box>
        ) : (
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
              <Box className={classes.user}>
                <Stack direction="row" spacing={2}>
                  <Avatar>MK</Avatar>
                  <Box>
                    <Typography variant="body1">
                      Oladimeji Banke Arole
                    </Typography>
                    <Typography variant="subtitle1">
                      User ID: 01234567
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Card>
  );
}

export default Response;
