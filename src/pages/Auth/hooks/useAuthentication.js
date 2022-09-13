/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import { useMutation } from 'react-query';
import handleApiError from 'utils/handleApiError';
import authService from '../services';

export const useCreatePassword = ({ showNotification, setModal, state }) => {
  const { mutate, isLoading, reset, ...rest } = useMutation(
    ({ payload }) => authService.createPassword({ payload }),
    {
      onSuccess: () => {
        showNotification &&
          showNotification('Password successfully created', {
            type: 'success',
          });
        setModal({
          ...state,
          modalName: 'passwordResetModal',
          message: 'Password Reset Successful',
          redirect: `you will be notified`,
        });
      },
      onError: (err) => {
        reset();
        showNotification(handleApiError(err), { type: 'error' });
      },
    }
  );

  return {
    createPassword: mutate,
    creatingPassword: isLoading,
    ...rest,
  };
};

export const useForgotPassword = ({ showNotification }) => {
  const { mutate, reset, isLoading, ...rest } = useMutation(
    ({ payload }) => authService.forgetPassword(payload),
    {
      onError: (err) => {
        reset();
        showNotification(handleApiError(err), { type: 'error' });
      },
      onSuccess: () => {
        showNotification &&
          showNotification('Reset link sent successfully', {
            type: 'success',
          });
      },
    }
  );

  return {
    resetPassword: mutate,
    resetingPassword: isLoading,
    ...rest,
  };
};
