import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

export default function AvatarChips({ label, name, bgColor, handleDelete }) {
  const handleClick = () => {
    // eslint-disable-next-line
    console.info('You clicked the Chip.');
  };

  return (
    <Chip
      avatar={
        <Avatar sx={{ background: bgColor }}>
          <p style={{ color: '#fff' }}>{label}</p>
        </Avatar>
      }
      label={name}
      onClick={handleClick}
      onDelete={handleDelete}
      deleteIcon={<CloseIcon />}
    />
  );
}

AvatarChips.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  bgColor: PropTypes.string,
  handleDelete: PropTypes.func,
};

AvatarChips.defaultProps = {
  label: '',
  name: '',
  bgColor: '#fff',
  handleDelete: () => {},
};
