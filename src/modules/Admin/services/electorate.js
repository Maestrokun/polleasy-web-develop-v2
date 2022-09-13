/* eslint-disable camelcase */
const { default: Api } = require('utils/Api');

export const fetchVoters = async ({ page, page_size }) => {
  const params = {
    page,
    page_size,
  };
  const { data } = await Api.get(`/voters/`, { params });
  return data;
};

export const fetchStats = () => {
  try {
    const response = Api.get('/auth/users/stats/');
    return response;
  } catch (error) {
    return error;
  }
};
