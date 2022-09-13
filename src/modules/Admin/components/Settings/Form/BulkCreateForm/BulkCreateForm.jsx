import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import FileUpload from 'shared/Misc/FileUpload';
import { ReactComponent as FolderIcon } from 'assets/svg/folder.svg';
import useStyles from 'modules/Admin/components/Settings/Form/BulkCreateForm/styled.bulkCreateForm';

function BulkCreateForm({ control, setValue }) {
  const classes = useStyles();

  const onRemove = () => {
    setValue('files', []);
  };

  return (
    <Box className={classes.root}>
      <Box m={4} sx={{ flex: 1 }}>
        <Box className={classes.form}>
          <Controller
            name="files"
            control={control}
            render={({ field: { value = [], onChange, ...fields } }) => (
              <FileUpload
                icon={<FolderIcon />}
                showTop
                accept="csv"
                onChange={(files) => {
                  onChange(files ? [files] : []);
                }}
                files={value}
                onRemove={onRemove}
                {...fields}
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
}

BulkCreateForm.propTypes = {
  control: PropTypes.shape({}),
  setValue: PropTypes.shape({}),
};

BulkCreateForm.defaultProps = {
  control: {},
  setValue: {},
};

export default BulkCreateForm;
