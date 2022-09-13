import Api from 'utils/Api';

export const getStates = () => {
  try {
    const response = Api.get('/state');
    return response;
  } catch (error) {
    return error;
  }
};

export const getCallGroups = () => {
  try {
    const response = Api.get('/callgroups');
    return response;
  } catch (error) {
    return error;
  }
};

export const createPoll = (payload) => {
  try {
    const response = Api.post('/polls/', payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const setPollQuestions = (params) => {
  const { pollId, payload } = params;
  try {
    const response = Api.post(`/polls/${pollId}/question-set/`, payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const getPollQuestions = (pollId) => {
  try {
    const response = Api.get(`/polls/${pollId}/question-set/`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getPollById = (id) => {
  try {
    const response = Api.get(`/polls/${id}/`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getSinglePoll = async ({ id }) => {
  const { data } = await Api.get(`/polls/${id}/`);
  return data;
};

export const getPollPreview = async (id) => {
  try {
    const response = Api.get(`/polls/${id}/preview/`);
    return response;
  } catch (error) {
    return error;
  }
};

export const updatePoll = (payload) => {
  try {
    const response = Api.put(`/polls/${payload.pollId}/`, payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const updatePollQuestions = (params) => {
  const { pollId, payload } = params;
  try {
    const response = Api.put(`/polls/${pollId}/question-set/`, payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const getCandidatesAndParties = (id) => {
  try {
    const response = Api.get(`/campaign/${id}/candidates-opposition/`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getPollTarget = async ({ id }) => {
  const { data } = await Api.get(`/polls/${id}/poll-criteria/`);
  return data;
};

export const savePollCriteria = async ({ id, payload }) => {
  const { data } = await Api.post(`/polls/${id}/poll-criteria/`, payload);
  return data;
};

export const getPollDetail = async ({ id }) => {
  const { data } = await Api.get(`/polls/${id}/`);
  return data;
};

export const getCampaignById = async (id) => {
  try {
    const response = await Api.get(`/campaign/${id}/`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllStates = async () => {
  try {
    const response = await Api.get(`/parties/states/`, {
      params: {
        page_size: 37,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getPollTargets = async (id) => {
  try {
    const response = await Api.get(`/polls/${id}/regional-split-targets`);
    return response;
  } catch (error) {
    return error;
  }
};
