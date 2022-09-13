import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import useStyles from 'modules/Admin/pages/Campaign/AddNew/FormSteps/Preview/styled.preview';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';

import { Card } from 'shared';

function Questions() {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  return (
    <Box className={classes.container}>
      <Card>
        <Typography variant="h5" style={{ paddingTop: '0px' }}>
          23 Questions
        </Typography>
        <Grid container justifyContent="flex-start" spacing={4}>
          {[0, 1].map((detail) => (
            <Grid item key={detail} md={12}>
              <Card>
                <Typography variant="h5" style={{ paddingTop: '0px' }}>
                  Question 1
                </Typography>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    What candidate are you supporting in the coming election
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Peter Obi"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Atiku Abubakar"
                    />
                    <FormControlLabel
                      value="tinubu"
                      control={<Radio />}
                      label="Ahmed Tinubu"
                    />
                  </RadioGroup>
                </FormControl>
              </Card>
            </Grid>
          ))}
          <Grid item md={12}>
            <Card>
              <Typography variant="h5" style={{ paddingTop: '0px' }}>
                Question 3
              </Typography>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  What candidate are you supporting in the coming election
                </FormLabel>
                <FormControlLabel
                  value="female"
                  control={<Checkbox />}
                  label="Peter Obi"
                />
                <FormControlLabel
                  value="male"
                  control={<Checkbox />}
                  label="Atiku Abubakar"
                />
                <FormControlLabel
                  value="other"
                  control={<Checkbox />}
                  label="Ahmed Tinubu"
                />
              </FormControl>
            </Card>
          </Grid>
          <Grid item md={12}>
            <Card>
              <Typography variant="h5" style={{ paddingTop: '0px' }}>
                Question 4
              </Typography>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Rate Tinubu likelihood of emerging Nigeria President
                </FormLabel>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </FormControl>
            </Card>
            <Typography variant="body1" style={{ paddingTop: '5px' }}>
              18 more Questions
            </Typography>
            <Typography variant="body1" style={{ paddingTop: '5px' }}>
              Click here to preview all questions
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default Questions;
