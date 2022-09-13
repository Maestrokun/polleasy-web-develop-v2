import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { TextField, Drawer } from 'shared';

import useStyles from 'modules/Admin/components/PoliticalParties/Drawer/AddPoliticalParty/styled.AddPoliticalParty';
import UploadForm from 'modules/Admin/components/PoliticalParties/Form/UploadForm';

import useAlert from 'hooks/useAlert';
import useDrawer from 'hooks/useDrawer';
import useModal from 'hooks/useModal';

import handleApiError from 'utils/handleApiError';

import { addPoliticalParty } from 'modules/Admin/pages/Settings/services/politicalPartiesServices';
import schema from 'modules/Admin/validation/Settings/CreatePartyValidation';
import { yupResolver } from '@hookform/resolvers/yup';

function AddPoliticalParty() {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const [modal, setModal] = useModal();
  const [drawer] = useDrawer();
  const { showNotification } = useAlert();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      partyname: '',
      partyalias: '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      partyname: '',
      partyalias: '',
    });
  }, [drawer]);

  const { mutateAsync } = useMutation(addPoliticalParty);

  const handleCreateParty = useCallback(
    async (data) => {
      try {
        const formData = new FormData();
        formData.append('name', data.partyname);
        formData.append('alias', data.partyalias);
        formData.append('flag', data.flag[0][0]);
        formData.append('my_party', false);

        const response = await mutateAsync(formData);
        if (response.status === 201) {
          queryClient.invalidateQueries('getPoliticalParties');
          setModal({
            ...modal,
            modalName: 'successModal',
            message: 'Political Party Successfully Added',
            redirect: 'You will be redirected in 1s',
          });
        }
      } catch (error) {
        showNotification?.(handleApiError(error), { type: 'error' });
      }
    },
    [modal]
  );

  return (
    <Drawer
      drawerName="addPoliticalParty"
      handleSubmit={handleSubmit(handleCreateParty)}
      titleText="Add Political Party"
      primaryButton="Save"
      secondaryButton="Cancel"
      isSubmitting={isSubmitting}
    >
      <Box className={classes.root} component="form">
        <TextField control={control} name="partyname" label="Party Name" />
        <TextField control={control} name="partyalias" label="Party Alias" />
        <Typography
          className={classes.fileUpload}
          variant="body1"
          sx={{ mt: 0 }}
        >
          Upload Party Flag
          {errors.flag && (
            <span className="bg-yellow-400">{errors.flag.message}</span>
          )}
        </Typography>
      </Box>
      <UploadForm control={control} />
    </Drawer>
  );
}

export default AddPoliticalParty;
