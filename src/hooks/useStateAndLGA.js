import {
  getLGAsByStateId,
  getUnpaginatedStates,
} from 'modules/Admin/services/campaigns';
import { useState } from 'react';
import { useQuery } from 'react-query';
import handleApiError from 'utils/handleApiError';

export default function useStateAndLGA(_stateId) {
  const [stateId, setStateId] = useState(null);

  const { data: states } = useQuery(['states-list'], getUnpaginatedStates, {
    onError: (e) => {
      // eslint-disable-next-line
      console.error(handleApiError(e));
    },
    onSuccess: ({ data }) => {
      setStateId(data[0]?.id);
    },
  });

  const { data: LGAs } = useQuery(
    ['lga-list', _stateId ?? stateId],
    getLGAsByStateId,
    {
      enabled: !!_stateId || !!stateId,
      onError: (e) => {
        // eslint-disable-next-line
        console.error(handleApiError(e));
      },
    }
  );

  const values = {
    states: states?.data,
    LGAs: LGAs?.data?.data ? LGAs?.data?.data : [],
  };

  return values;
}
