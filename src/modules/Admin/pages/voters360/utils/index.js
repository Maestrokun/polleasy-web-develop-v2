/* eslint-disable no-restricted-syntax */
export const queryParamsHelper = (queryParams) => {
  let queries = '?';

  for (const [key, value] of Object.entries(queryParams || {})) {
    if (!!key && key !== undefined && key !== null && value !== '')
      queries += `${key}=${value}&`;
  }
  // eslint-disable-next-line no-unsafe-optional-chaining
  return queries?.substring(0, queries?.length - 1);
};

export function downloadCsvHelper(
  filename,
  textInput,
  format = 'data:text/csv'
) {
  const element = document.createElement('a');
  element.setAttribute('href', `${format}, ${encodeURIComponent(textInput)}`);
  element.setAttribute('download', filename);
  element.setAttribute('target', '_blank');
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function voterTopStat(data) {
  return [
    { label: 'State', value: data?.voting_state?.name },
    { label: 'Local Government Area', value: data?.voting_lga?.name },
    { label: 'Ward', value: data?.voting_ward?.name },
    { label: 'Polling Unit', value: data?.voting_pu?.name },
  ];
}

export function voter360TopStat(data, loading) {
  if (loading) return [];
  return [
    { title: 'Total voters', label: data?.total || 0 },
    { title: 'Total Male', label: data?.male || 0 },
    { title: 'Total Female ', label: data?.female || 0 },
    { title: 'Unknown Gender', label: data?.others || 0 },
  ];
}
