import { useState } from 'react';

const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const toggleMenu = (e) => {
    e?.stopPropagation();
    setAnchorEl(e?.currentTarget);
  };

  const handleClose = (e) => {
    e?.stopPropagation();
    setAnchorEl(null);
  };
  return { anchorEl, openMenu, toggleMenu, handleClose };
};

export default useMenu;
