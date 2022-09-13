import Api from 'utils/Api';
import handleApiError from 'utils/handleApiError';

export const getAgentWorkstation = async ({ queryKey }) => {
  const [, { search, type, status, startDate, endDate }] = queryKey;
  const campaignType = type ? type.map((v) => `name=${v}`).join('&') : '';
  const statusString = status ? status.map((v) => `status=${v}`) : '';
  try {
    const response = Api.get(
      `/polls/agent/workstation/?search=${search}&start_date_end_date=${startDate}&end_date_end_date=${endDate}${
        campaignType ? `&${campaignType}` : ' '
      }${statusString ? `&${statusString}` : ''}`
    );
    return response;
  } catch (e) {
    throw new Error(handleApiError(e));
  }
};

export const getAgentCallsBreadCrumb = async ({ queryKey }) => {
  const [, { id }] = queryKey;

  try {
    const response = await Api.get(`/polls/${id}/agent-calls-stat`);
    return response;
  } catch (e) {
    throw new Error(handleApiError(e));
  }
};

// export const getAgentCallsById = async ({ pollsId, params }) => {
//   const { data } = await Api.get(`/polls/${pollsId}/agent-calls`, { params });
//   return data;
// };

export const getAgentCallsById = async ({ queryKey, pageParam }) => {
  const [, params] = queryKey;
  const newParams = {
    ...params,
    pageNumber: pageParam ?? 1,
  };
  const { data } = await Api.get(`/polls/${params.pollsId}/agent-calls`, {
    params: newParams,
  });
  return data;
};

export const getPollQuestionSet = async ({ pollId }) => {
  const { data } = await Api.get(`/polls/${pollId}/question-set/`);
  return data;
};

export const savePollResponse = async ({ pollId, payload }) => {
  const { data } = await Api.post(`/polls/${pollId}/agent/respond/`, payload);
  return data;
};
