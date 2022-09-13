/* eslint-disable no-nested-ternary */
import React from 'react';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Card, TabNavWide } from 'shared';
import { ReactComponent as EditIcon } from 'assets/EditIcon.svg';

import useStyles from 'modules/CallGroupAgent/pages/WorkStation/WorkStationPoll/Response/styled.response';
import { votersInfo, voterFields } from './constant';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 4, px: 0 }}>{children}</Box>}
    </div>
  );
}

function Response({ params }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  // const [editView, setEditView] = React.useState(false);

  // const [tabKey, setTabKey] = useState('queue');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card
      style={{
        padding: '0px',
        border: '0',
        marginBottom: '6rem',
      }}
    >
      <Box className={classes.top} sx={{ p: 3 }}>
        <Stack sx={{ mb: 2 }}>
          <Box fontSize="18px" sx={{ fontWeight: 600 }}>
            Details
          </Box>
        </Stack>
        <Grid container>
          <Grid item md={12}>
            <TabNavWide
              navs={['Critical Data', 'Additional Info']}
              value={value}
              handleChange={handleChange}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ borderBottom: '0' }}>
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',

              '::-webkit-scrollbar': {
                display: 'none',
              },
              height: '350px',
              overflowX: 'hidden',

              // overflowX: 'hidden',
            }}
          >
            {voterFields.map(({ cirticalTitle, criticalRef }) => {
              return (
                <>
                  <Grid container spacing={2} sx={{ m: 2 }}>
                    <Grid item md={10}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          borderBottom: '0',
                        }}
                      >
                        <Box
                          sx={{ fontSize: '1rem', fontWeight: 600, my: '1px' }}
                        >
                          {cirticalTitle}
                        </Box>
                        <Box
                          sx={{
                            color: ' #6B6C7E',
                            fontSize: '0.875rem',
                            my: '2px',
                          }}
                        >
                          {params?.voter?.[criticalRef]}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item md={2} sx={{ mt: 3, cursor: 'pointer' }}>
                      <EditIcon />
                    </Grid>
                  </Grid>
                  <Divider width="100%" />
                </>
              );
            })}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            sx={{
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',

              '::-webkit-scrollbar': {
                display: 'none',
              },
              height: '350px',
              overflowX: 'hidden',

              // overflowX: 'hidden',
            }}
          >
            {votersInfo.map(({ addTitle, addRef, id }) => (
              <Grid container key={id}>
                <Grid item md={11}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      borderBottom: '0',
                      p: 4,
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        my: '1px',
                      }}
                    >
                      {addTitle}
                    </Box>
                    <Box
                      sx={{
                        color: ' #6B6C7E',
                        fontSize: '0.875rem',
                        my: '2px',
                      }}
                    >
                      {params?.voter?.[addRef]}
                      {console.log('hee', params?.voter?.[addRef])}
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={1} sx={{ mt: 3, cursor: 'pointer' }}>
                  <EditIcon />
                </Grid>
                <Divider sx={{ width: '100%' }} />
              </Grid>
            ))}
          </Box>
        </TabPanel>
      </Box>
    </Card>
  );
}

export default Response;

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

Response.propTypes = {
  params: PropTypes.string.isRequired,
};
