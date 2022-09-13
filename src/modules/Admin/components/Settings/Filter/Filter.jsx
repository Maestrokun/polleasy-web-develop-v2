import React from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from 'modules/Admin/components/Settings/Form/CustomTexInput';
import { ReactComponent as LocationIcon } from 'assets/location_on.svg';
import { ReactComponent as FilterIcon } from 'assets/filter_list.svg';
import { makeStyles } from '@mui/styles';
import {
  getPartyStates,
  getPartyZones,
  getPartyDistricts,
  getPartyLocalGovernments,
  getPartyLocalGovernmentWards,
} from 'modules/Admin/pages/Settings/services';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  filterContainer: {
    height: '60vh',
    border: '1px solid #EDEBE9',
    borderRadius: '4px',
    overflowY: 'scroll',
    '& .fixedLabel': {
      position: 'sticky',
      top: 0,
      background: 'white',
      zIndex: 2,
      padding: '1em 0px',
      borderBottom: '1px solid #EDEBE9',
    },
  },
  filterWrapper: {
    background: '#FBFAF9',
    padding: '1em .8em',
    margin: '1em .8em',
    borderRadius: '4px',
    zIndex: -1,
    '& .MuiOutlinedInput-root': {
      background: 'white',
    },
    '& .MuiTypography-subtitle2': {
      textTransform: 'capitalize',
      color: '#393A4A',
      display: 'flex',
      textAlign: 'center',
      marginBottom: '.7em',
    },
  },
  searchBox: {
    width: '90%',
    margin: 'auto',
    '& .MuiTextField-root': {
      margin: '.7em 0px 1em',
    },
  },
  filterApplyBtn: {
    float: 'left',
    width: 'auto',
    height: 'auto',
    display: 'block',
    border: '1px solid #0047BD',
    background: '#0047BD',
    color: '#fff !important',
    lineHeight: '30px',
    textAlign: 'center',
    padding: '3px 10px 5px',
    borderRadius: '3px',
    marginLeft: '10px',
    cursor: 'pointer',
    '&.reset': {
      background: '#fff',
      border: '1px solid #fff',
      color: '#0047BD !important',
    },
  },
});

function Filter({
  stateId,
  lgaId,
  zoneId,
  resetSideFilter,
  applySideFilter,
  setZoneId,
  setWardId,
  setDistrictId,
  setLgaId,
  setStateId,
  districtId,
  wardId,
}) {
  const classes = useStyles();
  const { control } = useForm({});

  const { data: zones, isSuccess: zoneStatus } = useQuery(
    ['fetchPartyZones', { search: '', pageNumber: 1, pageSize: 10 }],
    getPartyZones
  );

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

  const {
    data: LocalGovernmentWards,
    isSuccess: LocalGovernmentWardStatus,
    refetch: lgaWardRefetch,
  } = useQuery(['fetchPartyLga', { lgaId }], getPartyLocalGovernmentWards);

  const handleZoneInput = (e) => {
    if (e.target.value) {
      setZoneId(e.target.value);
      stateRefetch();
    }
  };

  const handleStateInput = (e) => {
    if (e.target.value) {
      setStateId(e.target.value);
      districtRefetch();
      lgaRefetch();
    }
  };
  const handleLocalGovermentInput = (e) => {
    setLgaId(e.target.value);
    lgaWardRefetch();
  };

  const getStateLga = () => {
    lgaWardRefetch();
  };

  return (
    <Box className={classes.filterContainer}>
      <Box className="fixedLabel">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            padding: '0px 10px',
            display: 'flex',
          }}
        >
          <Grid item>
            <Typography
              variant="body2"
              sx={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              Filter <FilterIcon style={{ paddingLeft: '.4em' }} />
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              color="primary"
              className={classes.filterApplyBtn}
              onClick={applySideFilter}
            >
              Apply
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              className={`${classes.filterApplyBtn} reset`}
              onClick={resetSideFilter}
            >
              Reset
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.filterWrapper}>
        <Typography variant="subtitle2">
          Location <LocationIcon />
        </Typography>
        <Grid container spacing={4}>
          <Grid item sm={12}>
            <TextField
              select
              name="select"
              control={control}
              label="Click to select a zone"
              onChange={(e) => {
                setZoneId(e.target.value);
                handleZoneInput(e);
              }}
              value={zoneId}
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
          </Grid>
          <Grid item sm={12}>
            <TextField
              select
              name="select"
              control={control}
              label="Click to select a state"
              onChange={(e) => {
                setStateId(e.target.value);
                handleStateInput(e);
              }}
              value={stateId}
            >
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
              {stateStatus &&
                states?.data?.map((state) => (
                  <MenuItem Key={state.id} value={state.id}>
                    {state.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item sm={12}>
            <TextField
              select
              name="select"
              control={control}
              label="Click to select a senatorial district"
              onChange={(e) => {
                setDistrictId(e.target.value);
                getStateLga();
              }}
              value={districtId}
            >
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
              {districtsStatus &&
                districts?.data?.map((item) => (
                  <MenuItem Key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item sm={12}>
            <TextField
              select
              name="select"
              control={control}
              label="Click to select a Local Government"
              onChange={(e) => {
                setLgaId(e.target.value);
                handleLocalGovermentInput(e);
              }}
              value={lgaId}
            >
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
              <MenuItem>Select</MenuItem>
              {LocalGovernmentStatus &&
                LocalGovernments?.data?.map((lga) => (
                  <MenuItem Key={lga.id} value={lga.id}>
                    {lga.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item sm={12}>
            <TextField
              select
              name="select"
              control={control}
              label="Click to select a Ward"
              onChange={(e) => {
                setWardId(e.target.value);
              }}
              value={wardId}
            >
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
              {LocalGovernmentWardStatus &&
                LocalGovernmentWards?.data?.map((ward) => (
                  <MenuItem Key={ward.id} value={ward.id}>
                    {ward.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

Filter.propTypes = {
  zoneId: PropTypes.string,
  stateId: PropTypes.string,
  lgaId: PropTypes.string,
  applySideFilter: PropTypes.func,
  resetSideFilter: PropTypes.func,
  setZoneId: PropTypes.func,
  setWardId: PropTypes.func,
  setDistrictId: PropTypes.func,
  setLgaId: PropTypes.func,
  setStateId: PropTypes.func,
  wardId: PropTypes.string,
  districtId: PropTypes.string,
};

Filter.defaultProps = {
  zoneId: '',
  stateId: '',
  lgaId: '',
  applySideFilter: {},
  resetSideFilter: {},
  setZoneId: {},
  setWardId: {},
  setDistrictId: {},
  setLgaId: {},
  setStateId: {},
  wardId: '',
  districtId: '',
};

export default Filter;
