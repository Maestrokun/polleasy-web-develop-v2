import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PropTypes from 'prop-types';

function Breadcrumbs({ links, back }) {
  const navigate = useNavigate();
  return (
    <Box
      margin={2}
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
    >
      {back ? (
        <KeyboardBackspaceIcon
          onClick={() => navigate(-1)}
          sx={{ cursor: 'pointer', marginRight: '0.5rem' }}
        />
      ) : null}
      <MuiBreadcrumbs>
        {links?.map((link, index) => {
          const isCurrent = index + 1 === links?.length;
          return (
            <Box key={link.path}>
              {isCurrent ? (
                <Typography variant="" color="#000">
                  {link.path}
                </Typography>
              ) : (
                <Link to={link.to} style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ textTransform: 'capitalize !important' }}
                  >
                    {link.path}
                  </Typography>
                </Link>
              )}
            </Box>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
}

export default Breadcrumbs;

Breadcrumbs.propTypes = {
  links: PropTypes.shape([{ path: PropTypes.string, to: PropTypes.string }])
    .isRequired,
  back: PropTypes.bool,
};

Breadcrumbs.defaultProps = {
  back: false,
};
