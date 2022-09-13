import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';

import { Card } from 'shared';

import useStyles from 'modules/Admin/pages/CallGroup/ViewPolls/Response/styled.response';

function Details() {
  const classes = useStyles();
  const [isEmpty, setIsEmpty] = useState(false);

  const handleToggle = () => {
    setIsEmpty(!isEmpty);
  };

  return (
    <Card style={{ height: '50vh', padding: '0px', overflowY: 'scroll' }}>
      <Box className={classes.top}>
        <Stack
          sx={{ mb: 3 }}
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Typography variant="h5">Details</Typography>
          <Box className="timeline">
            <Typography variant="body1">Date</Typography>
            <Divider
              orientation="vertical"
              sx={{
                height: 20,
              }}
            />
            <Typography variant="body1">Time</Typography>
            <Divider
              orientation="vertical"
              sx={{
                height: 20,
              }}
            />
            <Typography variant="body1">Answered: -- of --</Typography>
          </Box>
        </Stack>
      </Box>
      <Box>
        {isEmpty ? (
          <Box onClick={handleToggle}>
            <Typography>No response yet</Typography>
          </Box>
        ) : (
          <Box className={classes.wrapper}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((question) => (
              <Box className={classes.question} key={question}>
                <Typography variant="subtitle2">Question 1</Typography>
                <Typography variant="body2">
                  Which candidate are you supporting in the coming presidential
                  election?
                </Typography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Card>
  );
}

export default Details;
