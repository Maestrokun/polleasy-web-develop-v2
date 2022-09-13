import Api from 'utils/Api';

export const addPoliticalParty = (payload) => {
  try {
    const response = Api.post('/parties/', payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const getPoliticalParties = async ({ params }) => {
  const { data } = await Api.get('/parties/', { params });
  return data;
};

export const editPoliticalParties = async ({ id, data }) => {
  try {
    const response = await Api.patch(`/parties/${id}/`, data);
    return response;
  } catch (error) {
    return error;
  }
};
export const deletePoliticalParties = async (id) => {
  try {
    const response = await Api.delete(`/parties/${id}/`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
