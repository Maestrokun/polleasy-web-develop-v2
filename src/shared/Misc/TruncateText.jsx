import React from 'react';
import TruncateMarkup from 'react-truncate-markup';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

function TruncateText({ lines, text, ...rest }) {
  //   const { lines = 2, text = '<p><p>' } = props;

  function stripHtml(html) {
    const element = document.createElement('DIV');
    element.innerHTML = html;
    return element.textContent || element.innerText || '--';
  }
  return (
    <TruncateMarkup lines={lines}>
      <Box width="100%" {...rest}>
        {stripHtml(text)}
      </Box>
    </TruncateMarkup>
  );
}

TruncateText.propTypes = {
  lines: PropTypes.number,
  text: PropTypes.string,
};

TruncateText.defaultProps = {
  lines: 2,
  text: '<p><p>',
};

export default TruncateText;
