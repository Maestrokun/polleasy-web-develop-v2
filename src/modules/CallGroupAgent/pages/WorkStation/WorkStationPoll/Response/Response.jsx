/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import { TabNav, TextField } from 'shared';

import { ReactComponent as CallButtonIcon } from 'assets/callButton.svg';

import useStyles from 'modules/CallGroupAgent/pages/WorkStation/WorkStationPoll/Response/styled.response';
// import { TabPanel } from '@mui/lab';

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
function Response() {
  const classes = useStyles();
  const { control } = useForm({});
  // const [, setPage] = useState(0);
  // const [value] = React.useState(1);
  const [value, setValue] = React.useState(0);

  // const [tabKey, setTabKey] = useState('queue');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      style={{
        minHeight: '120vh',
        padding: '0px',
        overflowY: 'scroll',
        scrollbarWidth: 'thin',
      }}
    >
      <Box className={classes.top}>
        <Stack sx={{ mb: 3 }}>
          <Typography variant="h3">Respondant</Typography>
        </Stack>
        <Grid container sx={{ mb: 3 }}>
          <Grid item md={12}>
            <TabNav
              navs={['Queue', 'Reached', 'Missed']}
              value={value}
              handleChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item md={12}>
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
        </Grid>
      </Box>
      <Box sx={{ mr: 5 }}>
        <TabPanel value={value} index={0}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
            <Grid container spacing={2} sx={{ m: 2 }}>
              <Grid item md={10}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Avatar variant="square">MK</Avatar>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      ml: 2,
                    }}
                  >
                    <Box sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                      Oladimeji Banke Arole
                    </Box>
                    <Typography variant="subtitle1">+2348070000000</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2} sx={{ mt: 3 }}>
                <CallButtonIcon />
              </Grid>
            </Grid>
          ))}{' '}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {[0, 1, 2, 3].map((done) => (
            <Grid container key={done} sx={{ m: 2 }}>
              <Grid item md={9}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Avatar variant="square">TE</Avatar>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      ml: 2,
                    }}
                  >
                    <Box sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                      Tunde Elesho
                    </Box>
                    <Typography variant="subtitle1">
                      User ID: 00000000
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={3}>
                <Typography> 1hr ago</Typography>
              </Grid>
            </Grid>
          ))}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {[0, 1, 2, 3].map(() => (
            <Grid container spacing={2} sx={{ m: 2 }}>
              <Grid item md={10}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Avatar variant="square">BL</Avatar>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      ml: 2,
                    }}
                  >
                    <Box sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                      BabaTunde Elesho
                    </Box>
                    <Typography variant="subtitle1">User ID: 555555</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2}>
                <CallButtonIcon />
              </Grid>
            </Grid>
          ))}
        </TabPanel>
      </Box>
    </Box>
  );
}

export default Response;

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
