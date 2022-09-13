import Api from 'utils/Api';
import { queryParamsHelper } from 'modules/Admin/pages/voters360/utils';
// const { default: Api } = require('utils/Api');

export const createUsers = (payload) => {
  try {
    const response = Api.post('/auth/users/invite-user/', payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchUsers = async ({ queryKey }) => {
  const queryParams = queryParamsHelper(queryKey?.[1]);

  try {
    const response = Api.get(`/auth/users/${queryParams}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchStats = () => {
  try {
    const response = Api.get('/auth/users/stats/');
    return response;
  } catch (error) {
    return error;
  }
};

export const bulkUpload = (payload) => {
  try {
    const response = Api.post('/auth/users/bulk-user/', payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const userStatusUpdate = async ({ payload, id }) => {
  const { data } = await Api.post(`/auth/users/${id}/update-status/`, payload);
  return data;
};

export const editUser = ({ payload, id }) => {
  try {
    const response = Api.patch(`/auth/users/${id}/`, payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const resendToken = async ({ payload }) => {
  const { data } = await Api.post(`/auth/users/resend-token/`, payload);
  return data;
};

export const removeUser = async ({ id }) => {
  const { data } = await Api.delete(`/auth/users/${id}`);
  return data;
};
