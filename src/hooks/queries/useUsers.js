import { useQuery } from 'react-query';

export const useFectchCallGroupAgents = () => {
  const { data, isLoading, ...rest } = useQuery('', () => null);

  return {
    callGroupAgent: data,
    fetchingCallGroupAgent: isLoading,
    ...rest,
  };
};

export const useFetchUser = () => {
  const { data } = useQuery('', () => null);

  return {
    users: data,
  };
};
