import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

import { TextField, Drawer } from 'shared';

import useModal from 'hooks/useModal';
import useDrawer from 'hooks/useDrawer';
import useAlert from 'hooks/useAlert';

import useStyles from 'modules/Admin/components/CallGroup/Drawer/EditCallCenter/styled.editCallCenter';
import {
  useEditCallGroup,
  useFetchUserByRole,
} from 'hooks/queries/useCallGroup';
import SuccessModal from 'components/Modal';

function EditCallCenter() {
  const classes = useStyles();
  const { showNotification } = useAlert();
  const [callGroupLead, setCallGroupLead] = React.useState([]);
  const [state] = useDrawer();
  const [modal, setModal] = useModal();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      lead: '',
    },
  });
  // eslint-disable-next-line no-unused-vars
  const { updateCallGroup, updatingCallGroup, isSuccess } = useEditCallGroup({
    showNotification,
    queryClient,
    setModal,
    id,
    modal,
  });

  const {
    filteredUserByRole,
    isSuccess: leadSuccess,
    fetchingUserByRole: loadingLead,
  } = useFetchUserByRole({
    role: 'CALL_GROUP_LEAD',
  });

  const onUpdate = (data) => {
    const payload = {
      name: data.name,
      type: state.data.type,
      tenant: state.data.tenant,
      lead: data.lead,
      agents: state.data.agents.map((v) => v.id),
    };
    updateCallGroup({ payload });
  };

  React.useEffect(() => {
    if (leadSuccess) setCallGroupLead([...filteredUserByRole]);
  }, [leadSuccess, filteredUserByRole]);

  useEffect(() => {
    if (state.data) {
      reset({
        name: state?.data?.name,
        lead: state?.data?.lead?.id,
      });
    }
  }, [state]);

  return (
    <>
      <Drawer
        drawerName="editCallCenter"
        titleText="Edit Call Center"
        primaryButton={updatingCallGroup ? 'Updating....' : 'Save Edit'}
        secondaryButton="Cancel"
        isSubmitting={updatingCallGroup}
        handleSubmit={handleSubmit(onUpdate)}
      >
        <Box className={classes.root} component="form">
          <TextField control={control} name="name" label="Name" />
          <TextField
            select
            label="Call Group Lead"
            name="lead"
            control={control}
          >
            {!loadingLead && callGroupLead.length > 0 && (
              <Box className={classes.searchBox}>
                <TextField
                  control={control}
                  name="search"
                  placeholder="Search"
                  type="search"
                  onChange={() => {}}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}
            {!loadingLead && loadingLead && (
              <Typography>Fetching user</Typography>
            )}
            {!loadingLead && callGroupLead.length === 0 && (
              <Typography sx={{ textAlign: 'center' }}>
                No user found
              </Typography>
            )}
            {!loadingLead &&
              callGroupLead.map((lead) => (
                <MenuItem
                  value={lead.id}
                  sx={{
                    textTransform: 'capitalize',
                    m: 'auto',
                    width: '90%',
                    px: 0,
                  }}
                >
                  {`${lead.firstname} ${lead.middle_name ?? ''} ${
                    lead.lastname
                  }`}
                </MenuItem>
              ))}
          </TextField>
        </Box>
      </Drawer>
      <SuccessModal />
    </>
  );
}

export default EditCallCenter;
