import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import { Card } from 'shared';

import WORKBENCH_DATA, {
  WORKBENCH_PROGRESS_STATUS_BG,
} from 'constant/workbenchData';

import useStyles from 'modules/CallGroupAgent/pages/WorkStation/styled.workstation';

function Workstation() {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`workstation-poll`);
  };
  return (
    <Grid container spacing={5} className={classes.workbench}>
      {WORKBENCH_DATA.map((data) => (
        <Grid item md={4} key={data.id}>
          <Card>
            <Box onClick={handleNavigate} className={classes.wrapper}>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ paddingBottom: '.8em' }}
                className="container"
              >
                <Typography variant="subtitle1"> {data.title} </Typography>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: data.status === 'Complete' ? '#107C10' : '#592474',
                    background: WORKBENCH_PROGRESS_STATUS_BG[data.status],
                    borderRadius: '4px',
                    padding: '4px 7px',
                  }}
                >
                  {data.status}
                </Typography>
              </Stack>
              {/* <Typography variant="subtitle1">{data.pollName}</Typography> */}
              <Typography variant="body2" style={{ paddingBottom: '2em' }}>
                {data.rating}
              </Typography>
              <Typography variant="subtitle1">Total Calls: 200,000</Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Workstation;
