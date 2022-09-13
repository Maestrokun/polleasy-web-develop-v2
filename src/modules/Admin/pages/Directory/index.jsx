import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { Card, SearchAndFilters, TabNav } from 'shared';

import DIRECTORY_STATUS from 'constant/directoryStatus';
import { filters } from 'constant/directoryData';

import useStyles from 'modules/Admin/pages/Directory/styled.directory';

import ArchiveModal from 'modules/Admin/components/Directory/Modal/ArchiveModal';
import UnarchiveModal from 'modules/Admin/components/Directory/Modal/UnarchiveModal';
import AddNew from 'modules/Admin/components/Directory/AddNew';
import {
  SingleUserDrawer,
  MultipleUserDrawer,
} from 'modules/Admin/components/Directory/Drawer';
import EditDirectory from 'modules/Admin/components/Directory/Drawer/EditDirectory';

import Active from 'modules/Admin/pages/Directory/Active';
import Archive from 'modules/Admin/pages/Directory/Archive';

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

function Directory() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [filterValue, setFilterValue] = useState('');

  return (
    <Box className={classes.root}>
      <Box className={classes.directory}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="body2">Directory</Typography>
          </Grid>
          <Grid item>
            <Box>
              <AddNew />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={7} sx={{ mt: 1, mb: 5 }}>
          {DIRECTORY_STATUS.map((data) => (
            <Grid item key={data.id} md={3}>
              <Card>
                <Grid container>
                  <Grid item md={12}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Grid item md={8}>
                        <Typography variant="body1">{data.status}</Typography>
                        <Typography variant="h3" sx={{ mt: 2 }}>
                          {data.count}
                        </Typography>
                      </Grid>
                      <Grid item md={2} style={{ textAlign: 'end' }}>
                        <img src={data.icon} alt="icon" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container>
          <Grid item md={12}>
            <TabNav
              navs={['Active', 'Archive']}
              value={value}
              handleChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid container mb={6}>
          <Grid item xs={8} mt={6}>
            {' '}
            <SearchAndFilters
              showFilters
              getFilterValue={setFilterValue}
              filters={filters}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.location}>
        <TabPanel value={value} index={0}>
          <Active />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Archive />
        </TabPanel>
      </Box>
      {filterValue}
      <SingleUserDrawer />
      <MultipleUserDrawer />
      <EditDirectory />
      <ArchiveModal />
      <UnarchiveModal />
    </Box>
  );
}

export default Directory;

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
