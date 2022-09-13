import Api from 'utils/Api';
import handleApiError from 'utils/handleApiError';

const getAwardedProcurements = async (key, params) => {
  try {
    const response = await Api.get('contracts/awardedProcurements', { params });
    return response.data;
  } catch (e) {
    throw new Error(handleApiError(e));
  }
};

const createPassword = async ({ payload }) => {
  const { data } = await Api.post('/auth/users/create-password/', payload);
  return data;
};

const login = async (payload) => {
  const response = await Api.post('/auth/login/', payload);
  return response;
};

const forgetPassword = async (payload) => {
  const response = await Api.post('/auth/users/reset-password/', payload);
  return response;
};

const authService = {
  getAwardedProcurements,
  login,
  forgetPassword,
  createPassword,
};

export default authService;
