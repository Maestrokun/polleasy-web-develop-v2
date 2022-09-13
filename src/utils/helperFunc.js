/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable camelcase */

export const extractValueFromFilter = (filterArray, label) => {
  const temp_array = filterArray?.filter((val) => val.filter === label)?.[0]
    ?.value;

  return temp_array?.length
    ? `${temp_array?.join(`&${label}=`)?.toUpperCase()}`
    : '';
};

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

export function capitalize(input) {
  const words = input?.split(' ');
  const CapitalizedWords = [];
  words?.forEach((ele) => {
    const element = ele?.toUpperCase();
    CapitalizedWords?.push(
      element?.[0]?.toUpperCase() +
        element?.slice(1, element.length)?.toLowerCase()
    );
  });
  return CapitalizedWords.join(' ');
}
