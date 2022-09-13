/* eslint-disable no-unused-expressions */
import {
  createCallGroup,
  deactivateCallGroup,
  editCallGroup,
  getCallGroup,
  getCallGroupAgents,
  getCallGroupPolls,
  getCallGroups,
  getCallGroupStats,
  getPollAgents,
  getUsersByRole,
} from 'modules/Admin/services/callGroup';
import { getSinglePoll } from 'modules/Admin/services/polls';
import { useMutation, useQuery } from 'react-query';
import handleApiError from 'utils/handleApiError';

export const useFetchCallGroups = ({
  setDataSource,
  params,
  setTableParams,
  showNotification,
}) => {
  const { data, isLoading, ...rest } = useQuery(
    ['useFetchCallGroups', { params }],
    () => getCallGroups({ params }),
    {
      onSuccess: (values) => {
        setDataSource && setDataSource(values?.results);
        setTableParams &&
          setTableParams((prev) => ({
            ...prev,
            pagination: {
              ...prev.pagination,
              total: values?.total,
              pageSize: values?.page_size,
            },
          }));
      },
      onError: (err) => {
        showNotification(handleApiError(err), { type: 'error' });
      },
    }
  );
  return {
    callgroup: data,
    fetchingCallGroup: isLoading,
    ...rest,
  };
};

export const useFetchSIngleCallGroup = ({ callGroupId }) => {
  const { data, isLoading, ...rest } = useQuery(
    [`useFetchSIngleCallGroup-${callGroupId}`, callGroupId],
    () => getCallGroup({ id: callGroupId }),
    {
      enabled: !!callGroupId,
    }
  );

  return {
    singleCallGroup: data,
    fetchingCallGroupById: isLoading,
    ...rest,
  };
};

export const useFetchUserByRole = ({ role, search = '' }) => {
  const params = {
    role,
    search,
  };
  const { data, isLoading, ...rest } = useQuery(
    [`useFetchUserByRole-${role}`, { params }],
    () => getUsersByRole({ params }),
    {
      enabled: !!role,
    }
  );

  return {
    filteredUserByRole: data?.results,
    fetchingUserByRole: isLoading,
    ...rest,
  };
};

export const useCreateCallCenter = ({
  showNotification,
  queryClient,
  setModal,
  state,
}) => {
  const { mutate, reset, isLoading, ...rest } = useMutation(
    ({ payload }) => createCallGroup({ payload }),
    {
      onSuccess: () => {
        showNotification('Call Group Center Successfully created', {
          type: 'success',
        });
        queryClient.refetchQueries(['useFetchCallGroups']);
        setModal({
          ...state,
          modalName: 'successModal',
          message: 'Call Center Created Successfully',
          redirect: 'Redirecting in 0:6 seconds',
        });
      },
      onError: (err) => {
        reset();
        showNotification(handleApiError(err), { type: 'error' });
      },
    }
  );

  return {
    createCallCenter: mutate,
    creatingCenter: isLoading,
    ...rest,
  };
};

export const useCallGroupStats = () => {
  const { data, isLoading, ...rest } = useQuery(['useCallGroupStats'], () =>
    getCallGroupStats()
  );

  return {
    callGroupStats: data?.data,
    fetchingCallStats: isLoading,
    ...rest,
  };
};

export const useFetchCallGroupAgent = ({ id, params }) => {
  const { data, isLoading, ...rest } = useQuery(
    [`useFetchCallGroupAgent-${id}`, { params, id }],
    () => getCallGroupAgents({ id, params }),
    {
      enabled: !!id,
    }
  );

  return {
    callGroupAgents: data?.data || data?.results,
    gettingAgent: isLoading,
    ...rest,
  };
};

export const useDeactivateCallGroup = ({
  showNotification,
  queryClient,
  setModal,
  callGroupId,
  isActivatoin,
}) => {
  const { mutate, isLoading, reset, ...rest } = useMutation(
    ({ payload }) => deactivateCallGroup({ id: callGroupId, payload }),
    {
      onSuccess: () => {
        showNotification('Call Group Center Successfully Deactivated', {
          type: 'success',
        });
        queryClient.invalidateQueries(['useFetchCallGroups']);
        setModal((prev) => ({
          ...prev,
          modalName: 'successModal',
          message: isActivatoin
            ? 'Call Center deactivated successfully'
            : 'Call Center activated Successfully',
          redirect: 'Redirecting in 0:6 seconds',
        }));
      },
      onError: (err) => {
        reset();
        showNotification(handleApiError(err), { type: 'error' });
      },
    }
  );

  return {
    deactivateCallGroup: mutate,
    deactivatingCallGroup: isLoading,
    ...rest,
  };
};

export const useFetchCallGroupPolls = ({
  id,
  setDataSource,
  params,
  setTableParams,
  filterStatus,
}) => {
  const {
    data: results,
    isLoading,
    ...rest
  } = useQuery(
    [`useFetchCallGroupPolls-${id}`, { id, params }],
    () => getCallGroupPolls({ id, params }),
    {
      enabled: !!id,
      onSuccess: (data) => {
        setTableParams &&
          setTableParams((prev) => ({
            ...prev,
            pagination: {
              ...prev.pagination,
              pageSize: data?.page_size,
              pageNumber: data?.current_page,
              total: data?.total,
            },
          }));
        const polls = data?.results || data?.data || [];
        const filteredData =
          polls?.length > 0
            ? polls?.filter((v) => v.status !== 'DRAFT')
            : polls;
        setDataSource && setDataSource(filterStatus ? filteredData : polls);
      },
    }
  );

  return {
    callGroupPolls: results?.data || results?.results || results,
    gettinggPolls: isLoading,
    ...rest,
  };
};

export const useEditCallGroup = ({
  id,
  queryClient,
  setModal,
  showNotification,
}) => {
  const { reset, mutate, isLoading, ...rest } = useMutation(
    ({ payload }) => editCallGroup({ id, payload }),
    {
      onSuccess: () => {
        setModal((prev) => ({
          ...prev,
          modalName: 'successModal',
          message: 'Call Center Successfully Edited',
          redirect: 'Redirecting in 0:6 seconds',
        }));
        queryClient.invalidateQueries([`useFetchSIngleCallGroup-${id}`, id]);
        // queryClient.refetchQueries([`useFetchSIngleCallGroup-${id}`, id]);
      },
      onError: (err) => {
        reset();
        showNotification(handleApiError(err), { type: 'error' });
      },
    }
  );

  return {
    updateCallGroup: mutate,
    updatingCallGroup: isLoading,
    ...rest,
  };
};

export const useFetchSinglePoll = ({ pollId }) => {
  const { data, isLoading, ...rest } = useQuery(
    [`useFetchSinglePoll-${pollId}`, pollId],
    () => getSinglePoll({ id: pollId }),
    {
      enabled: !!pollId,
    }
  );

  return {
    singlePoll: data,
    fetchSinglePoll: isLoading,
    ...rest,
  };
};

export const useFetchPollAgent = ({ pollId, params, setDataSource }) => {
  const {
    data: results,
    isLoading,
    ...rest
  } = useQuery(
    [`useFetchPollAgent-${pollId}`, { pollId, params }],
    () => getPollAgents({ pollId, params }),
    {
      enabled: !!pollId,
      onSuccess: (data) => {
        setDataSource && setDataSource(data?.results || data?.data || data);
      },
    }
  );

  return {
    pollAgentList: results?.results || results?.data,
    gettingPollAgent: isLoading,
    ...rest,
  };
};
