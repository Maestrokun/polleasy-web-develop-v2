export function partyTopStat(data) {
  return [
    { title: 'Date Registered', label: data?.registration_date || '--' },
    { title: 'State', label: data?.state || '--' },
    { title: 'Local Government Area ', label: data?.lga || '--' },
    { title: 'Ward', label: data?.Ward || '--' },
    { title: 'Polling Unit', label: data?.polling_unit?.name || '--' },
  ];
}
export function convertFormData(data) {
  const keys = Object.keys(data);
  let result = [];
  if (keys.length) {
    result = keys.map((key) => ({
      poll_assignment: key,
      agents: data[key]?.value?.map(({ value }) => value),
    }));
  }
  return result;
}

export const tet = {};
