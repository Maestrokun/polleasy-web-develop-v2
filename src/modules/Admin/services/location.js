import Api from 'utils/Api';

export const getPresidentialLocation = async ({ params }) => {
  const { data } = await Api.get(`/parties/states/`, { params });
  return data;
};

export const getGovernonshipLocation = async ({ stateId }) => {
  const { data } = await Api.get(`/parties/states/${stateId}/lgas`);
  return data;
};

export const getSeantorialLocation = async () => {
  const { data } = await Api.get(``);
  return data;
};

export const getGovernonshipLocationUnpaginated = async ({ stateId }) => {
  const { data } = await Api.get(`/parties/states/${stateId}/`);
  return data;
};
