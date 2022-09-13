import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { TextField, Drawer } from 'shared';

import useDrawer from 'hooks/useDrawer';
import useModal from 'hooks/useModal';
import useAlert from 'hooks/useAlert';

import useStyles from 'modules/Admin/components/PoliticalParties/Drawer/EditPoliticalParty/styled.editPoliticalParty';
import UploadForm from 'modules/Admin/components/PoliticalParties/Form/UploadForm';

import handleApiError from 'utils/handleApiError';

import { editPoliticalParties } from 'modules/Admin/pages/Settings/services/politicalPartiesServices';
import schema from 'modules/Admin/validation/Settings/CreatePartyValidation';
import { yupResolver } from '@hookform/resolvers/yup';

function EditPoliticalParty() {
  const classes = useStyles();
  const { showNotification } = useAlert();
  const [modal, setModal] = useModal();
  const [drawer] = useDrawer();
  const { mutateAsync } = useMutation(editPoliticalParties);
  const queryClient = useQueryClient();

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      id: '',
      partyName: '',
      partyAlias: '',
      flag: '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      id: drawer?.data?.id,
      partyName: drawer?.data?.name,
      partyAlias: drawer?.data?.alias,
      flag: drawer?.data?.flag,
    });
  }, [drawer]);

  const handleEdit = useCallback(
    async (data) => {
      try {
        const formData = new FormData();
        formData.append('name', data.partyName);
        formData.append('alias', data.partyAlias);
        formData.append('my_party', false);
        if (typeof data.flag !== 'string') {
          formData.append('flag', data.flag[0][0]);
        }

        const payload = {
          id: data.id,
          data: formData,
        };

        const response = await mutateAsync(payload);
        if (response.status === 200) {
          queryClient.invalidateQueries('getPoliticalParties');
          setModal({
            ...modal,
            modalName: 'successModal',
            message: 'Political Party Successfully Edited',
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
      drawerName="editPoliticalParty"
      handleSubmit={handleSubmit(handleEdit)}
      titleText="Edit Political Party"
      primaryButton="Save"
      secondaryButton="Cancel"
      isSubmitting={isSubmitting}
    >
      <Box className={classes.root} component="form">
        <TextField control={control} name="partyName" label="Party Name" />
        <TextField control={control} name="partyAlias" label="Party Alias" />
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

export default EditPoliticalParty;
