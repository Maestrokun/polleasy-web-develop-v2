import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import IconButton from '@mui/material/IconButton';

import UploadIcon from 'assets/svg/UploadIcon.svg';

import PropTypes from 'prop-types';

import useStyles from 'shared/Misc/Upload/styled.Upload';

function FileUpload({
  files: filesFromProps,
  multiple,
  onChange,
  accept,
  subTitle,
  onSetEditUrl,
}) {
  const classes = useStyles();
  const [imgUpload, setImgUpload] = useState(null);
  const [url, setUrl] = useState(filesFromProps);

  const handleUpload = (newFiles) => {
    onChange?.(newFiles);
    setImgUpload(URL.createObjectURL(newFiles[0]));
  };

  const handleRemoveLogo = () => {
    setUrl(null);
    setImgUpload(null);
    onSetEditUrl(false);
  };

  return (
    <Box>
      {!url && typeof url === 'string' ? (
        <Box className={classes.image_container} mt={4}>
          <img
            src={filesFromProps}
            alt="Party flag"
            className={classes.image_preview}
          />
          <Box className={classes.delete_icon}>
            <IconButton onClick={handleRemoveLogo}>
              <CancelOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      ) : (
        typeof imgUpload === 'string' && (
          <Box className={classes.image_container} mt={4}>
            <img
              src={imgUpload}
              alt="Party flag"
              className={classes.image_preview}
            />
            <Box className={classes.delete_icon}>
              <IconButton onClick={handleRemoveLogo}>
                <CancelOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        )
      )}

      {!imgUpload && typeof url !== 'string' && (
        <Box className={classes.file_upload}>
          <input
            className={classes.input_field}
            type="file"
            id="avatar"
            name="avatar"
            multiple={multiple}
            onChange={(e) => {
              const newFileArray = [
                ...Array.from(e.target?.files),
                filesFromProps,
              ];
              handleUpload(newFileArray);
            }}
            accept={accept}
          />
          <Box>
            <Box>
              <img src={UploadIcon} alt="upload" />
            </Box>
            <Box className={classes.hover} component="span" mt={1} mb={4}>
              <Typography
                variant="body1"
                color="textPrimary"
                sx={{ fontWeight: 'bold' }}
              >
                Click here to upload
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Max size upload: 2MB • Format: JPEG, PNG
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
  onSetEditUrl: PropTypes.func,
  accept: PropTypes.string,
  subTitle: PropTypes.string,
};

FileUpload.defaultProps = {
  files: [{}],
  multiple: false,
  accept: 'jpg, png',
  subTitle: '',
  onSetEditUrl: {},
};

export default FileUpload;
