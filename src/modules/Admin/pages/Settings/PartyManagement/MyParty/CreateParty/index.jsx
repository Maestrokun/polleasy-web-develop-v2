import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import SuccessModal from 'modules/Admin/components/Settings/Modal/SuccessModal';
import { TextField, Button } from 'shared';
import FileUpload from 'shared/Misc/Upload/Upload';
import useModal from 'hooks/useModal';
import useAlert from 'hooks/useAlert';
import handleApiError from 'utils/handleApiError';
import useStyles from 'modules/Admin/pages/Settings/PartyManagement/MyParty/CreateParty/styled.index';
import schema from 'modules/Admin/validation/Settings/CreatePartyValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import CircularProgress from '@mui/material/CircularProgress';
import { createParty } from 'modules/Admin/pages/Settings/services';
import { useMutation } from 'react-query';

function CreateParty() {
  const classes = useStyles();
  const [modalState, setModalState] = useModal();
  const { showNotification } = useAlert();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      partyname: '',
      partyalias: '',
      flag: '',
    },
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = useMutation(createParty, {
    onError: (error) => {
      showNotification?.(handleApiError(error), { type: 'error' });
    },
    onSuccess: (data) => {
      showNotification('Party created successfully', {
        type: 'success',
      });
      navigate(`/admin/settings/party-management/view-executives`, {
        state: { partyId: data?.id },
      });
      setModalState({
        ...modalState,
        modalName: 'successModal',
        message: 'Party Structure Created Successfully',
        redirect: 'You will be redirected in 1s',
        redirectTime: 1000,
      });
    },
  });
  const handleSave = (data) => {
    const formdata = new FormData();
    formdata.append('name', data.partyname);
    formdata.append('alias', data.partyalias);
    formdata.append('flag', data.flag[0][0]);
    formdata.append('my_party', true);
    mutate({ formdata });
  };
  return (
    <Box className={classes.bread}>
      <Grid container spacing={0} justifyContent="space-between">
        <Grid component="main" item md={7.3}>
          <Breadcrumbs sx={{ p: 0, mb: 0, mt: 0 }} style={{ color: '#6B6C7E' }}>
            <Link to="/admin/settings/party-management">
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
              Create
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Box className={classes.root}>
        <Typography variant="h3">Party Details</Typography>
        <form onSubmit={handleSubmit(handleSave)}>
          <TextField control={control} label="Party Name" name="partyname" />
          <TextField control={control} label="Party Alias" name="partyalias" />
          <Box style={{ width: '750px', height: '145px' }}>
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
                    flag={value}
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
                to="/admin/settings/party-management"
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
      <SuccessModal />
    </Box>
  );
}

export default CreateParty;
