const { default: Api } = require('utils/Api');

export const myParty = async () => {
  const { data } = await Api.get('/parties/my_party');
  return data;
};

export const createParty = async ({ formdata }) => {
  const { data } = await Api.post('/parties/', formdata);
  return data;
};

export const getPartyMembers = async ({ queryKey }) => {
  const { pageNumber, pageSize } = queryKey[1];
  const { data } = await Api.get(
    `/parties/members/?page=${pageNumber}&page_size=${pageSize}`
  );
  return data;
};
export const singlePartyMember = async ({ queryKey }) => {
  const { memberId } = queryKey[1];
  const response = await Api.get(`/parties/members/${memberId}/`);
  return response?.data;
};

export const createPartyMembers = async ({ formdata }) => {
  const { data } = await Api.post(`parties/members/`, formdata);
  return data;
};
export const updatePartyMembers = async ({ id, formdata }) => {
  const { data } = await Api.put(`parties/members/${id}/`, formdata);
  return data;
};

export const bulkUploadPartyMembers = async ({ formdata }) => {
  const { data } = await Api.post(
    `parties/members/bulk-party-member/`,
    formdata
  );
  return data;
};

export const getExecutives = async ({ queryKey }) => {
  const {
    page_number,
    page_size,
    search,
    ward,
    zone,
    state,
    senatorial_district,
    lga,
    jurisdiction,
  } = queryKey[1];
  const jurisdictionValues = jurisdiction?.find(
    (f) => f.filter === 'Jurisdiction:All'
  )?.value;
  const jurisdictionString = jurisdictionValues
    ? jurisdictionValues?.map((v) => `jurisdiction=${v}`).join('&')
    : '';
  const { data } = await Api.get(
    `/parties/members/?page=${page_number}&page_size=${page_size}${
      search ? `&search=${search}` : ''
    }${ward ? `&ward=${ward}` : ''}${zone ? `&zone=${zone}` : ''}${
      state ? `&state=${state}` : ''
    }${
      senatorial_district ? `&senatorial_district=${senatorial_district}` : ''
    }${lga ? `&lga=${lga}` : ''}${
      jurisdictionString ? `&${jurisdictionString}` : ''
    }`
  );
  return data;
};

export const editParty = async ({ id, formdata }) => {
  const { data } = await Api.patch(`parties/${id}/`, formdata);
  return data;
};
export const getPartyData = async ({ queryKey }) => {
  const { partyId } = queryKey[1];
  const { data } = await Api.get(`parties/${partyId}`);
  return data;
};
export const getPartyStates = async ({ queryKey }) => {
  const { zoneId } = queryKey[1];
  const { data } = await Api.get(`parties/zones/${zoneId}/states/`);
  return data;
};

export const getPartyZones = async ({ queryKey }) => {
  const { search, pageNumber, pageSize } = queryKey[1];
  const { data } = await Api.get(
    `parties/zones/?search=${search}&page=${pageNumber}&page_size=${pageSize}`
  );
  return data;
};
export const getPartyDistricts = async ({ queryKey }) => {
  const { stateId } = queryKey[1];
  const { data } = await Api.get(
    `parties/states/${stateId}/senatorial-districts/`
  );
  return data;
};
export const getPartyLocalGovernments = async ({ queryKey }) => {
  const { stateId } = queryKey[1];
  const { data } = await Api.get(`parties/states/${stateId}/lgas/`);
  return data;
};

export const getPartyLocalGovernmentWards = async ({ queryKey }) => {
  const { lgaId } = queryKey[1];
  const { data } = await Api.get(`parties/states/lga/${lgaId}/wards/`);
  return data;
};
