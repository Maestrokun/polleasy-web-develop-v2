import {
  getPartyStates,
  getPartyStatesLga,
} from 'modules/Admin/services/databaseFilters';
import { fetchUsers } from 'modules/Admin/services/userManagement';
import { useQuery } from 'react-query';

export const useFetchPartyStates = () => {
  const { data, isLoading } = useQuery(
    [`party-states`, { page_size: 100 }],
    getPartyStates
  );

  const filters = data?.data?.results?.map((res) => {
    return {
      id: res?.id,
      value: res?.name,
    };
  });

  return {
    filters,
    isLoading,
  };
};

export const useFetchPartyStatesLga = ({ stateId }) => {
  const { data, isLoading, refetch } = useQuery(
    [`party-states-lga-filter`, { id: stateId }],
    getPartyStatesLga,
    {
      enabled: !!stateId,
    }
  );

  const filters = data?.data?.data?.map((res) => {
    return {
      id: res?.id,
      value: res?.name,
    };
  });

  return {
    filters,
    isLoading,
    refetch,
  };
};

export const useFetchUsers = () => {
  const { data, isLoading, refetch } = useQuery(
    [`users`, { page_size: 100 }],
    fetchUsers
  );

  const filters = data?.data?.data?.map((res) => {
    return {
      id: res?.id,
      value: res?.name,
    };
  });

  return {
    filters,
    isLoading,
    refetch,
  };
};
