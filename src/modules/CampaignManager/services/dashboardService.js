/* eslint-disable import/prefer-default-export */
import AnalyticAPI from 'utils/AnalyticAPI';

export const analyticStatService = async ({ keyword }) => {
  const params = {
    keyword,
  };
  const { data } = await AnalyticAPI.get('tweets/statistics/', { params });
  return data;
};

export const wordCloudService = async ({ keyword }) => {
  const params = {
    keyword,
  };
  const { data } = await AnalyticAPI.get('tweets/word-map/', { params });
  return data;
};
