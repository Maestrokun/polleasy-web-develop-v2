import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import EditModal from 'modules/Admin/components/Settings/Modal/EditModal';
import SuccessModal from 'modules/Admin/components/Settings/Modal/SuccessModal';
import { TextField, Button } from 'shared';
import FileUpload from 'shared/Misc/Upload/Upload';
import useModal from 'hooks/useModal';
import useAlert from 'hooks/useAlert';
import useStyles from 'modules/Admin/pages/Settings/PartyManagement/MyParty/CreateParty/styled.index';
import handleApiError from 'utils/handleApiError';
import schema from 'modules/Admin/validation/Settings/CreatePartyValidation';
import { editParty } from 'modules/Admin/pages/Settings/services';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import CircularProgress from '@mui/material/CircularProgress';

function EditParty() {
  const classes = useStyles();
  const [modalState, setModalState] = useModal();
  const { showNotification } = useAlert();
  const location = useLocation();
  const partyData = location?.state?.party;
  const navigate = useNavigate();
  const [editFlag, setEditFlag] = useState(true);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      partyname: '',
      partyalias: '',
      flag: '',
      id: '',
    },
    resolver: yupResolver(schema),
  });
  const { mutate, isLoading } = useMutation(editParty, {
    onError: (error) => {
      showNotification?.(handleApiError(error), { type: 'error' });
    },
    onSuccess: () => {
      showNotification('Party updated successfully', {
        type: 'success',
      });
      navigate(`/admin/settings/party-management/view-executives`, {
        state: { partyId: partyData?.id },
      });
      setModalState({
        ...modalState,
        modalName: 'successModal',
        message: 'Party Structure Updated Successfully',
        redirect: 'You will be redirected in 1s',
        redirectTime: 1000,
      });
    },
  });
  useEffect(() => {
    reset({
      partyname: partyData?.name,
      partyalias: partyData?.alias,
      flag: editFlag ? partyData?.flag : '',
      id: partyData?.id,
    });
  }, [partyData]);
  const handleSave = (data) => {
    const formdata = new FormData();
    formdata.append('name', data.partyname);
    formdata.append('alias', data.partyalias);
    formdata.append('my_party', true);
    if (typeof data.flag !== 'string') {
      formdata.append('flag', data.flag[0][0]);
    }
    const id = data?.id;
    mutate({ id, formdata });
  };
  return (
    <Box className={classes.bread}>
      <Grid container spacing={0} justifyContent="space-between">
        <Grid component="main" item md={7.3}>
          <Breadcrumbs sx={{ p: 0, mb: 0, mt: 0 }} style={{ color: '#6B6C7E' }}>
            <Link to="/admin/settings/party-management/view-executives">
              <Typography
                sx={{ p: 0 }}
                variant="body1"
                style={{ color: '#6B6C7E' }}
              >
                My Party
              </Typography>
            </Link>
            <Typography
              sx={{ p: 0 }}
              variant="body2"
              style={{ color: '#393A4A' }}
            >
              Edit
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Box className={classes.root}>
        <Typography variant="h3">Party Details</Typography>
        <form>
          <TextField control={control} label="Party Name" name="partyname" />
          <TextField control={control} label="Party Alias" name="partyalias" />
          <Box style={{ width: '744px', height: '145px' }}>
            <Typography style={{ color: '#004AD7' }}>
              Upload Party Flag
              {errors.flag && (
                <span className="bg-yellow-400">{errors.flag.message}</span>
              )}
              <Controller
                name="flag"
                control={control}
                render={({ field: { value = [], onChange, ...fields } }) => (
                  <FileUpload
                    showTop
                    accept="jpg, png"
                    onChange={(flag) => {
                      onChange(flag ? [flag] : []);
                    }}
                    files={value}
                    onSetEditUrl={setEditFlag}
                    {...fields}
                  />
                )}
              />
            </Typography>
          </Box>
          <Grid
            container
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            sx={{ mt: 42, ml: 126 }}
          >
            <Grid item>
              <Link
                to="/admin/settings/party-management/view-executives"
                style={{ textDecoration: 'none' }}
              >
                <Button className="btnCancel">Cancel</Button>
              </Link>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                onClick={handleSubmit(handleSave)}
              >
                {isSubmitting ? (
                  <Box className={classes.progressWrapper}>
                    <CircularProgress size={20} sx={{ color: '#fff' }} />
                  </Box>
                ) : (
                  `Save & Continue`
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <EditModal />
      <SuccessModal />
    </Box>
  );
}

export default EditParty;
