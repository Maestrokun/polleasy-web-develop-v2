import Api from 'utils/Api';

export const getUsers = ({ queryKey }) => {
  const { role } = queryKey[1];
  try {
    const response = Api.get(`/users?Role=${role}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const addCallGroup = (payload) => {
  try {
    const response = Api.post('/callgroups', payload);
    return response;
  } catch (error) {
    return error;
  }
};

// export const editCallGroup = (payload) => {
//   const { id, data } = payload;
//   try {
//     const response = Api.put(`/callgroups/${id}`, data);
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// export const getCallGroups = () => {
//   try {
//     const response = Api.get('/callgroups');
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// export const getCallGroup = ({ queryKey }) => {
//   const { id } = queryKey[1];
//   try {
//     const response = Api.get(`/callgroups/${id}`);
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// export const getCallGroupStats = () => {
//   try {
//     const response = Api.get('/callgroups/stats');
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// export const getCallGroupAgents = ({ queryKey }) => {
//   const { id } = queryKey[1];
//   try {
//     const response = Api.get(`/callgroups/${id}/agents`);
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// export const getCallGroupPolls = ({ queryKey }) => {
//   const { id } = queryKey[1];
//   try {
//     const response = Api.get(`/callgroups/${id}/polls`);
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

export const activateCallGroup = (id) => {
  try {
    const response = Api.put(`/callgroups/${id}/activate`);
    return response;
  } catch (error) {
    return error;
  }
};

// export const deactivateCallGroup = (id) => {
//   try {
//     const response = Api.put(`/callgroups/${id}/deactivate`);
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// api python integration

export const getCallGroups = async ({ params }) => {
  const { data } = await Api.get('/campaign/call-groups/', { params });
  return data;
};

export const getCallGroup = async ({ id }) => {
  const { data } = await Api.get(`/campaign/call-groups/${id}/`);
  return data;
};

export const getCallGroupAgents = async ({ id, params }) => {
  const { data } = await Api.get(`/campaign/call-groups/${id}/agents/`, {
    params,
  });
  return data;
};

export const getUsersByRole = async ({ params }) => {
  const { data } = await Api.get('/auth/users/', { params });

  return data;
};

export const createCallGroup = async ({ payload }) => {
  const { data } = await Api.post('/campaign/call-groups/', payload);
  return data;
};

export const getCallGroupStats = async () => {
  const { data } = await Api.get('/campaign/call-groups/stats/');
  return data;
};

// this endpoint help to updae the status of the call group
// from the activation and the deactivation

export const deactivateCallGroup = async ({ id, payload }) => {
  const { data } = await Api.post(
    `/campaign/call-groups/${id}/status/`,
    payload
  );
  return data;
};

export const getCallGroupPolls = async ({ id, params }) => {
  const { data } = await Api.get(`/campaign/call-groups/${id}/polls/`, {
    params,
  });
  return data;
};

export const editCallGroup = async ({ payload, id }) => {
  const { data } = await Api.put(`/campaign/call-groups/${id}/`, payload);
  return data;
};

export const getPollAgents = async ({ pollId, params }) => {
  const { data } = await Api.get(`/polls/${pollId}/agents/`, { params });
  return data;
};
