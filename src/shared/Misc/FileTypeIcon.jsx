import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as CSVIcon } from 'assets/svg/csv_icon.svg';
import { ReactComponent as DefaultFileIcon } from 'assets/svg/default_file_icon.svg';
import { ReactComponent as WordIcon } from 'assets/svg/doc_icon.svg';
import { ReactComponent as JpgIcon } from 'assets/svg/jpg_icon.svg';
import { ReactComponent as PdfIcon } from 'assets/svg/pdf_icon.svg';
import { ReactComponent as PngIcon } from 'assets/svg/png_icon.svg';
import { ReactComponent as PptIcon } from 'assets/svg/ppt_icon.svg';
import { ReactComponent as XlsIcon } from 'assets/svg/xls_icon.svg';

function FileTypeIcon({ iconType }) {
  let icon;
  switch (iconType) {
    case 'pdf':
      icon = <PdfIcon />;
      break;

    case 'xlxs':
      icon = <XlsIcon />;
      break;

    case 'docx':
      icon = <WordIcon />;
      break;

    case 'ppt':
      icon = <PptIcon />;
      break;
    case 'png':
      icon = <PngIcon />;
      break;
    case 'jpg':
      icon = <JpgIcon />;
      break;

    case 'csv':
      icon = <CSVIcon />;
      break;

    default:
      icon = <DefaultFileIcon />;
      break;
  }

  return <div className="icon">{icon}</div>;
}

FileTypeIcon.propTypes = {
  iconType: PropTypes.string.isRequired,
};

export default FileTypeIcon;
