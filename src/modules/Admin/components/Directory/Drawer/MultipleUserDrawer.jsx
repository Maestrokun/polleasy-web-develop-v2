import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Drawer } from 'shared';
import * as Yup from 'yup';
import useModal from 'hooks/useModal';
import { Typography } from '@mui/material';
import BulkCreateForm from '../Form/BulkCreateForm';

function BulkUserCreate() {
  const [state, setState] = useModal();
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

  const submitForm = React.useCallback(() => {
    setState({
      ...state,
      modalName: 'agentSuccessModal',
      message: 'Invitation has been sent',
      subMessage: 'All users will be notified',
    });
  }, [state]);

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
      titleText="Upload Personnel(s)"
      primaryButton="Submit"
      secondaryButton="Cancel"
    >
      <Typography
        fontSize={16}
        onClick={handleFormatDownload}
        sx={{
          color: 'blue',
          cursor: 'pointer',
          marginLeft: '16px',
          marginTop: '16px',
        }}
      >
        Download CSV Format
      </Typography>
      <BulkCreateForm control={control} />
    </Drawer>
  );
}

export default BulkUserCreate;
