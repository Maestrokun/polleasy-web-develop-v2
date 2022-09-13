/*eslint-disable*/
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from 'react-query';

import { Drawer } from 'shared';

import useModal from 'hooks/useModal';
import useDrawer from 'hooks/useDrawer';
import useAlert from 'hooks/useAlert';

import EditUserForm from 'modules/Admin/components/Agent/Form/SingleUserForm/EditUserForm';

import schema from 'modules/Admin/validation/Agents/singleUserFormValidation';

import { editUser } from 'modules/Admin/services/userManagement';

import handleApiError from 'utils/handleApiError';

function UpdateUser() {
  // The function name was changed from singleUser to UpdateUser
  const [state, setState] = useModal();
  const { showNotification } = useAlert();
  const [drawer] = useDrawer();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(editUser);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      middle_name: '',
      phone: null,
      email: '',
      role: '',
      languages: [],
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const info = {
      ...drawer?.data,
      role: drawer?.data?.role,
    };
    reset(info);
  }, [drawer]);

  const submitForm = React.useCallback(
    async (data) => {
      const role =
        data.role === 'Party Agent'
          ? 'PARTY_AGENT'
          : data.role === 'Candidate'
          ? 'CANDIDATE'
          : data.role === 'Campaign Manager'
          ? 'CAMPAIGN_MANAGER'
          : data.role === 'Inbound Agent'
          ? 'INBOUND_AGENT'
          : data.role === 'Outbound Agent'
          ? 'OUTBOUND_AGENT'
          : data.role === 'Call Group Lead'
          ? 'CALL_GROUP_LEAD'
          : data.role;

      const formData = new FormData();
      formData.append('firstname', data.firstname);
      formData.append('lastname', data.lastname);
      formData.append('middle_name', data.middle_name);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('role', role);
      formData.append('languages', data.languages);

      try {
        const response = await mutateAsync({
          payload: formData,
          id: drawer.data.id,
        });

        if (response.status === 200) {
          queryClient.invalidateQueries('users');
          queryClient.invalidateQueries('userStats');
          setState({
            ...state,
            modalName: 'agentSuccessModal',
            message: 'Personnel Successfully Edited',
            redirect: 'You will be redirected in 1s',
          });
        }
      } catch (error) {
        showNotification?.(handleApiError(error), { type: 'error' });
      }
    },
    [state]
  );

  return (
    <Drawer
      drawerName="editUser"
      handleSubmit={handleSubmit(submitForm)}
      titleText="Edit User"
      primaryButton="Save"
      secondaryButton="Cancel"
      isSubmitting={isSubmitting}
    >
      <EditUserForm control={control} />
    </Drawer>
  );
}

export default UpdateUser; // The function name was changed from singleUser to UpdateUser
