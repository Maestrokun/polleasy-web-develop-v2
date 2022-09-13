import Api from 'utils/Api';
import handleApiError from 'utils/handleApiError';
import { queryParamsHelper } from '../../voters360/utils';

export const getElectorates = async ({ queryKey }) => {
  const queryParams = queryParamsHelper(queryKey?.[1]);
  try {
    const response = await Api.get(`/electorates/${queryParams}`);
    return response;
  } catch (e) {
    throw new Error(handleApiError(e));
  }
};

export const getElectorate = async ({ queryKey }) => {
  const [, { id }] = queryKey;

  try {
    const response = await Api.get(`/electorates/${id}`);
    return response;
  } catch (e) {
    throw new Error(handleApiError(e));
  }
};
