import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useModal from 'hooks/useModal';
import SuccessModal from 'modules/Admin/components/Directory/Modal/SuccessModal';

import { Drawer } from 'shared';

import EditDirectoryForm from 'modules/Admin/components/Directory/Form/EditDirectoryForm';
import schema from 'modules/Admin/validation/Form/validation';

function EditDirectory() {
  const [state, setState] = useModal();
  const defaultValues = {
    firstname: '',
    lastname: '',
    middlename: '',
    phone_number: null,
    designation: '',
    state: '',
    lga: '',
  };

  const resolver = yupResolver(schema);
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver,
  });

  const submitForm = React.useCallback(
    (info) => {
      setState({
        ...state,
        modalName: 'successModal',
        message: 'Directory edited Successfully',
        subMessage: info
          ? 'You will be redirected to the Directory page'
          : null,
      });
    },
    [state]
  );

  return (
    <>
      <Drawer
        drawerName="editDirectory"
        handleSubmit={handleSubmit(submitForm)}
        titleText="Edit Directory"
        primaryButton="Save Edit"
        secondaryButton="Cancel"
      >
        <EditDirectoryForm control={control} />
      </Drawer>
      <SuccessModal />
    </>
  );
}

export default EditDirectory;
