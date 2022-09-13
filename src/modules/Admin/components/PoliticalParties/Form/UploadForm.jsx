import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import FileUpload from 'modules/Admin/components/PoliticalParties/Misc/FileUpload';

import useStyles from 'modules/Admin/components/PoliticalParties/Form/styled.uploadForm';

function UploadForm({ control }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box mx={5} my={0} sx={{ flex: 1 }}>
        <Box className={classes.form}>
          <Controller
            name="flag"
            control={control}
            render={({ field: { value = [], onChange, ...fields } }) => (
              <FileUpload
                showTop
                accept="jpg, png"
                onChange={(flag) => {
                  onChange(flag ? [flag] : []);
                }}
                files={value}
                {...fields}
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
}

UploadForm.propTypes = {
  control: PropTypes.shape({}),
};

UploadForm.defaultProps = {
  control: {},
};

export default UploadForm;
