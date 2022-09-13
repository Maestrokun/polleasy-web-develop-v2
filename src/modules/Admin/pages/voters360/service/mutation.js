import Api from 'utils/Api';

export const voter360Bulk = async (file) => {
  const response = await Api.post(`voters/bulk-voter/`, file);
  return response;
};

export const test2 = {};
