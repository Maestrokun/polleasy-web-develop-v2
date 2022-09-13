/* eslint-disable react/forbid-prop-types */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';

import { TextField, Button } from 'shared';

import useStyles from 'modules/Admin/components/CallGroup/Drawer/AddCallCenter/styled.addCallCenter';

const ITEM_HEIGHT = 80;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      overflowX: 'hidden',
      boxSizing: 'border-box',
    },
  },
};

function MultiSelect({
  control,
  setValue,
  errors,
  loading,
  options,
  formlabel,
  name,
  watch,
}) {
  const classes = useStyles();
  const [popUpOptions, setPopUpOptions] = React.useState([]);
  const [checkOptions, setCheckOptions] = React.useState([]);
  const [openMenu, setOpenMenu] = React.useState(false);
  const { name: nameValue } = watch();

  const handleCheckSearchClick = () => {
    const ids = popUpOptions.map(({ value }) => value) || [];
    setCheckOptions(popUpOptions);
    setValue(name, ids);
    setOpenMenu(false);
    return ids;
  };
  React.useEffect(() => {
    let arr = [];
    watch(name)?.forEach((v) => {
      const l = options?.find((x) => x?.value === v);
      arr = [...arr, l];
    });

    setPopUpOptions(arr);
    setCheckOptions(arr);
  }, [nameValue]);

  const handleRemoveAgent = (agentId) => {
    const partyAgent = popUpOptions.filter(({ value }) => value !== agentId);
    const ids = partyAgent.map(({ value }) => value) || [];
    setPopUpOptions(partyAgent);
    setCheckOptions(partyAgent);
    const search = partyAgent
      .map((agent) => {
        return `${agent?.label}`;
      })
      .join(', ')
      .trim();
    setValue('checkSearch', search);
    setValue(name, ids);
    return ids;
  };

  useMemo(() => {
    const seach = popUpOptions
      .map((agent) => {
        return `${agent?.label}`;
      })
      .join(', ')
      .trim();
    setValue('checkSearch', seach);
  }, [popUpOptions]);

  const handleOutboundAgent = (e) => {
    const {
      target: { value },
    } = e;

    if (!popUpOptions.map(({ value: bg }) => bg).includes(value[0]?.value)) {
      setPopUpOptions((prev) => [...prev, ...value]);
    } else {
      const filterValue =
        popUpOptions?.filter(({ value: bg }) => bg !== value[0]?.value) || [];
      setPopUpOptions(filterValue);
    }
  };

  return (
    <Controller
      name="agents"
      control={control}
      render={({ field: { ref, onBlur } }) => (
        <FormControl sx={{ width: '100%' }} error={!!errors?.agents}>
          <InputLabel>{formlabel}</InputLabel>
          <Select
            multiple
            value={checkOptions}
            onChange={(e) => {
              handleOutboundAgent(e);
            }}
            onOpen={() => setOpenMenu(true)}
            open={openMenu}
            label="Outbound Agent"
            input={<OutlinedInput label="Agents" />}
            renderValue={(selected) =>
              selected
                .map((agent) => {
                  return `${agent?.label}`;
                })
                .join(', ')
            }
            MenuProps={MenuProps}
            onBlur={onBlur}
            inputRef={ref}
            fullWidth
          >
            {!loading && options && options.length > 0 && (
              <Box className={classes.searchBox2}>
                <TextField
                  control={control}
                  name="input"
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
            {loading && loading && <Typography>Fetching data</Typography>}
            {!loading && options && options.length === 0 && (
              <Typography sx={{ textAlign: 'center' }}>
                No data found
              </Typography>
            )}
            {!loading &&
              options &&
              options?.map((agent) => (
                <MenuItem key={agent?.value} value={agent}>
                  <Checkbox
                    size="small"
                    // eslint-disable-next-line
                    checked={popUpOptions
                      ?.map((opt) => opt?.value)
                      ?.includes(agent?.value)}
                  />
                  <ListItemText
                    primary={`${agent.label}`}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </MenuItem>
              ))}
            {!loading && options && options.length > 0 && (
              <Box className={classes.actionWrapper}>
                <Grid container spacing={2} className={classes.actions}>
                  <Grid item>
                    <Button onClick={handleCheckSearchClick}>Select</Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() => setOpenMenu(false)}
                      className="btnCancel"
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Select>
          <Box sx={{ display: 'block' }}>
            {checkOptions.map(({ value, label }) => (
              <Box className={classes.selectedAgents}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      paddingRight: '1em',
                      textTransform: 'capitalize',
                    }}
                  >
                    {`${label}`}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveAgent(value)}
                  >
                    <CloseIcon fontSize="small" sx={{ fontSize: '14px' }} />
                  </IconButton>
                </Stack>
              </Box>
            ))}
          </Box>
          <FormHelperText sx={{ color: 'red' }}>
            {errors?.[name]?.message || ''}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}

MultiSelect.propTypes = {
  setValue: PropTypes.oneOfType([PropTypes.func, PropTypes.object, undefined]),
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  loading: PropTypes.bool,
  control: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  options: PropTypes.array,
  formlabel: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  watch: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

MultiSelect.defaultProps = {
  setValue: () => {},
  errors: () => {},
  loading: false,
  options: [],
  watch: () => {},
};

export default MultiSelect;
