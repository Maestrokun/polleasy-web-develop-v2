import React from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddIcon from '@mui/icons-material/Add';

import { TextField } from 'shared';

function Comment() {
  const [isToggle, isSetToggle] = React.useState(false);
  const { control } = useForm({});

  const handleToggle = () => {
    isSetToggle(!isToggle);
  };
  return (
    <Box sx={{ background: '#F0F5FF', p: 4 }} component="form">
      {isToggle ? (
        <Grid container spacing={2}>
          <Grid item md={1}>
            <MessageOutlinedIcon />
          </Grid>
          <Grid item md={10}>
            <Typography variant="body2">Add a supporting Comment</Typography>
          </Grid>
          <Grid item md={1}>
            <Box onClick={handleToggle} sx={{ cursor: 'pointer' }}>
              <AddIcon />
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item md={1}>
            <MessageOutlinedIcon />
          </Grid>
          <Grid item md={10}>
            <Typography variant="body2">Add a supporting Comment</Typography>
          </Grid>
          <Grid item md={1}>
            <Box onClick={handleToggle} sx={{ cursor: 'pointer' }}>
              <ClearOutlinedIcon />
            </Box>
          </Grid>
          <Grid item md={12}>
            <TextField
              control={control}
              name="comment"
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              fullWidth
              rows={10}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Comment;
