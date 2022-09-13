import React from 'react';
import CreateParty from 'modules/Admin/pages/Settings/PartyManagement/MyParty/CreateParty';
import { myParty } from 'modules/Admin/pages/Settings/services';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

function MyParty() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(['fetchMyParty'], myParty);

  if (data?.data?.id) {
    navigate(`/admin/settings/party-management/view-executives`, {
      state: { partyId: data?.data?.id },
    });
  }

  if (!data && isLoading) {
    return (
      <Grid item md={12}>
        <Skeleton
          variant="rectangle"
          animation="wave"
          height={500}
          sx={{ borderRadius: '4px' }}
        />
      </Grid>
    );
  }

  return <>{!data?.data?.id && <CreateParty />} </>;
}

export default MyParty;
