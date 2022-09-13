import React from 'react';
import PropTypes from 'prop-types';
import { Menu as MuiMenu } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import { withStyles } from '@mui/styles';

const StyledMenu = withStyles({
  paper: {
    padding: '5px 15px',
    width: 'auto',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1) !important',
    borderRadius: '4px',
    background: '#fff',
    '& .other': {
      borderTop: '1px solid #FAFAFA',
      padding: '.4em 3em .4em 0px',
      fontSize: '12.64px',
      lineHeight: '14px',
      color: '#737373',
      cursor: 'pointer',
    },
    '& .delete': {
      color: '#DC0000',
      padding: '.4em 3em .4em 0px',
      fontSize: '12.64px',
      lineHeight: '14px',
      cursor: 'pointer',
    },
    '& .primary': {
      color: '#15692A',
      padding: '.4em 3em .4em 0px',
      fontSize: '12.64px',
      lineHeight: '14px',
      cursor: 'pointer',
    },
  },
})((props) => (
  <MuiMenu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

function Menu({ handlePopeverClose, anchorEl, menuItems }) {
  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handlePopeverClose}
    >
      {menuItems.map((row) => (
        <ListItemText
          key={row.name}
          primary={row.name}
          className={row.className}
          onClick={row.action}
        />
      ))}
    </StyledMenu>
  );
}

export default Menu;

Menu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      className: PropTypes.string,
      action: PropTypes.func,
    })
  ).isRequired,
  handlePopeverClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.objectOf().isRequired,
};
