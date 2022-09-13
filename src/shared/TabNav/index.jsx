import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import useStyles from 'shared/TabNav/styled.tabnav';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabNav({ navs, value, handleChange }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        value={value}
        onChange={handleChange}
        aria-label="tab navigation"
      >
        {navs.map((nav) => (
          <Tab key={nav} label={nav} disableRipple {...a11yProps(0)} />
        ))}
      </Tabs>
    </Box>
  );
}

export default TabNav;

TabNav.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  navs: PropTypes.oneOfType([PropTypes.string]).isRequired,
  handleChange: PropTypes.func.isRequired,
};
