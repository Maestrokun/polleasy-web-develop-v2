import React, { useCallback } from 'react';
import Box from '@mui/material/Box';

import useDrawer from 'hooks/useDrawer';

import { Button, Menu } from 'shared';

export default function AddMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = useDrawer();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSingle = useCallback(() => {
    setState({ ...state, drawerName: 'addSingleUser' });
    setAnchorEl(null);
  }, [state]);

  const handleBulk = useCallback(() => {
    setState({ ...state, drawerName: 'addMultipleUser' });
    setAnchorEl(null);
  }, [state]);

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button onClick={handleClick}> Add New </Button>
      <Menu
        handlePopeverClose={handleClose}
        anchorEl={anchorEl}
        menuItems={[
          { className: 'other', name: 'Single', action: handleSingle },
          { className: 'other', name: 'Bulk Upload', action: handleBulk },
        ]}
      />
    </Box>
  );
}
