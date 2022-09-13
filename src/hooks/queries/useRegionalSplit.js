/*
This hook accepts a campaignID
*/

import { useState } from 'react';
import { useQuery } from 'react-query';
import { getLGAsByStateId } from 'modules/Admin/services/campaigns';
import { getAllStates, getCampaignById } from 'modules/Admin/services/polls';

const locations = {
  PRESIDENTIAL: [],
  GUBERNATORIAL: [],
  SENATORIAL: [],
  HOUSE_ASSEMBLY: [],
  HOUSE_OF_REPRESENTATIVE: [],
  CHAIRMANSHIP: [],
  COUNCILLORSHIP: [],
};

// eslint-disable-next-line
export const useRegionalSplit = (campaignId) => {
  const [electionType, setElectionType] = useState(null);
  const [id, setId] = useState(null);

  const IdSetter = (data) => {
    switch (data?.type) {
      case 'GUBERNATORIAL':
        setId(data?.state?.id);
        break;
      case 'SENATORIAL':
        setId(data?.senatorial_district?.id);
        break;
      case 'HOUSE_ASSEMBLY':
        setId(data?.house_assembly?.id);
        break;
      case 'HOUSE_OF_REPRESENTATIVE':
        setId(data?.house_rep?.id);
        break;
      case 'CHAIRMANSHIP':
        setId(data?.lga?.id);
        break;
      case 'COUNCILLORSHIP':
        setId(data?.ward?.id);
        break;
      default:
        break;
    }
  };

  useQuery(['get-single-campaign'], () => getCampaignById(campaignId), {
    onSuccess: ({ data }) => {
      setElectionType(data?.type);
      IdSetter(data);
    },
  });

  useQuery(['get-states'], getAllStates, {
    enabled: electionType === 'PRESIDENTIAL',
    onSuccess: ({ data }) => {
      locations.PRESIDENTIAL = data.results;
    },
  });

  useQuery(['get-lgas', id], getLGAsByStateId, {
    enabled: electionType === 'GUBERNITORIAL',
    onSuccess: ({ data }) => {
      locations.GUBERNATORIAL = data?.data;
    },
  });

  return locations[electionType];
};
