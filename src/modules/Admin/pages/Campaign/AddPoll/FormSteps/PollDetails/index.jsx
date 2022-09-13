/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useQuery, useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns/esm';
import { useNavigate, useParams } from 'react-router';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { TextField, Button, ControlledDatePicker, Loader } from 'shared';

import { POLL_TYPE } from 'constant/electionData';

import useElectionStepper from 'hooks/useCampaignStepper';

import useStyles from 'modules/Admin/pages/Campaign/AddPoll/FormSteps/PollDetails/styled.pollsDetails';
import { Alert } from '@mui/material';
import { getCallGroups } from 'modules/Admin/services/callGroup';
import { useRegionalSplit } from 'hooks/queries/useRegionalSplit';
import schema from './pollDetailsFormValidation';
import {
  createPoll,
  getPollById,
  updatePoll,
} from 'modules/Admin/services/polls';
import useAlert from 'hooks/useAlert';
import handleApiError from 'utils/handleApiError';

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

function PollDetails() {
  const { showNotification } = useAlert();
  const classes = useStyles();
  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { handleNext } = useElectionStepper();
  const [editRegionalSplit, setEditRegionalSplit] = useState(false);
  const [inBoundCallGroups, setInboundCallGroups] = useState([]);
  const [inboundGroupStates, setInboundGroupStates] = useState([]);
  const [groupStatesForSelect, setGroupStatesForSelect] = useState({});
  console.log(groupStatesForSelect);
  const [currentCallGroup, setCurrentCallGroup] = useState({});
  const [openInboundDropdown, setOpenInboundDropdown] = useState(null);
  const { campaignId, pollId } = useParams();

  const locations = useRegionalSplit(campaignId);

  const { data: callGroups } = useQuery(['getCallGroup'], getCallGroups);

  const { isLoading: loadingPoll } = useQuery(
    ['get-single-poll'],
    () => getPollById(pollId),
    {
      enabled: !!pollId,
      onError: (e) => {
        showNotification(handleApiError(e), { type: 'error' });
      },
      onSuccess: ({ data }) => {
        reset(data);
      },
    }
  );

  useEffect(() => {
    const callGroup = currentCallGroup.value;

    if (currentCallGroup.type === 'add') {
      const newGroupAndState = {
        callGroupId: currentCallGroup.id,
        name: callGroup,
        states: [],
        stateIds: [],
      };
      setInboundGroupStates([...inboundGroupStates, newGroupAndState]);

      setGroupStatesForSelect({
        ...groupStatesForSelect,
        [callGroup]: [],
      });
    } else {
      const newGroupsAndStates = inboundGroupStates.filter(
        (x) => x.name !== currentCallGroup.value
      );
      setInboundGroupStates(newGroupsAndStates);
      const newGroupStatesForSelect = inboundGroupStates.filter(
        (x) => x.name !== currentCallGroup.value
      );
      newGroupStatesForSelect.forEach(({ name, states }) =>
        setGroupStatesForSelect({ ...groupStatesForSelect, [name]: states })
      );
    }
  }, [currentCallGroup]);

  const handleAddCallGroups = (e) => {
    const {
      target: { value },
    } = e;

    const currCallGroup = callGroups?.results?.find(
      (item) => item.name === value[value.length - 1]
    );

    setCurrentCallGroup({
      value: value[value.length - 1],
      id: currCallGroup?.id,
      type: 'add',
    });
    setInboundCallGroups(typeof value === 'string' ? value.split(',') : value);
  };

  const handleRemoveCallGroup = (value) => {
    setCurrentCallGroup({ value, type: 'remove' });
    const newCopy = inBoundCallGroups.filter((x) => x !== value);
    setInboundCallGroups(newCopy);
  };

  const handleAddCallGroupStates = (e, group) => {
    const {
      target: { value },
    } = e;
    const currentValue = value[value.length - 1];
    const currObj = inboundGroupStates.find((item) => item.name === group);
    const currApiObj = locations?.find((item) => item.name === currentValue);

    setGroupStatesForSelect({
      ...groupStatesForSelect,
      [group]: [...currObj.states, currentValue],
    });

    setInboundGroupStates((current) =>
      current.map((item) => {
        if (item.name === group) {
          return {
            ...item,
            states: [...item.states, currentValue],
            stateIds: [...item.stateIds, currApiObj.id],
          };
        }
        return item;
      })
    );
  };

  const { mutate, isLoading } = useMutation(pollId ? updatePoll : createPoll, {
    onSuccess: ({ data }) => {
      showNotification(`${pollId ? `Poll updated` : `Poll Created`}`, {
        type: 'success',
      });
      if (!!!pollId) {
        navigate(`../${data?.id}`, { replace: true });
      }
      handleNext();
    },
    onError: (e) => {
      showNotification(handleApiError(e), { type: 'error' });
    },
  });

  const onSubmit = (values) => {
    const targetsAndIds = inboundGroupStates.map(
      ({ callGroupId, stateIds }) => ({
        call_group: callGroupId,
        targets: stateIds,
      })
    );
    const data = {
      ...values,
      regional_splits: targetsAndIds,
      call_groups: targetsAndIds?.map(({ call_group }) => call_group),
      campaign: campaignId,
      start_date: format(new Date(values.start_date), 'yyyy-MM-dd'),
      end_date: format(new Date(values.end_date), 'yyyy-MM-dd'),
      pollId,
    };

    targetsAndIds.length < 2 && delete data.regional_splits;

    mutate(data);
  };

  if (loadingPoll) {
    return <Loader />;
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h3">Details</Typography>
      <form>
        <TextField
          control={control}
          label="Poll Name"
          placeholder="Segun Oroyo Presidential Poll"
          name="name"
        />
        <TextField select control={control} name="type" label="Poll Type">
          {POLL_TYPE.map(({ name, value }) => (
            <MenuItem key={name} value={value}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        <Grid container sx={{ justifyContent: 'space-between' }} spacing={2}>
          <Grid item xs={6}>
            <ControlledDatePicker
              control={control}
              rules={{ required: true }}
              name="start_date"
              label="Start Date"
              minDate={new Date()}
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledDatePicker
              control={control}
              rules={{ required: true }}
              name="end_date"
              label="End Date"
              minDate={watch('start_date') ?? new Date()}
            />
          </Grid>
        </Grid>
        <Box my={3}>
          <p className={classes.formSectionTitle}>CALL GROUP</p>
        </Box>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel>Call Groups</InputLabel>
          <Select
            fullWidth
            select
            multiple
            value={inBoundCallGroups}
            input={<OutlinedInput label="Call Groups" name="callGroups" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            name="callgroups"
            onChange={handleAddCallGroups}
          >
            {callGroups?.results?.map(({ name, id }) => (
              <MenuItem key={id} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ display: 'block' }}>
            {inBoundCallGroups.map((group) => (
              <Box className={classes.selectedAgents}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ height: '26px' }}
                >
                  <Typography variant="subtitle1" sx={{ paddingRight: '1em' }}>
                    {group}
                  </Typography>
                  <IconButton onClick={() => handleRemoveCallGroup(group)}>
                    <CloseIcon fontSize="small" sx={{ fontSize: '14px' }} />
                  </IconButton>
                </Stack>
              </Box>
            ))}
          </Box>
        </FormControl>
        <Box p={3} className={classes.regionalSplitBox}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <p className="title">Call Group Regional Split</p>
            {!editRegionalSplit && (
              <IconButton
                className="editButton"
                size="small"
                disabled={inBoundCallGroups.length < 1}
                onClick={() => setEditRegionalSplit(true)}
              >
                Edit{' '}
                <EditOutlinedIcon
                  sx={{ marginLeft: 1.5 }}
                  fontSize="12px"
                  color={inBoundCallGroups.length < 1 ? 'disabled' : 'primary'}
                />
              </IconButton>
            )}
          </Stack>
          {editRegionalSplit ? (
            <>
              <Alert sx={{ marginBottom: 8 }} severity="info">
                Splitting should take into account the languages spoken in each
                region
              </Alert>
              <Box my={2}>
                {inBoundCallGroups.map((group, index) => (
                  <Grid container>
                    <Grid item md={12}>
                      <FormControl sx={{ width: '100%' }}>
                        <InputLabel>{group}</InputLabel>
                        <Select
                          multiple
                          open={openInboundDropdown === index}
                          onOpen={() => setOpenInboundDropdown(index)}
                          value={groupStatesForSelect[group] ?? []}
                          onChange={(e) => handleAddCallGroupStates(e, group)}
                          label={group}
                          input={<OutlinedInput label="Agents" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                          fullWidth
                        >
                          <Box className={classes.searchBox2}>
                            <TextField
                              name="search"
                              control={control}
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
                          {locations?.map(({ id, name }) => (
                            <MenuItem key={id} value={name}>
                              <Checkbox
                                size="small"
                                checked={
                                  groupStatesForSelect[group]?.indexOf(name) >
                                  -1
                                }
                              />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                          <Box className={classes.actionWrapper}>
                            <Grid
                              container
                              spacing={2}
                              className={classes.actions}
                            >
                              <Grid item>
                                <Button
                                  onClick={() => setOpenInboundDropdown(null)}
                                >
                                  Select
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  onClick={() => setOpenInboundDropdown(null)}
                                  className="btnCancel"
                                >
                                  Cancel
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                ))}
              </Box>
              <Button
                sx={{ width: '67px' }}
                onClick={() => setEditRegionalSplit(false)}
              >
                Done
              </Button>
            </>
          ) : (
            <Box className={classes.counterChips}>
              {inboundGroupStates.map(({ name, states }) => (
                <Stack
                  justifyContent="space-between"
                  alignItems="center"
                  direction="row"
                  className="chipItem"
                >
                  <p>
                    {name} {states.length > 0 && `:`}{' '}
                    <b>{states.length > 0 && states[0]}</b>
                  </p>

                  {states.length > 1 && (
                    <div className="count">+{states.length - 1}</div>
                  )}
                </Stack>
              ))}
            </Box>
          )}
        </Box>
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Grid item>
            <Button className="btnCancel">Cancel</Button>
          </Grid>
          <Grid item>
            <Button loading={isLoading} onClick={handleSubmit(onSubmit)}>
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default PollDetails;
