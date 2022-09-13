import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from 'modules/Admin/components/Settings/Form/CustomTexInput';
import { Jurisdictions, Positions, Levels } from 'constant/ExecutiveId';
import useStyles from 'modules/Admin/components/Settings/Form/SingleUserForm/styled.singleUserForm';
import { useQuery } from 'react-query';
import {
  getPartyStates,
  getPartyZones,
  getPartyDistricts,
  getPartyLocalGovernments,
  getPartyLocalGovernmentWards,
} from 'modules/Admin/pages/Settings/services';
import useDebounce from 'hooks/useDebouncee';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function SingleUserForm({ control, setValue }) {
  const classes = useStyles();
  const [text, setText] = React.useState('');
  const [zoneId, setZoneId] = React.useState('');
  const [stateId, setStateId] = React.useState('');
  const [lgaId, setLgaId] = React.useState('');
  const debouceValue = useDebounce(text, 600);

  const {
    data: states,
    isSuccess: stateStatus,
    refetch: stateRefetch,
  } = useQuery(['fetchPartyStates', { zoneId }], getPartyStates);

  const {
    data: districts,
    isSuccess: districtsStatus,
    refetch: districtRefetch,
  } = useQuery(['fetchPartyDistricts', { stateId }], getPartyDistricts);

  const {
    data: LocalGovernments,
    isSuccess: LocalGovernmentStatus,
    refetch: lgaRefetch,
  } = useQuery(['fetchPartyLga', { stateId }], getPartyLocalGovernments);

  const { data: zones, isSuccess: zoneStatus } = useQuery(
    ['fetchPartyZones', { search: text, pageNumber: 1, pageSize: 10 }],
    getPartyZones
  );

  const {
    data: LocalGovernmentWards,
    isSuccess: LocalGovernmentWardStatus,
    refetch: lgaWardRefetch,
  } = useQuery(['fetchPartyLga', { lgaId }], getPartyLocalGovernmentWards);

  const handleStateSearchInput = (event) => {
    setText(event.target.value);
    if (debouceValue) {
      stateRefetch();
    }
  };
  const handleZoneInput = (e) => {
    if (e.target.value) {
      setZoneId(e.target.value);
      stateRefetch();
    }
  };
  const handleStateInput = (e) => {
    setStateId(e.target.value);
    districtRefetch();
    lgaRefetch();
  };
  const handleLocalGovermentInput = (e) => {
    setLgaId(e.target.value);
    lgaWardRefetch();
  };
  const getStateLga = () => {
    lgaWardRefetch();
  };

  return (
    <Box
      className={classes.root}
      sx={{ display: 'flex', flexDirection: 'column', height: '88vh' }}
    >
      <Box className={classes.form} component="form">
        <TextField
          variant="outlined"
          label="First Name"
          name="firstname"
          control={control}
          onChange={(e) => setValue('firstname', e.target.value)}
        />

        <TextField
          variant="outlined"
          label="Last Name"
          name="lastname"
          control={control}
          onChange={(e) => setValue('lastname', e.target.value)}
        />

        <TextField
          variant="outlined"
          label="Middle Name(optional)"
          name="middle_name"
          control={control}
          onChange={(e) => setValue('middle_name', e.target.value)}
        />

        <TextField
          variant="outlined"
          label="Phone No"
          name="phone"
          control={control}
          onChange={(e) => setValue('phone', e.target.value)}
        />

        <TextField
          select
          variant="outlined"
          label="Position"
          name="position"
          control={control}
          onChange={(e) => setValue('position', e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          {Positions.map((Position) => (
            <MenuItem key={Position.key} value={Position.value}>
              {Position.title}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          variant="outlined"
          label="Levels"
          name="level"
          control={control}
          onChange={(e) => setValue('level', e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          {Levels.map((Level) => (
            <MenuItem key={Level.key} value={Level.value}>
              {Level.title}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          variant="outlined"
          label="Jurisdiction"
          name="jurisdiction"
          control={control}
          onChange={(e) => setValue('jurisdiction', e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          {Jurisdictions.map((Jurisdiction) => (
            <MenuItem key={Jurisdiction.key} value={Jurisdiction.value}>
              {Jurisdiction.title}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          variant="outlined"
          label="Zone"
          name="zone"
          control={control}
          onChange={(e) => {
            setValue('zone', e.target.value);
            handleZoneInput(e);
          }}
        >
          <Box className={classes.searchBox}>
            <TextField
              control={control}
              name="search"
              placeholder="Search"
              type="search"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {zoneStatus &&
            zones?.results?.map((zone) => (
              <MenuItem Key={zone.id} value={zone.id}>
                {zone.name}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          select
          variant="outlined"
          label="State"
          name="state"
          control={control}
          onChange={(e) => {
            setValue('state', e.target.value);
            handleStateInput(e);
          }}
        >
          <Box className={classes.searchBox}>
            <TextField
              control={control}
              name="search"
              placeholder="Search"
              type="search"
              onChange={(e) => {
                handleStateSearchInput(e);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {stateStatus &&
            states?.data?.map((state) => (
              <MenuItem Key={state.id} value={state.id}>
                {state.name}
              </MenuItem>
            ))}
        </TextField>
        <TextField
          select
          variant="outlined"
          label="Senatorial District"
          name="district"
          control={control}
          onChange={(e) => {
            setValue('district', e.target.value);
            getStateLga();
          }}
        >
          <Box className={classes.searchBox}>
            <TextField
              control={control}
              name="search"
              placeholder="Search"
              type="search"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {districtsStatus &&
            districts?.data?.map((item) => (
              <MenuItem Key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </TextField>
        <TextField
          select
          variant="outlined"
          label="LGA"
          name="lga"
          control={control}
          onChange={(e) => {
            setValue('lga', e.target.value);
            handleLocalGovermentInput(e);
          }}
        >
          <Box className={classes.searchBox}>
            <TextField
              control={control}
              name="search"
              placeholder="Search"
              type="search"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {LocalGovernmentStatus &&
            LocalGovernments?.data?.map((lga) => (
              <MenuItem Key={lga.id} value={lga.id}>
                {lga.name}
              </MenuItem>
            ))}
        </TextField>
        <TextField
          select
          variant="outlined"
          label="Ward"
          name="ward"
          control={control}
          onChange={(e) => {
            setValue('ward', e.target.value);
          }}
        >
          <Box className={classes.searchBox}>
            <TextField
              control={control}
              name="search"
              placeholder="Search"
              type="search"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {LocalGovernmentWardStatus &&
            LocalGovernmentWards?.data?.map((ward) => (
              <MenuItem Key={ward.id} value={ward.id}>
                {ward.name}
              </MenuItem>
            ))}
        </TextField>
      </Box>
    </Box>
  );
}

SingleUserForm.propTypes = {
  control: PropTypes.shape({}),
  setValue: PropTypes.func,
};

SingleUserForm.defaultProps = {
  control: {},
  setValue: {},
};

export default SingleUserForm;
