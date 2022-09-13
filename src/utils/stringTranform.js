/* eslint-disable func-names */
import { capitalize } from 'lodash';

export const underscoreRemove = (str = '') => {
  return str?.replace(/_/g, ' ');
};

export const capitalizeWord = (str = '') => {
  const re = /(\b[a-z](?!\s))/g;
  if (str) {
    return str.toLowerCase().replace(re, (x) => capitalize(x));
  }
  return '';
};

export const underSCoreCapitalizeWord = (str = '') => {
  if (str) {
    const removeWOrd = underscoreRemove(str);
    return capitalizeWord(removeWOrd);
  }
  return '';
};
