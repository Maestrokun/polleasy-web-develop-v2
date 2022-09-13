/*eslint-disable*/
import React, { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import useModal from 'hooks/useModal';
import useAlert from 'hooks/useAlert';

import { Drawer } from 'shared';

import BulkCreateForm from 'modules/Admin/components/Agent/Form/BulkCreateForm/BulkCreateForm';

import useStyles from 'modules/Admin/components/Agent/Drawer/AddAgent/styled.multipleUserDrawer';

import { bulkUpload } from 'modules/Admin/services/userManagement';

import handleApiError from 'utils/handleApiError';

function BulkUser() {
  const classes = useStyles();
  const [state, setState] = useModal();
  const { showNotification } = useAlert();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(bulkUpload);

  const defaultValues = {
    files: [],
  };

  const schema = Yup.object({
    files: Yup.array(),
  });

  const resolver = yupResolver(schema);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues,
    resolver,
  });

  const submitForm = useCallback(
    async (data) => {
      try {
        const formData = new FormData();
        formData.append('file', data.files[0][0]);
        const response = await mutateAsync(formData);
        if (response) {
          queryClient.invalidateQueries('users');
          queryClient.invalidateQueries('userStats');
          setState({
            ...state,
            modalName: 'agentSuccessModal',
            message: 'Invitation has been sent',
            redirect: 'All added users will be notified',
          });
        }
      } catch (error) {
        showNotification?.(handleApiError(error), { type: 'error' });
      }
    },
    [state]
  );

  const handleFormatDownload = () => {
    const link = document.createElement('a');
    link.download = `sample.csv`;
    link.href = '/sample.csv';
    link.click();
  };

  return (
    <Drawer
      drawerName="addMultipleUser"
      handleSubmit={handleSubmit(submitForm)}
      titleText="Upload New Agents"
      primaryButton="Send Invite"
      secondaryButton="Cancel"
      isSubmitting={isSubmitting}
    >
      <Box className={classes.root}>
        <Typography variant="body1" onClick={handleFormatDownload}>
          Download CSV Format
        </Typography>
      </Box>
      <BulkCreateForm control={control} />
    </Drawer>
  );
}

export default BulkUser;
