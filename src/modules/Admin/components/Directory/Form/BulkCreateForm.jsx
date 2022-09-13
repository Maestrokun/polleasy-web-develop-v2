import * as React from 'react';
import { Controller } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import FileUpload from 'shared/Misc/FileUpload';
import { ReactComponent as FolderIcon } from 'assets/svg/folder.svg';

const useStyles = makeStyles(() => ({
  form: {
    marginTop: '22px',
    '& > *': {
      marginBottom: '22px',
    },
  },
}));

function BulkCreateForm({ control }) {
  const classes = useStyles();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '88vh',
        width: '100%',
      }}
    >
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
};

BulkCreateForm.defaultProps = {
  control: {},
};

export default BulkCreateForm;
