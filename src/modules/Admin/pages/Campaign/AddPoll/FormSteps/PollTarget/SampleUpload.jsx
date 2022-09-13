import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';

import { Card } from 'shared';
import { TARGET_COUNT } from 'constant/callCenterData';

import targetIcon from 'assets/svg/targetIcon.svg';

import BulkCreateForm from 'modules/Admin/components/Agent/Form/BulkCreateForm/BulkCreateForm';

import useStyles from 'modules/Admin/components/Agent/Drawer/AddAgent/styled.multipleUserDrawer';

function SampleUpload() {
  const { control } = useForm();
  const classes = useStyles();
  const handleFormatDownload = () => {
    const link = document.createElement('a');
    link.download = `sample.csv`;
    link.href = '/sample.csv';
    link.click();
  };
  return (
    <Grid container sx={{ mt: 10 }}>
      <Grid item md={12} sx={{ mb: 5 }}>
        <Card>
          <Grid container>
            <Grid item md={12}>
              <Box
                sx={{
                  display: 'flex',
                  mt: 2,
                  p: 2,
                }}
              >
                <img src={targetIcon} alt="" />
                <Typography
                  variant="title1"
                  sx={{
                    ml: 2,
                  }}
                >
                  {' '}
                  Target Count:
                  <Typography variant="h5" component="span">
                    15,000,000
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Divider />
            </Grid>
            <Grid item md={12}>
              <Box
                sx={{
                  display: 'flex',
                  mt: 2,
                  p: 2,
                }}
              >
                {TARGET_COUNT.map((target) => {
                  const { name, number, icon } = target;
                  return (
                    <>
                      <img src={icon} alt={name} />
                      <Typography variant="title1">
                        {name}:
                        <Typography
                          variant="body1"
                          component="span"
                          sx={{
                            mr: 2,
                          }}
                        >
                          {' '}
                          {number}{' '}
                        </Typography>
                      </Typography>
                    </>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Box className={classes.root}>
        <Typography variant="body1" onClick={handleFormatDownload}>
          Download CSV Format
        </Typography>
      </Box>
      <Grid item md={12}>
        <BulkCreateForm control={control} />
      </Grid>
    </Grid>
  );
}

export default SampleUpload;
