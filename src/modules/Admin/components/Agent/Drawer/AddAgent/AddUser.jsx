/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Drawer } from 'shared';

import useModal from 'hooks/useModal';
import useAlert from 'hooks/useAlert';

import AddUserForm from 'modules/Admin/components/Agent/Form/SingleUserForm/AddUserForm';

import schema from 'modules/Admin/validation/Agents/singleUserFormValidation';

import { createUsers } from 'modules/Admin/services/userManagement';

import handleApiError from 'utils/handleApiError';

function AddUser() {
  const [state, setState] = useModal();
  const { mutateAsync, isSuccess } = useMutation(createUsers);
  const queryClient = useQueryClient();
  const { showNotification } = useAlert();

  const {
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      middle_name: '',
      phone: null,
      email: '',
      role: '',
      languages: [],
      temp_identifier: '',
    },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (isSuccess) {
      reset({
        firstname: '',
        lastname: '',
        middle_name: '',
        phone: null,
        email: '',
        role: '',
        languages: [],
        temp_identifier: '',
      });
    }
  }, [isSuccess]);

  const submitForm = React.useCallback(
    async (data) => {
      // eslint-disable-next-line no-unreachable
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

      const payload = {
        firstname: data.firstname,
        lastname: data.lastname,
        middle_name: data.middle_name,
        email: data.email,
        phone: data.phone,
        role,
        languages: data.languages.map((item) => item).toString(),
        temp_identifier: data.temp_identifier,
      };

      try {
        const response = await mutateAsync(payload);
        if (response.status === 200) {
          queryClient.invalidateQueries('users');
          queryClient.invalidateQueries('userStats');
          setState({
            ...state,
            modalName: 'agentSuccessModal',
            message: 'Invitation has been sent!',
            redirect: `${data?.email} will be notified`,
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
      drawerName="addSingleUser"
      handleSubmit={handleSubmit(submitForm)}
      titleText="Add New User"
      primaryButton="Send Invite"
      secondaryButton="Cancel"
      isSubmitting={isSubmitting}
    >
      <AddUserForm watch={watch} control={control} setValue={setValue} />
    </Drawer>
  );
}

export default AddUser;
