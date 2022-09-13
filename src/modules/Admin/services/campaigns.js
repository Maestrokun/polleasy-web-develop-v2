import Api from 'utils/Api';
import { queryParamsHelper } from 'modules/Admin/pages/voters360/utils';

export const getCampaigns = async ({ queryKey }) => {
  const queryParams = queryParamsHelper(queryKey?.[1]);

  try {
    const response = Api.get(`/campaign${queryParams}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getCampaignPolls = async ({ queryKey }) => {
  // eslint-disable-next-line no-unused-vars
  const { id } = queryKey[1];
  try {
    const response = await Api.get(`/campaign/${id}/polls/`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getCampaignDetails = async ({ queryKey }) => {
  const [, id] = queryKey;
  try {
    const { data } = await Api.get(`/campaign/${id}/`);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateCampaignStatus = async ({ id, status }) => {
  const response = await Api.post(`campaign/${id}/update-status/`, {
    status,
  });
  return response;
};

export const getPollStats = async ({ queryKey }) => {
  const [, id] = queryKey;
  try {
    const response = await Api.get(`/campaigns/${id}/polls/stats/`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getCampaignPollRecords = ({ queryKey }) => {
  const { campaignId, pollId } = queryKey[1];
  try {
    const response = Api.get(`/campaigns/${campaignId}/polls/${pollId}/`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getPollAgents = ({ queryKey }) => {
  const { pollId } = queryKey[1];
  try {
    const response = Api.get(`/campaigns/${pollId}/agents`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getCampaign = async ({ queryKey }) => {
  const { id } = queryKey[1];
  try {
    const response = await Api.get(`/campaign/${id}/`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getStates = async () => {
  try {
    const { data } = await Api.get(`/parties/states/?page_size=40`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getSenatorialDistricts = async ({ queryKey }) => {
  const { id } = queryKey[1];
  try {
    if (id) {
      const { data } = await Api.get(
        `/parties/states/${id}/senatorial-districts/`
      );
      return data;
    }
    return null;
  } catch (error) {
    return error;
  }
};

export const getHouseOfRep = async ({ queryKey }) => {
  const { id } = queryKey[1];
  try {
    if (id) {
      const { data } = await Api.get(`/parties/states/${id}/house-of-reps/`);
      return data;
    }
    return null;
  } catch (error) {
    return error;
  }
};

export const getHouseOfAssembly = async ({ queryKey }) => {
  const { id } = queryKey[1];
  try {
    if (id) {
      const { data } = await Api.get(
        `/parties/states/${id}/house-of-assemblies/`
      );
      return data;
    }
    return null;
  } catch (error) {
    return error;
  }
};

export const getCandidate = async () => {
  try {
    const { data } = await Api.get('auth/users/?role=CANDIDATE');
    return data;
  } catch (error) {
    return error;
  }
};

export const getCampaignManagers = async () => {
  try {
    const { data } = await Api.get('auth/users/?role=CAMPAIGN_MANAGER');
    return data;
  } catch (error) {
    return error;
  }
};

export const getParties = async () => {
  try {
    const { data } = await Api.get('/parties/');
    return data;
  } catch (error) {
    return error;
  }
};

export const createCampaign = (payload) => {
  try {
    const response = Api.post('/campaign/', payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const getLga = async ({ queryKey }) => {
  const { id } = queryKey[1];
  try {
    if (id) {
      const { data } = await Api.get(`/parties/states/${id}/lgas/`);
      return data;
    }
    return null;
  } catch (error) {
    return error;
  }
};

export const getWards = async ({ queryKey }) => {
  const { id } = queryKey[1];
  try {
    if (id) {
      const { data } = await Api.get(`/parties/states/lga/${id}/wards/`);
      return data;
    }
    return null;
  } catch (error) {
    return error;
  }
};

export const updateStatus = async ({ id, status }) => {
  try {
    const response = await Api.post(`/campaign/${id}/update-status/`, {
      status,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getUnpaginatedStates = async () => {
  try {
    const { data } = await Api.get(`/parties/states/unpaginated/`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getLGAsByStateId = ({ queryKey }) => {
  const [, id] = queryKey;
  try {
    const response = Api.get(`/parties/states/${id}/lgas/`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getSingleCampaignDetails = async ({ id }) => {
  const { data } = await Api.get(`/campaign/${id}/`);
  return data;
};

export const getCampaignStats = () => {
  try {
    const response = Api.get('campaign/stats/');
    return response;
  } catch (error) {
    return error;
  }
};

export const getPoll = async ({ queryKey }) => {
  const { id } = queryKey[1];
  const response = await Api.get(`/polls/${id}/`);
  return response?.data;
};

export const getAvailableManagers = async () => {
  try {
    const { data } = await Api.get('/campaign/unassigned-managers/');
    return data;
  } catch (error) {
    return error;
  }
};

export const getPollRespondentants = async ({ queryKey }) => {
  const { id } = queryKey[1];
  try {
    const { data } = await Api.get(`/polls/${id}/respondants/`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getPollRespondentantsQuestions = async ({ queryKey }) => {
  const { pollId, respondantId } = queryKey[1];
  try {
    if (respondantId) {
      const { data } = await Api.get(
        `/polls/${pollId}/respondants/${respondantId}/respond/`
      );
      return data;
    }
    return null;
  } catch (error) {
    return error;
  }
};

export const getPoliticalParties = async (queryKey, pageParam) => {
  const { searchTerm } = queryKey;
  try {
    const { data } = await Api.get(
      `/parties/?page=${pageParam}&page_size=10&search=${searchTerm}`
    );
    return data;
  } catch (error) {
    return error;
  }
};
