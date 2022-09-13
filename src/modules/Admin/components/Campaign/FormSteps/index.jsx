import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import CheckIcon from '@mui/icons-material/Check';

import useStyles from 'modules/Admin/components/Campaign/FormSteps/styled.formSteps';

import useElectionStepper from 'hooks/useCampaignStepper';

function FormSteps({ title, subtitle, year, steps }) {
  const classes = useStyles();
  const { currentStep } = useElectionStepper();

  return (
    <Grid item md={2.5} component="aside" className={classes.asideWrapper}>
      <Box className="container">
        <Typography variant="body2">{title}</Typography>
        <Typography variant="h3">{subtitle}</Typography>
        <Typography variant="body1">{year && `Year: ${year}`} </Typography>

        {steps.map((counter) => (
          <Box
            key={counter.id}
            className="stepper"
            style={{
              background: currentStep === counter.id && '#F0F5FF',
              boxShadow:
                currentStep === counter.id && 'inset 3px 0px 0px #0050C8',
            }}
            // onClick={() => handleSelectedStep(counter.id)}
          >
            <Typography variant="h5" style={{ paddingLeft: '3em' }}>
              <Badge
                badgeContent={
                  currentStep > counter.id ? (
                    <CheckIcon fontSize="small" />
                  ) : (
                    counter.id
                  )
                }
                color="success"
              />
              {counter.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Grid>
  );
}

export default FormSteps;

FormSteps.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
};
