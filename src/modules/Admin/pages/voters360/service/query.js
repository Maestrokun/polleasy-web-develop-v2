import Api from 'utils/Api';
import handleApiError from 'utils/handleApiError';
import { queryParamsHelper } from '../utils';

export const getVoter360 = async ({ queryKey }) => {
  const queryParams = queryParamsHelper(queryKey?.[1]);

  try {
    const response = await Api.get(`/voters/360${queryParams}`);
    return response;
  } catch (e) {
    throw new Error(handleApiError(e));
  }
};

export const getVoter360ById = async ({ queryKey }) => {
  const [, { id }] = queryKey;

  try {
    const response = await Api.get(`/voters/360/${id}`);
    return response;
  } catch (e) {
    throw new Error(handleApiError(e));
  }
};
export const getVoter360ByStat = async () => {
  try {
    const response = await Api.get(`/voters/360/stats/`);
    return response;
  } catch (e) {
    throw new Error(handleApiError(e));
  }
};
