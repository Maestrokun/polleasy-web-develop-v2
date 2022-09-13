import React, { useMemo, useState } from 'react';
import { Box, IconButton, LinearProgress, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { ReactComponent as FolderIcon } from 'assets/svg/folder.svg';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import FilePreview from './FilePreview';

const useStyles = makeStyles(() => ({
  file_upload: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#F2F7F9',
      cursor: 'pointer',
    },
  },
}));

function FileUpload({
  files: filesFromProps,
  multiple,
  onChange,
  accept,
  onRemove,
  subTitle,
  showTop,
  icon,
}) {
  const [filesFromState, setFilesFromState] = useState();
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const classes = useStyles();

  const files = useMemo(() => {
    return filesFromProps !== undefined ? filesFromProps : filesFromState;
  }, [filesFromProps, filesFromState]);

  const showFileUpload = useMemo(() => {
    return multiple || files?.length === 0;
  }, [multiple, files]);

  const handleUpload = (newFiles) => {
    setFilesFromState(newFiles);
    onChange?.(newFiles);
  };

  // const handleRemoveFile = (index, file) => {
  //   onRemove?.(file);
  //   const newFiles = files?.filter((_file, i) => i !== index);
  //   handleUpload(newFiles);
  // };
  const handleRemoveFile = (index, file) => {
    onRemove?.(file);
  };

  const renderRightContent = (index, file) => {
    return (
      <Box display="flex" mr={10} justifyContent="flex-end">
        <IconButton onClick={() => handleRemoveFile(index, file)}>
          <Delete sx={{ color: '#EB5757' }} />
        </IconButton>
      </Box>
    );
  };

  const handleFileRead = async (inputFile) => {
    const reader = new FileReader();
    reader.onprogress = (evt) => {
      const val = (evt.loaded / evt.total) * 100;
      setProgress(val);
    };

    reader.onloadend = () => {
      setLoaded(true);
    };

    reader.readAsText(inputFile[0]);
  };

  return (
    <Box>
      {showTop &&
        files?.map((file, index) => {
          const { name, size, type } = file[0];
          handleFileRead(file);
          if (progress < 100) {
            return null;
          }
          return (
            <Box mt={4} mb={showTop ? 4 : 0}>
              <FilePreview
                key={name}
                file={{
                  name,
                  size,
                  type,
                }}
                limitInformationToSize
                rightContent={renderRightContent(index, file)}
              />
            </Box>
          );
        })}
      {showFileUpload && (
        <Box
          textAlign="center"
          border="dashed 1px #CDCED9"
          borderRadius="4px"
          py={12}
          height="max-content"
          position="relative"
          className={classes.file_upload}
        >
          <input
            type="file"
            id="avatar"
            name="avatar"
            style={{
              opacity: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 99,
            }}
            multiple={multiple}
            onChange={(e) => {
              const newFileArray = [...Array.from(e.target?.files), ...files];
              handleUpload(newFileArray);
            }}
            accept={accept}
          />
          <Box>
            <Box>
              {!icon ? <FolderIcon style={{ marginBottom: '1rem' }} /> : icon}
            </Box>
            <Box className={classes.hover} component="span" mt={1} mb={4}>
              <Typography
                variant="body1"
                color="textPrimary"
                sx={{ fontWeight: 'bold' }}
              >
                Drop your files here or{' '}
                <span style={{ color: 'blue', cursor: 'pointer' }}>
                  Click here
                </span>{' '}
                to upload
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Format ({accept || 'jpg, png, xls, pdf, csv, ppt'}). Maximum of
                5MB
              </Typography>
            </Box>
            {subTitle !== '' && (
              <Box component="span" mt={-1} mb={4} style={{ color: '#6B6C7E' }}>
                {subTitle}
              </Box>
            )}
          </Box>
        </Box>
      )}
      {!showFileUpload && !loaded && (
        <Box display="flex" width={200}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}
    </Box>
  );
}

FileUpload.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      size: PropTypes.number,
      url: PropTypes.string,
    })
  ),
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.string,
  onRemove: PropTypes.func,
  subTitle: PropTypes.string,
  showTop: PropTypes.bool,
  icon: PropTypes.element,
};

FileUpload.defaultProps = {
  files: [{}],
  multiple: false,
  accept: 'csv',
  onRemove: () => {},
  subTitle: '',
  showTop: true,
  icon: <div />,
};

export default FileUpload;
