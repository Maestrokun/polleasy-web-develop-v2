import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import React, { useCallback, useState } from 'react';

import { Drawer } from 'shared';
import AutoComplete from 'shared/Autocomplete';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import useDrawer from 'hooks/useDrawer';

const defaultParams = {
  zone: '',
  state: '',
  senatorial_district: '',
  local_government: '',
  ward: '',
  polling_unit: '',
  max: '',
  min: '',
};
function AdvanceFilterDrawer({ setQueryParams }) {
  const [tempQueryParams, setTempQueryParams] = useState(defaultParams);
  const [state, setState] = useDrawer();

  const handleCloseDrawer = useCallback(() => {
    setState({ ...state, drawerName: '' });
  }, [state]);

  return (
    <Drawer
      drawerName="Voters360"
      titleText="Advanced Filter"
      primaryButton="Apply"
      secondaryButton="Reset"
      isSubmitting={false}
      handleSubmit={() => {
        setQueryParams(tempQueryParams);
        handleCloseDrawer();
      }}
      onClose={() => setQueryParams(defaultParams)}
    >
      <Box p={4}>
        <Box
          bgcolor="#F9F9F9"
          p={4}
          sx={{
            '& > *': {
              mb: '1rem',
            },
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pb: 4 }}>
            Location
          </Typography>
          <AutoComplete
            options={[{ id: 'test', title: 'test' }]}
            placeholder="Zone"
            value={tempQueryParams?.zone}
            onChange={(event, value) => {
              setTempQueryParams({ ...tempQueryParams, zone: value?.id });
            }}
          />
          <AutoComplete
            options={[{ id: 'test', title: 'test' }]}
            placeholder="State"
            value={tempQueryParams?.state}
            onChange={(event, value) => {
              setTempQueryParams({ ...tempQueryParams, state: value?.id });
            }}
          />

          <AutoComplete
            options={[{ id: 'test', title: 'test' }]}
            placeholder="Senatorial district"
            value={tempQueryParams?.senatorial_district}
            onChange={(event, value) => {
              setTempQueryParams({
                ...tempQueryParams,
                senatorial_district: value?.id,
              });
            }}
          />
          <AutoComplete
            options={[{ id: 'test', title: 'test' }]}
            placeholder="Local government"
            value={tempQueryParams?.local_government}
            onChange={(event, value) => {
              setTempQueryParams({
                ...tempQueryParams,
                local_government: value?.id,
              });
            }}
          />
          <AutoComplete
            options={[{ id: 'test', title: 'test' }]}
            placeholder="Ward"
            value={tempQueryParams?.ward}
            onChange={(event, value) => {
              setTempQueryParams({ ...tempQueryParams, ward: value?.id });
            }}
          />
          <AutoComplete
            options={[{ id: 'test', title: 'test' }]}
            placeholder="Polling unit"
            value={tempQueryParams?.polling_unit}
            onChange={(event, value) => {
              setTempQueryParams({
                ...tempQueryParams,
                polling_unit: value?.id,
              });
            }}
          />
        </Box>
        <Box
          bgcolor="#F9F9F9"
          p={4}
          mt={4}
          sx={{
            '& > *': {
              mb: '1rem',
            },
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Age
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <AutoComplete
                options={[{ id: 'test', title: 'test' }]}
                placeholder="Min"
                value={tempQueryParams?.min}
                onChange={(event, value) => {
                  setTempQueryParams({ ...tempQueryParams, min: value?.id });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <AutoComplete
                options={[{ id: 'test', title: 'test' }]}
                placeholder="Max"
                value={tempQueryParams?.max}
                onChange={(event, value) => {
                  setTempQueryParams({ ...tempQueryParams, max: value?.id });
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Drawer>
  );
}

export default AdvanceFilterDrawer;

AdvanceFilterDrawer.propTypes = {
  queryParams: PropTypes.shape({
    zone: PropTypes.string,
    state: PropTypes.string,
    senatorial_district: PropTypes.string,
    local_government: PropTypes.string,
    ward: PropTypes.string,
    polling_unit: PropTypes.string,
    max: PropTypes.string,
    min: PropTypes.string,
  }).isRequired,
  setQueryParams: PropTypes.func.isRequired,
  //   refetch: PropTypes.func.isRequired,
};
