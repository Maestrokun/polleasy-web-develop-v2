import Api from 'utils/Api';
import { queryParamsHelper } from 'utils/helperFunc';

export const getPartyStates = ({ queryKey }) => {
  const queryParams = queryParamsHelper(queryKey[1]);
  try {
    const response = Api.get(`/parties/states/${queryParams}`);
    return response;
  } catch (error) {
    return error;
  }
};
export const getPartyStatesLga = ({ queryKey }) => {
  const [, { id }] = queryKey;
  try {
    const response = Api.get(`/parties/states/${id}/lgas/`);
    return response;
  } catch (error) {
    return error;
  }
};
