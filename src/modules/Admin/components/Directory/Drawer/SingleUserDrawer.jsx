import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Drawer } from 'shared';

import useModal from 'hooks/useModal';

import schema from 'modules/Admin/validation/Form/validation';

import SingleUserForm from 'modules/Admin/components/Directory/Form/SingleUserForm';

function SingleUserDrawer() {
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
        modalName: 'agentSuccessModal',
        message: 'Personnel Added Successfully',
        subMessage: info
          ? 'You will be redirected to the Directory page'
          : null,
      });
    },
    [state]
  );

  return (
    <Drawer
      drawerName="addSingleUser"
      handleSubmit={handleSubmit(submitForm)}
      titleText="Add New Personnel"
      primaryButton="Create"
      secondaryButton="Cancel"
    >
      <SingleUserForm control={control} />
    </Drawer>
  );
}

export default SingleUserDrawer;
