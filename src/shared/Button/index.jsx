import React from 'react';
import PropTypes from 'prop-types';
import { Button as MuiButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function Button({
  variant,
  color,
  size,
  onClick,
  loading,
  children,
  startIcon,
  bgColor,
  tColor,
  ...rest
}) {
  return (
    <MuiButton
      size={size}
      color={color}
      variant={variant}
      onClick={onClick}
      disabled={loading}
      {...(!loading && { startIcon })}
      {...rest}
      style={{ backgroundColor: bgColor, color: tColor }}
    >
      {children}
      {loading ? <CircularProgress size={15} /> : null}
    </MuiButton>
  );
}

export default Button;

Button.propTypes = {
  loading: PropTypes.bool,
  startIcon: PropTypes.node,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  bgColor: PropTypes.string,
  tColor: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  size: 'medium',
  color: 'primary',
  bgColor: '',
  tColor: '',
  variant: 'contained',
  loading: false,
  startIcon: null,
  onClick: null,
};
