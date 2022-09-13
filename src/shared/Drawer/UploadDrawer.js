/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import useDrawer from 'hooks/useDrawer';
import React, { useEffect, useState } from 'react';
import { Drawer } from 'shared';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import useStyles from 'modules/Admin/components/Agent/Form/BulkCreateForm/styled.bulkCreateForm';
import LinearProgress from '@mui/material/LinearProgress';
import FileUpload from 'shared/Misc/FileUpload';
import { ReactComponent as FolderIcon } from 'assets/svg/folder.svg';
import { useMutation } from 'react-query';
import handleApiError from 'utils/handleApiError';
import useAlert from 'hooks/useAlert';

function UploadDrawer({ closeDrawer, titleText, sample, mutateFn }) {
  const [state, setState] = useDrawer();
  const [file, setFile] = useState([]);
  const { showNotification } = useAlert();
  const [showProgress, setShowProgress] = useState(false);
  let [progress, setProgress] = useState(10);
  const classes = useStyles();

  const handleCloseDrawer = () => {
    setState({ ...state, drawerName: '', data: null });
  };

  const { mutate, isLoading } = useMutation(mutateFn, {
    onSuccess: () => {
      handleCloseDrawer();
      setFile([]);
      showNotification('data uploaded successfully', { type: 'success' });
    },
    onError: (err) => {
      showNotification(handleApiError(err), { type: 'error' });
    },
  });

  const handleSubmit = () => {
    const fd = new FormData();
    if (!file?.length) return null;
    fd.append('file', file[0][0]);
    mutate(fd);
  };

  useEffect(() => {
    if (!closeDrawer) return null;
    handleCloseDrawer();
  }, [closeDrawer]);

  return (
    <div>
      <Drawer
        drawerName="upload-drawer"
        handleSubmit={handleSubmit}
        titleText={titleText}
        primaryButton="Submit"
        secondaryButton="Cancel"
        isSubmitting={isLoading}
      >
        <Box p={4} pt={10}>
          <a href={sample} style={{ textDecoration: 'none' }}>
            Download CSV format
          </a>

          {!showProgress ? (
            <Box className={classes.form}>
              <FileUpload
                showTop
                timer={showProgress}
                icon={<FolderIcon />}
                accept=".csv"
                onRemove={() => setFile([])}
                onChange={(files) => {
                  setShowProgress(true);
                  const progressInterval = setInterval(() => {
                    setProgress((progress += 13.5));
                  }, 250);
                  setTimeout(() => {
                    setShowProgress(false);
                    clearInterval(progressInterval);
                    setFile([files]);
                    setProgress(10);
                  }, 2000);
                }}
                files={file}
              />
            </Box>
          ) : (
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ mt: 10, height: 10, borderRadius: 5 }}
            />
          )}
        </Box>
      </Drawer>
    </div>
  );
}

export default UploadDrawer;

UploadDrawer.propTypes = {
  closeDrawer: PropTypes.bool,
  titleText: PropTypes.string.isRequired,
  sample: PropTypes.string.isRequired,
  mutateFn: PropTypes.func.isRequired,
};

UploadDrawer.defaultProps = {
  closeDrawer: false,
};
