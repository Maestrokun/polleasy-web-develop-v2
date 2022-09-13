import Api from 'utils/Api';
import handleApiError from 'utils/handleApiError';
import { queryParamsHelper } from '../../voters360/utils';

export const getCanvassers = async ({ queryKey }) => {
  const queryParams = queryParamsHelper(queryKey?.[1]);
  try {
    const response = await Api.get(`/canvassers/${queryParams}`);
    return response;
  } catch (e) {
    throw new Error(handleApiError(e));
  }
};

export const getCanvasser = async ({ queryKey }) => {
  const [, { id }] = queryKey;

  try {
    const response = await Api.get(`/canvassers/${id}`);
    return response;
  } catch (e) {
    throw new Error(handleApiError(e));
  }
};
