import * as React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Drawer } from 'shared';
import schema from 'modules/Admin/validation/Settings/CreatePartyMembers';
import useAlert from 'hooks/useAlert';
import handleApiError from 'utils/handleApiError';
import EditSingleUserForm from 'modules/Admin/components/Settings/Form/SingleUserForm/EditSingleUserForm';
import { updatePartyMembers } from 'modules/Admin/pages/Settings/services';
import useModal from 'hooks/useModal';

function EditSingleUser() {
  const { showNotification } = useAlert();
  const queryClient = useQueryClient();
  const [modalState, setModalState] = useModal();
  const [submitbtn, setSubmitBtn] = React.useState(false);

  const defaultValues = {
    firstname: '',
    lastname: '',
    middle_name: '',
    phone: '',
    position: '',
    jurisdiction: '',
    zone: '',
    state: '',
    district: '',
    lga: '',
    ward: '',
    id: '',
    level: '',
  };

  const resolver = yupResolver(schema);
  const { control, handleSubmit, setValue } = useForm({
    defaultValues,
    resolver,
  });

  const { mutate } = useMutation(updatePartyMembers, {
    onError: (error) => {
      setSubmitBtn(false);
      showNotification?.(handleApiError(error), { type: 'error' });
    },
    onSuccess: () => {
      setSubmitBtn(false);
      setModalState({
        ...modalState,
        modalName: 'successModal',
        message: 'Executives Sucessfully edited',
        redirect: 'You will be redirected in 1s',
        redirectTime: 2000,
      });
      queryClient.invalidateQueries('Executives');
    },
  });

  const submitForm = (data) => {
    const id = data?.id;
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
    formdata.append('level', data.level);
    if (data.middle_name) formdata.append('middle_name', data.middle_name);
    mutate({ id, formdata });
  };

  return (
    <Drawer
      drawerName="editSingleExecutive"
      handleSubmit={handleSubmit(submitForm)}
      titleText="Edit Executive"
      primaryButton="Update"
      secondaryButton="Cancel"
      isSubmitting={submitbtn}
    >
      <EditSingleUserForm
        control={control}
        setValue={setValue}
        sx={{ overflowY: 'scroll' }}
        defaultValues={defaultValues}
      />
    </Drawer>
  );
}

export default EditSingleUser;
