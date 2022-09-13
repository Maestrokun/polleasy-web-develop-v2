import Api from 'utils/Api';
import handleApiError from 'utils/handleApiError';

export const addVoters = async (payload) => {
  try {
    const response = await Api.post('/voters/upload', payload);
    return response;
  } catch (e) {
    throw new Error(handleApiError(e));
  }
};

export const getVoters = async ({ queryKey }) => {
  const { pageNumber, pageSize } = queryKey[1];
  try {
    const response = await Api.get(
      `/voters?PageNumber=${pageNumber}&PageSize=${pageSize}`
    );
    return response;
  } catch (e) {
    throw new Error(handleApiError(e));
  }
};

export const getVoterStats = async () => {
  try {
    const response = await Api.get('/voters/stats');
    return response;
  } catch (e) {
    throw new Error(handleApiError(e));
  }
};

export const getVoterId = async ({ queryKey }) => {
  const { id } = queryKey[1];
  try {
    const response = await Api.get(`/voters/${id}`);
    return response;
  } catch (e) {
    throw new Error(handleApiError(e));
  }
};
