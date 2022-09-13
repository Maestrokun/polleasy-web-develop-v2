import { getSingleCampaignDetails } from 'modules/Admin/services/campaigns';
import {
  getGovernonshipLocation,
  getPresidentialLocation,
} from 'modules/Admin/services/location';
import {
  getPollDetail,
  getPollTarget,
  savePollCriteria,
} from 'modules/Admin/services/polls';
import { useMutation, useQuery } from 'react-query';
import handleApiError from 'utils/handleApiError';

export const useFetchPollTarget = ({ id }) => {
  const { data, isLoading, ...rest } = useQuery(
    [`useFetchPollTarget-${id}`, id],
    () => getPollTarget({ id }),
    {
      enabled: !!id,
    }
  );

  return {
    pollTarget: data?.results || data?.data || data,
    gettingTarget: isLoading,
    ...rest,
  };
};

export const useSavePollCriteria = ({
  pollId,
  showNotification,
  queryClient,
}) => {
  const { mutate, isLoading, reset, ...rest } = useMutation(
    ({ payload }) => savePollCriteria({ payload, id: pollId }),
    {
      onSuccess: () => {
        showNotification('Target succesfully created', { type: 'success' });
        queryClient.invalidateQueries([`useFetchPollTarget-${pollId}`]);
      },
      onError: (err) => {
        reset();
        showNotification(handleApiError(err), { type: 'error' });
      },
    }
  );

  return {
    saveCriteria: mutate,
    savingCriteria: isLoading,
    ...rest,
  };
};

export const useFetchPollDetails = ({ pollId }) => {
  const { data, isLoading, ...rest } = useQuery(
    [`useFetchPollDetails-${pollId}`, pollId],
    () => getPollDetail({ id: pollId }),
    {
      enabled: !!pollId,
    }
  );

  return {
    pollDetails: data,
    fetchingPollDetail: isLoading,
    ...rest,
  };
};

export const useFetchPresidentialLocaiton = ({ params }) => {
  const { data, isLoading, ...rest } = useQuery(
    [`useFetchPresidentialLocaiton`, { params }],
    () => getPresidentialLocation({ params })
  );

  return {
    presidentialTargetLocaton: data?.data || data?.results,
    gettingPresLocation: isLoading,
    ...rest,
  };
};

export const useFetchGovernorLocaiton = ({ stateId }) => {
  const { data, isLoading, ...rest } = useQuery(
    [`useFetchGovernorLocaiton-${stateId}`],
    () => getGovernonshipLocation({ stateId }),
    {
      enabled: !!stateId,
    }
  );

  return {
    stateLocation: data?.data,
    gettingStateLocation: isLoading,
    ...rest,
  };
};

export const useFetchCampaignDetail = ({ id }) => {
  const { data, isLoading, ...rest } = useQuery(
    [`useFetchCampaignDetail-${id}`, id],
    () => getSingleCampaignDetails({ id }),
    {
      enabled: !!id,
    }
  );

  return {
    campaignDetail: data,
    gettingCampaign: isLoading,
    ...rest,
  };
};
