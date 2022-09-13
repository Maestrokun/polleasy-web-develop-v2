import React, { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from 'react-query';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';

import schema from 'modules/Admin/validation/CallGroup/callGroupFormValidation';

import { TextField, Drawer, Button } from 'shared';

import useModal from 'hooks/useModal';
import useAlert from 'hooks/useAlert';

import useStyles from 'modules/Admin/components/CallGroup/Drawer/AddCallCenter/styled.addCallCenter';
import {
  useCreateCallCenter,
  useFetchUserByRole,
} from 'hooks/queries/useCallGroup';
import useAuth from 'hooks/useAuth';
import useDrawer from 'hooks/useDrawer';

export const callGroupType = [
  {
    name: 'Inbound',
    value: 'INBOUND',
  },
  {
    name: 'Outbound',
    value: 'OUTBOUND',
  },
];

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

function AddCallCenter() {
  let userRole;
  const { auth } = useAuth();
  const classes = useStyles();
  const { showNotification } = useAlert();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      type: 'INBOUND',
      lead: '',
      agents: '',
      search: '',
      checkSearch: '',
    },
    resolver: yupResolver(schema),
  });
  const [state, setState] = useModal();
  const [ed, setEd] = useDrawer();
  const [partyAgents, setPartyAgents] = useState([]);
  const [checkPartyAgent, setCheckPartyAgent] = React.useState([]);
  const [callAgentLead, setCallAgentLead] = React.useState([]);
  const [callAgent, setCallAgent] = React.useState([]);
  const [openSelect, setOpenSelect] = React.useState(false);
  const [openNo, setOpenNo] = React.useState(1);
  const { type } = watch();
  const { createCallCenter, creatingCenter, isSuccess } = useCreateCallCenter({
    showNotification,
    queryClient,
    setModal: setState,
    state,
    setEd,
  });
  const { checkSearch = '', search = '' } = watch();

  React.useEffect(() => {
    if (isSuccess) {
      setPartyAgents([]);
      setCheckPartyAgent([]);
      // setValue('checkSearch', '');
      reset({
        type: '',
        name: '',
        lead: '',
        agents: null,
      });
      setEd({
        drawerName: '',
        data: null,
      });
    }
  }, [isSuccess]);

  switch (type) {
    case 'INBOUND':
      userRole = 'INBOUND_AGENT';
      break;
    case 'OUTBOUND':
      userRole = 'OUTBOUND_AGENT';
      break;
    default:
      userRole = 'INBOUND_AGENT';
      break;
  }

  React.useEffect(() => {
    if (!ed.drawerName) {
      reset({
        name: '',
        type: 'INBOUND',
        lead: '',
        agents: [],
      });
    }
  }, [state.drawerName]);

  const {
    filteredUserByRole,
    isSuccess: leadSuccess,
    fetchingUserByRole: loadingLead,
  } = useFetchUserByRole({
    role: 'CALL_GROUP_LEAD',
    search,
  });

  const {
    filteredUserByRole: agentUser,
    isSuccess: agentSuccess,
    fetchingUserByRole: loadingAgent,
  } = useFetchUserByRole({
    role: userRole,
    search: checkSearch,
  });
  React.useEffect(() => {
    if (agentSuccess && agentUser) setCallAgent(agentUser);
  });

  React.useEffect(() => {
    if (leadSuccess && filteredUserByRole) setCallAgentLead(filteredUserByRole);
  }, [leadSuccess, filteredUserByRole]);

  const handleSelectMenu = () => {
    setOpenSelect(true);
    setOpenNo(0);
  };

  const handleSelectClose = () => {
    setOpenSelect(false);
    setOpenNo(1);
  };
  const handleCheckSearchClick = () => {
    const ids = partyAgents.map(({ id }) => id) || [];
    setCheckPartyAgent(partyAgents);
    setValue('agents', ids);
    handleSelectClose();
    return ids;
  };

  const handleRemoveAgent = (agentId) => {
    const partyAgent = partyAgents.filter(({ id }) => id !== agentId);
    const ids = partyAgent.map(({ id }) => id) || [];
    setPartyAgents(partyAgent);
    setCheckPartyAgent(partyAgent);
    // const name = partyAgent
    //   .map((agent) => {
    //     return `${agent?.firstname} ${agent?.lastname}`;
    //   })
    //   .join(', ')
    //   .trim();
    // setValue('checkSearchf', name);
    setValue('agents', ids);
    return ids;
  };

  useMemo(() => {
    // eslint-disable-next-line no-unused-vars
    const name = partyAgents
      .map((agent) => {
        return `${agent?.firstname} ${agent?.lastname}`;
      })
      .join(', ')
      .trim();
    // setValue('checkSearchf', name);
  }, [partyAgents]);

  const onSubmit = (data) => {
    const payload = {};
    payload.name = data?.name;
    payload.type = data?.type;
    payload.tenant = auth.userObj?.tenant;
    payload.lead = data?.lead;
    payload.agents = data?.agents;

    createCallCenter({ payload });
  };

  const handleOutboundAgent = (e) => {
    const {
      target: { value },
    } = e;

    if (!partyAgents.map(({ id }) => id).includes(value[0]?.id)) {
      setPartyAgents((prev) => [...prev, ...value]);
    } else {
      const filterValue =
        partyAgents?.filter(({ id }) => id !== value[0]?.id) || [];
      setPartyAgents(filterValue);
    }
  };

  return (
    <Drawer
      drawerName="createCallCenter"
      handleSubmit={handleSubmit(onSubmit)}
      titleText="Add Call Center"
      primaryButton="Create Center"
      secondaryButton="Cancel"
      isSubmitting={creatingCenter}
    >
      <Box
        className={classes.root}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField control={control} name="name" label="Name" />
        <TextField control={control} name="type" label="Call Group Type" select>
          {callGroupType.map((callType) => (
            <MenuItem
              key={callType.name}
              value={callType.value}
              sx={{ m: 'auto', width: '90%', px: 0 }}
            >
              {callType.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField select label="Call Group Lead" name="lead" control={control}>
          {!loadingLead && callAgentLead && (
            // && callAgentLead.length > 0
            <Box className={classes.searchBox}>
              <TextField
                control={control}
                name="search"
                placeholder="Search"
                type="search"
                // onChange={() => {}}
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
          {loadingLead && callAgentLead && (
            <Typography>Fetching user</Typography>
          )}
          {!loadingLead && callAgentLead.length === 0 && (
            <Typography sx={{ textAlign: 'center' }}>No user found</Typography>
          )}
          {!loadingLead &&
            callAgentLead &&
            callAgentLead?.map((lead) => (
              <MenuItem
                value={lead?.id}
                sx={{
                  textTransform: 'capitalize',
                  m: 'auto',
                  width: '90%',
                  px: 0,
                }}
                key={lead?.id}
              >
                {`${lead?.firstname} ${lead?.middle_name ?? ''} ${
                  lead?.lastname
                }`}
              </MenuItem>
            ))}
        </TextField>

        <Controller
          name="agents"
          control={control}
          render={({ field: { ref, onBlur } }) => (
            <FormControl sx={{ width: '100%' }} error={!!errors?.agents}>
              <InputLabel>Agents</InputLabel>
              <Select
                multiple
                value={checkPartyAgent}
                onChange={(e) => {
                  handleOutboundAgent(e);
                }}
                label="Outbound Agent"
                input={<OutlinedInput label="Agents" />}
                renderValue={(selected) =>
                  selected
                    .map((agent) => {
                      return `${agent?.firstname} ${agent?.lastname}`;
                    })
                    .join(', ')
                }
                MenuProps={{
                  ...MenuProps,
                  open: openSelect,
                  // ...(openSelect && {
                  // }),
                  onClose: () => handleSelectClose(),
                }}
                onClick={openNo === 1 ? handleSelectMenu : () => {}}
                onBlur={onBlur}
                inputRef={ref}
                fullWidth
                // onKeyDown={() => {}}
              >
                {!loadingAgent && callAgent && (
                  // && callAgent.length > 0
                  <Box className={classes.searchBox2}>
                    <TextField
                      control={control}
                      name="checkSearch"
                      placeholder="Search"
                      type="search"
                      // onChange={() => {}}
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
                {loadingAgent && loadingAgent && (
                  <Typography>Fetching user ...</Typography>
                )}
                {!loadingAgent && callAgent && callAgent.length === 0 && (
                  <Typography sx={{ textAlign: 'center' }}>
                    No user found
                  </Typography>
                )}
                {!loadingAgent &&
                  callAgent &&
                  callAgent.map((agent) => (
                    <MenuItem
                      key={agent.id}
                      value={agent}
                      // onClick={() => setOpenSelect(true)}
                    >
                      <Checkbox
                        size="small"
                        checked={partyAgents
                          .map(({ id }) => id)
                          .includes(agent?.id)}
                      />
                      <ListItemText
                        primary={`${agent.firstname} ${agent.lastname}`}
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </MenuItem>
                  ))}
                {!loadingAgent && callAgent && callAgent.length > 0 && (
                  <Box className={classes.actionWrapper}>
                    <Grid container spacing={2} className={classes.actions}>
                      <Grid item>
                        <Button onClick={handleCheckSearchClick}>Select</Button>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={handleSelectClose}
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
                {checkPartyAgent.map(({ id, firstname, lastname }) => (
                  <Box className={classes.selectedAgents} key={id}>
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
                        {`${firstname} ${lastname}`}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveAgent(id)}
                      >
                        <CloseIcon fontSize="small" sx={{ fontSize: '14px' }} />
                      </IconButton>
                    </Stack>
                  </Box>
                ))}
              </Box>
              <FormHelperText>{errors.agents?.message || ''}</FormHelperText>
            </FormControl>
          )}
        />
      </Box>
    </Drawer>
  );
}

export default AddCallCenter;
