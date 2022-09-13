import Api from 'utils/Api';

export const getOutboundLead = async () => {
  try {
    const response = await Api.get(`/polls/outbound-lead/dashboard/`);
    return response?.data?.data;
  } catch (error) {
    return error;
  }
};

export const getPollInfo = async ({ queryKey }) => {
  const { id } = queryKey[1];

  const response = await Api.get(`polls/${id}/info/`);
  return response?.data?.data;
};

const getUnassignedPOll = async () => {
  const response = await Api.get('/polls/?is_assigned=false&non_draft=true');
  return response?.data?.results;
};

const geAssignedPOll = async () => {
  const response = await Api.get(
    '/polls/outbound-lead/dashboard/?is_assigned=true'
    // 'polls/?is_assigned=true'
  );
  return response?.data?.data;
};

const getindividualAssignment = (id) => async () => {
  const response = await Api.get(`/polls/${id}/assignments/`);
  return response?.data?.data;
};

const getAllAgents = async () => {
  const response = await Api.get(`/auth/users/?role=OUTBOUND_AGENT`);
  return response?.data?.results;
};

export const getAllPollRespondents = async (id) => {
  const response = await Api.get(`/polls/${id}/respondants/`);
  return response?.data?.results;
};

const getAllAgentsbyPollId = () => async () => {
  const response = await Api.get(`/campaign/call-groups/lead-agents/`);
  return response?.data?.results;
};

const assignBulkPost = async (poll_assignments) => {
  const response = await Api.post('/polls/bulk-assign/', {
    poll_assignments,
  });

  return response?.data;
};

export default {
  getUnassignedPOll,
  getindividualAssignment,
  geAssignedPOll,
  getAllAgents,
  assignBulkPost,
  getAllAgentsbyPollId,
  getAllPollRespondents,
};
