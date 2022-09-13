/* eslint-disable import/prefer-default-export */
const defaultObj = (key) => ({
  [`name-${key}`]: '',
});

export const getAdditionalDefaultValue = (arr) => {
  let payload = {};
  arr?.forEach((field) => {
    payload = {
      ...payload,
      ...defaultObj(field),
    };
  });
  return payload;
};
