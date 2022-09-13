import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useModal from 'hooks/useModal';
import { Drawer } from 'shared';
import BulkCreateForm from 'modules/Admin/components/Settings/Form/BulkCreateForm/BulkCreateForm';
import useStyles from 'modules/Admin/components/Settings/Drawer/AddExecutive/styled.multipleUsers';
import { bulkUploadPartyMembers } from 'modules/Admin/pages/Settings/services';
import { useMutation, useQueryClient } from 'react-query';
import useAlert from 'hooks/useAlert';
import handleApiError from 'utils/handleApiError';

function BulkUser() {
  const classes = useStyles();
  const [modalState, setModalState] = useModal();
  const { showNotification } = useAlert();
  const queryClient = useQueryClient();
  const [submitbtn, setSubmitBtn] = useState(false);

  const defaultValues = {
    files: [],
  };

  const schema = Yup.object({
    files: Yup.array(),
  });

  const resolver = yupResolver(schema);
  const { control, handleSubmit, setValue } = useForm({
    defaultValues,
    resolver,
  });

  const { mutate } = useMutation(bulkUploadPartyMembers, {
    onError: (error) => {
      setSubmitBtn(false);
      showNotification?.(handleApiError(error), { type: 'error' });
    },
    onSuccess: () => {
      setSubmitBtn(false);
      setModalState({
        ...modalState,
        modalName: 'successModal',
        message: 'Executives Sucessfully added',
        redirect: 'You will be redirected in 1s',
        redirectTime: 1000,
      });
      queryClient.invalidateQueries('Executives');
    },
  });

  const submitForm = (data) => {
    setSubmitBtn(true);
    const formdata = new FormData();
    formdata.append('file', data.files[0][0]);
    mutate({ formdata });
  };

  const handleFormatDownload = () => {
    const link = document.createElement('a');
    link.download = `party-members-sample.csv`;
    link.href = '/party-members-sample.csv';
    link.click();
  };

  return (
    <Drawer
      drawerName="addMultipleExecutives"
      handleSubmit={handleSubmit(submitForm)}
      titleText="Upload New Executives"
      primaryButton="Submit"
      secondaryButton="Cancel"
      isSubmitting={submitbtn}
    >
      <Box className={classes.root}>
        <Typography variant="body1" onClick={handleFormatDownload}>
          Download CSV Format
        </Typography>
      </Box>
      <BulkCreateForm control={control} setValue={setValue} />
    </Drawer>
  );
}

export default BulkUser;
