import React, { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import useModal from 'hooks/useModal';

import { Drawer } from 'shared';

import BulkCreateForm from 'modules/Admin/components/Agent/Form/BulkCreateForm/BulkCreateForm';

import useStyles from 'modules/Admin/components/Agent/Drawer/AddAgent/styled.multipleUserDrawer';

import { addVoters } from 'modules/Admin/pages/voters/services/index';

function BulkUser() {
  const classes = useStyles();
  const [state, setState] = useModal();
  const mutate = useMutation(addVoters);

  const defaultValues = {
    files: [],
  };

  const schema = Yup.object({
    files: Yup.array(),
  });

  const resolver = yupResolver(schema);
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver,
  });

  const submitForm = useCallback(
    async (data) => {
      const formData = new FormData();
      formData.append('File', data.files[0][0]);
      const response = await mutate.mutateAsync(formData);
      if (response.status === 200) {
        setState({
          ...state,
          modalName: 'voterUploadSuccessModal',
          message: 'Voters uploaded successfully',
          redirect: 'You will be redirected to voters page',
        });
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
      drawerName="uploadVoter"
      handleSubmit={handleSubmit(submitForm)}
      titleText="Upload Voters"
      primaryButton="Submit"
      secondaryButton="Cancel"
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
