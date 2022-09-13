/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { TextField, Button } from 'shared';

import { ELECTION_TYPE, CAMPAIGN_MANAGER } from 'constant/electionData';

import useStyles from 'modules/Admin/pages/Campaign/AddNew/FormSteps/CampaignDetails/styled.campaignDetails';
import {
  getAvailableManagers,
  getCampaignManagers,
  getCandidate,
  getHouseOfAssembly,
  getHouseOfRep,
  getLga,
  getSenatorialDistricts,
  getStates,
  getUsers,
  getWards,
} from 'modules/Admin/services/campaigns';

function ElectionDetails({
  control,
  handleView,
  handleSubmit,
  watch,
  setValue,
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [stateId, setStateId] = useState('');
  const [lgaId, setLgaId] = useState('');
  const { data: stateData } = useQuery(['get-states'], getStates);
  const { data: senatorialDistrictData, isLoading: senatorialDistrictLoading } =
    useQuery(
      ['get-senatorial-districts', { id: stateId }],
      getSenatorialDistricts
    );
  const { data: houseOfRepData, isLoading: houseOfRepLoading } = useQuery(
    ['get-house-of-rep', { id: stateId }],
    getHouseOfRep
  );

  const { data: houseOfAssemblyData, isLoading: houseOfAssemblyLoading } =
    useQuery(['get-house-of-assemblies', { id: stateId }], getHouseOfAssembly);

  const { data: lgaData, isLoading: lgaLoading } = useQuery(
    ['get-lga', { id: stateId }],
    getLga
  );

  const { data: wardData, isLoading: wardLoading } = useQuery(
    ['get-wards', { id: lgaId }],
    getWards
  );

  const handleChangeState = (e) => {
    setStateId(e.target.dataset.value);
  };

  const handleChangeLga = (e) => {
    setLgaId(e.target.dataset.value);
  };

  const { data: candidateData, isLoading: candidateDataLoading } = useQuery(
    ['get-candidates'],
    getCandidate
  );

  const { data: managersData, isLoading: managersDataLoading } = useQuery(
    ['get-managers'],
    getAvailableManagers
  );

  const handleCancel = () => {
    navigate('/admin/campaign');
  };
  console.log(watch('description').length);
  return (
    <Box className={classes.root}>
      <Typography variant="h3">Campaign Details</Typography>
      <form>
        <TextField
          control={control}
          label="Campaign Name"
          name="campaignName"
          inputProps={{
            maxLength: 144,
          }}
        />
        <TextField control={control} label="Year" name="year" />
        <TextField
          select
          control={control}
          name="campaignType"
          label="Campaign Type"
        >
          {ELECTION_TYPE.map((type) => (
            <MenuItem key={type.label} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </TextField>
        {watch('campaignType') !== '' &&
          watch('campaignType') !== 'PRESIDENTIAL' && (
            <TextField select control={control} label="State" name="state">
              {stateData &&
                stateData?.results?.map((state) => (
                  <MenuItem
                    key={state.id}
                    value={state.id}
                    onClick={handleChangeState}
                  >
                    {state.name}
                  </MenuItem>
                ))}
            </TextField>
          )}
        {watch('campaignType') !== '' &&
          watch('campaignType') !== 'PRESIDENTIAL' &&
          watch('campaignType') !== 'GUBERNATORIAL' &&
          watch('campaignType') === 'SENATORIAL' &&
          watch('campaignType') !== 'HOUSE_OF_REPRESENTATIVE' &&
          watch('campaignType') !== 'HOUSE_ASSEMBLY' && (
            <TextField
              select
              control={control}
              label="Senatorial District"
              name="senDistrict"
            >
              {senatorialDistrictLoading ? (
                <Typography>Please wait...</Typography>
              ) : senatorialDistrictData &&
                senatorialDistrictData?.data?.length == 0 ? (
                <Typography>No entry</Typography>
              ) : (
                senatorialDistrictData &&
                senatorialDistrictData?.data?.map((district) => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          )}
        {watch('campaignType') !== '' &&
          watch('campaignType') !== 'PRESIDENTIAL' &&
          watch('campaignType') !== 'GUBERNATORIAL' &&
          watch('campaignType') !== 'SENATORIAL' &&
          watch('campaignType') === 'HOUSE_OF_REPRESENTATIVE' &&
          watch('campaignType') !== 'HOUSE_ASSEMBLY' && (
            <TextField
              select
              control={control}
              label="House of Rep"
              name="houseOfRep"
            >
              {houseOfRepLoading ? (
                <Typography>Please wait...</Typography>
              ) : houseOfRepData && houseOfRepData?.data?.length == 0 ? (
                <Typography>No entry</Typography>
              ) : (
                houseOfRepData &&
                houseOfRepData?.data?.map((rep) => (
                  <MenuItem key={rep.id} value={rep.id}>
                    {rep.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          )}
        {watch('campaignType') !== '' &&
          watch('campaignType') !== 'PRESIDENTIAL' &&
          watch('campaignType') !== 'GUBERNATORIAL' &&
          watch('campaignType') !== 'SENATORIAL' &&
          watch('campaignType') !== 'HOUSE_OF_REPRESENTATIVE' &&
          watch('campaignType') === 'HOUSE_ASSEMBLY' && (
            <TextField
              select
              control={control}
              label="House of Assembly"
              name="houseOfAssembly"
            >
              {houseOfAssemblyLoading ? (
                <Typography>Please wait...</Typography>
              ) : houseOfAssemblyData &&
                houseOfAssemblyData?.data?.length == 0 ? (
                <Typography>No entry</Typography>
              ) : (
                houseOfAssemblyData &&
                houseOfAssemblyData?.data?.map((assembly) => (
                  <MenuItem key={assembly.id} value={assembly.id}>
                    {assembly.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          )}
        {watch('campaignType') !== '' &&
          watch('campaignType') !== 'PRESIDENTIAL' &&
          watch('campaignType') !== 'GUBERNATORIAL' &&
          watch('campaignType') !== 'SENATORIAL' &&
          watch('campaignType') !== 'HOUSE_OF_REPRESENTATIVE' &&
          watch('campaignType') !== 'HOUSE_ASSEMBLY' &&
          (watch('campaignType') === 'COUNCILLORSHIP' ||
            watch('campaignType') === 'CHAIRMANSHIP') && (
            <TextField select control={control} label="Lga" name="LGA">
              {lgaLoading ? (
                <Typography>Please wait...</Typography>
              ) : lgaData && lgaData?.data?.length == 0 ? (
                <Typography>No entry</Typography>
              ) : (
                lgaData &&
                lgaData?.data?.map((lga) => (
                  <MenuItem key={lga.id} value={lga.id}>
                    {lga.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          )}
        {watch('campaignType') !== '' &&
          watch('campaignType') !== 'PRESIDENTIAL' &&
          watch('campaignType') !== 'GUBERNATORIAL' &&
          watch('campaignType') !== 'SENATORIAL' &&
          watch('campaignType') !== 'HOUSE_OF_REPRESENTATIVE' &&
          watch('campaignType') !== 'HOUSE_ASSEMBLY' &&
          watch('campaignType') !== 'CHAIRMANSHIP' &&
          watch('campaignType') === 'COUNCILLORSHIP' && (
            <TextField select control={control} label="Ward" name="ward">
              {wardLoading ? (
                <Typography>Please wait...</Typography>
              ) : wardData && wardData?.data?.length == 0 ? (
                <Typography>No entry</Typography>
              ) : (
                wardData &&
                wardData?.data?.map((ward) => (
                  <MenuItem key={ward.id} value={ward.id}>
                    {ward.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          )}
        <TextField
          control={control}
          label="Campaign Description"
          name="description"
          multiline
          inputProps={{
            maxLength: 200,
          }}
          helperText={`Not more than 200 words: Count ${
            watch('description')?.length
          } / 200`}
        />
        <Typography variant="h5">Candidate</Typography>
        <TextField select control={control} label="Candidate" name="candidate">
          {candidateData &&
            candidateData?.results?.map((candidate) => (
              <MenuItem key={candidate.id} value={JSON.stringify(candidate)}>
                {`${candidate.firstname} ${candidate.lastname}`}
              </MenuItem>
            ))}
        </TextField>
        <Typography variant="h5">Campaign Manager</Typography>
        <TextField
          select
          control={control}
          label="Campaign manager"
          name="manager"
        >
          {managersData &&
            managersData?.data?.map((manager) => (
              <MenuItem key={manager.id} value={JSON.stringify(manager)}>
                {`${manager.firstname} ${manager.lastname}`}
              </MenuItem>
            ))}
        </TextField>
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Grid item>
            <Button className="btnCancel" onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleSubmit(handleView)}>Next</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default ElectionDetails;

ElectionDetails.propTypes = {
  control: PropTypes.shape({}),
  handleView: PropTypes.func,
  handleSubmit: PropTypes.func,
};

ElectionDetails.defaultProps = {
  control: {},
  handleView: () => {},
  handleSubmit: () => {},
};
