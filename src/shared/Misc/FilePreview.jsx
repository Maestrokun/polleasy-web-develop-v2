import React from 'react';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Visibility } from '@mui/icons-material';
import FileTypeIcon from './FileTypeIcon';
import TruncateText from './TruncateText';

function FilePreview({
  file,
  metaData,
  rightContent,
  fileInformation,
  limitInformationToSize,
  hideDownLoad,
  previewOnly,
  ...props
}) {
  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = file.url && file.url;
    link.setAttribute('target', '_blank');
    link.setAttribute('download', file?.name);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const getFileSize = () => {
    return file?.size ? `${(file ? file.size / 1000 : 0).toFixed(2)} kb` : '';
  };

  const getFileInformationContent = () => {
    if (fileInformation !== undefined) {
      return fileInformation;
    }

    if (limitInformationToSize) {
      return getFileSize();
    }

    return (
      <>
        By {metaData?.author}
        <Typography component="span" sx={{ margin: 0.5, lineHeight: 0.5 }}>
          •
        </Typography>
        {getFileSize()}
        <Typography component="span" sx={{ margin: 0.5, lineHeight: 0.5 }}>
          •
        </Typography>
        Date published:{' '}
        {format(new Date(metaData?.datePublished), 'LLL dd, yyyy')}
      </>
    );
  };

  const renderFileInformation = () => {
    return (
      <Typography variant="caption" component="p" color="textSecondary">
        {getFileInformationContent()}
      </Typography>
    );
  };

  const handlePreview = (f) => () => {
    if (f?.url) return window.open(URL.createObjectURL(f));
    window.open(file?.url);
    return undefined;
  };

  const renderRightContent = () => {
    return rightContent !== undefined ? (
      rightContent
    ) : (
      <>
        {!hideDownLoad && (
          <IconButton sx={{ padding: 0, color: 'grey' }} onClick={downloadFile}>
            <SaveAltIcon />
          </IconButton>
        )}
        {previewOnly && (
          <IconButton sx={{ padding: '0px' }} onClick={handlePreview(file)}>
            <Visibility sx={{ marginRight: '16px', fontSize: '24px' }} />
          </IconButton>
        )}
      </>
    );
  };

  const getFileType = () => {
    return file?.type?.split('/')?.splice(-1)?.join();
  };

  return (
    <Box
      {...props}
      component={Paper}
      elevation={0}
      py={4}
      width="50%"
      display="flex"
      justifyContent="space-between"
      boxSizing="border-box"
      borderBottom="1px solid #E0E0E0"
      mr="0px"
    >
      <Box display="flex" width={200}>
        <FileTypeIcon iconType={getFileType()} />
        <Box ml={4} maxWidth={240}>
          <Typography
            variant="subtitle2"
            color="textPrimary"
            sx={{ fontWeight: 'bold' }}
          >
            <TruncateText lines={1} text={file?.name} />
          </Typography>
          {renderFileInformation()}
        </Box>
      </Box>
      {renderRightContent()}
    </Box>
  );
}

FilePreview.propTypes = {
  file: PropTypes.shape({
    size: PropTypes.string,
    url: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
  metaData: PropTypes.shape({
    author: PropTypes.string,
    datePublished: PropTypes.string,
  }),
  rightContent: PropTypes.shape({}),
  fileInformation: PropTypes.string,
  limitInformationToSize: PropTypes.bool,
  hideDownLoad: PropTypes.bool,
  previewOnly: PropTypes.bool,
};

FilePreview.defaultProps = {
  file: {},
  metaData: {},
  rightContent: {},
  fileInformation: '',
  limitInformationToSize: true,
  hideDownLoad: false,
  previewOnly: false,
};
export default React.memo(FilePreview);
