import * as React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Drawer } from 'shared';
import schema from 'modules/Admin/validation/Settings/CreatePartyMembers';
import useModal from 'hooks/useModal';
import useAlert from 'hooks/useAlert';
import handleApiError from 'utils/handleApiError';
import SingleUserForm from 'modules/Admin/components/Settings/Form/SingleUserForm/SingleUserForm';
import { createPartyMembers } from 'modules/Admin/pages/Settings/services';

function SingleUser() {
  const [modalState, setModalState] = useModal();
  const { showNotification } = useAlert();
  const queryClient = useQueryClient();

  const defaultValues = {
    firstname: '',
    middle_name: '',
    lastname: '',
    phone: '',
    position: '',
    jurisdiction: '',
    zone: '',
    state: '',
    district: '',
    lga: '',
    ward: '',
    level: '',
  };

  const resolver = yupResolver(schema);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues,
    resolver,
  });

  const { mutate } = useMutation(createPartyMembers, {
    onError: (error) => {
      showNotification?.(handleApiError(error), { type: 'error' });
    },
    onSuccess: () => {
      setModalState({
        ...modalState,
        modalName: 'successModal',
        message: 'Party Structure Created Successfully',
        redirect: '',
        redirectTime: 1000,
      });
      queryClient.invalidateQueries('Executives');
    },
  });

  const submitForm = (data) => {
    const formdata = new FormData();
    formdata.append('firstname', data.firstname);
    formdata.append('lastname', data.lastname);
    formdata.append('phone', data.phone);
    formdata.append('position', data.position);
    formdata.append('jurisdiction', data.jurisdiction);
    formdata.append('zone', data.zone);
    formdata.append('state', data.state);
    formdata.append('level', data.level);
    formdata.append('senatorial_district', data.district);
    formdata.append('lga', data.lga);
    formdata.append('ward', data.ward);
    if (data.middle_name) formdata.append('middle_name', data.middlename);
    mutate({ formdata });
  };

  return (
    <Drawer
      drawerName="addSingleExecutive"
      handleSubmit={handleSubmit(submitForm)}
      titleText="Add New Executive"
      primaryButton="Add"
      secondaryButton="Cancel"
      isSubmitting={isSubmitting}
    >
      <SingleUserForm
        control={control}
        setValue={setValue}
        sx={{ overflowY: 'scroll' }}
      />
    </Drawer>
  );
}

export default SingleUser;
