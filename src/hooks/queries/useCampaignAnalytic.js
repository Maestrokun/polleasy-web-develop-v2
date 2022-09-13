/* eslint-disable import/prefer-default-export */
import {
  analyticStatService,
  wordCloudService,
} from 'modules/CampaignManager/services/dashboardService';
import { useQuery } from 'react-query';
// import handleApiError from 'utils/handleApiError';

export const useAnalyticStats = ({ keyword }) => {
  const { data, isLoading, ...rest } = useQuery(
    [`useAnalyticStats-${keyword}`, keyword],
    () => analyticStatService({ keyword })
  );

  return {
    analyticData: data?.data,
    fetchingAnalyticData: isLoading,
    ...rest,
  };
};

export const useWordCloud = ({ keyword }) => {
  const { data, isLoading, ...rest } = useQuery(
    [`useWordCloud-${keyword}`, keyword],
    () => wordCloudService({ keyword })
  );

  return {
    wordCloud: data?.data,
    gettingWordCloud: isLoading,
    ...rest,
  };
};
