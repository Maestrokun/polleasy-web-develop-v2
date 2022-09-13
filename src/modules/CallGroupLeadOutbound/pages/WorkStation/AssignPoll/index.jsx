/* eslint-disable */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { MultiSelect } from 'react-multi-select-component';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { useMutation, useQuery } from 'react-query';
import infoVector from 'assets/svg/infoVector.svg';
import Group4 from 'assets/svg/Group4.svg';
import hoverAnimation from 'assets/svg/hoverAnimation.svg';
import arrowRight from 'assets/svg/arrowRight.svg';
import numbering1 from 'assets/svg/numbering1.svg';

import clsx from 'clsx';

import SaveModal from 'modules/CallGroupLeadOutbound/pages/WorkStation/AssignPoll/Modal/SaveModal';
import SuccessModal from 'modules/CallGroupLeadOutbound/pages/WorkStation/AssignPoll/Modal/SuccessModal';
import { LOCATIONS } from 'constant/CglAssignPoll';
import { Button, Spinner } from 'shared';

import AvatarChips from 'shared/chip';
// import { Controller, useFieldArray, useForm } from 'react-hook-form';
import nameInitial from 'utils/nameInitial';
import { convertFormData } from 'modules/Admin/pages/Party/utils';
import useAlert from 'hooks/useAlert';
import DeactivateModal from 'modules/CallGroupLeadOutbound/components/DeactivateModal';
import useStyles from './styled.assignPoll';
import services from '../../../services';

function AssignPoll() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [agents, setAgents] = useState({});
  const [isloading, setLOading] = useState(false);
  const { showNotification } = useAlert();

  const location = useLocation();

  const { data } = useQuery(
    ['Singleunassignedpoll'],
    services.getindividualAssignment(location.state.id)
  );

  const { data: allAgents, isLoading: isloadingAllAgents } = useQuery(
    ['allPollAgents'],
    services.getAllAgentsbyPollId()
  );

  const { mutate } = useMutation(services.assignBulkPost, {
    onSuccess: (res) => {
      if (res?.success === true) {
        navigate('/call-group-lead-outbound/workstation');
        showNotification('Sccesfuly created!', {
          type: 'success',
        });
        setLOading(true);
      }
    },
    onError: (errors) => {
      setLOading(true);
      showNotification(
        errors?.response?.data?.errors?.poll_assignments[0]?.error[0],
        {
          type: 'error',
        }
      );
    },
  });

  const handleBack = () => {
    navigate('/call-group-lead-outbound/workstation');
  };

  const options = allAgents?.map(
    ({ id, firstname, middle_name, lastname }) => ({
      value: id,
      label: `${firstname} ${middle_name} ${lastname}`,
    })
  );

  const onSubmit = () => {
    mutate(convertFormData(agents));
    setLOading(true);
  };

  return (
    <form>
      <DeactivateModal />
      <Box className={classes.root}>
        <Box className="topNav">
          <Box
            onClick={handleBack}
            className="back"
            display="flex"
            alignItems="center"
          >
            <img src={arrowRight} alt="" />
            <Typography>Back</Typography>
          </Box>
          <Button disable={isloading} onClick={onSubmit} className="btn">
            {isloading ? 'Please wait ...' : 'Done'}
          </Button>
        </Box>

        <Box className={classes.content}>
          <Box className="frame1">
            <Card elevation={0} className="infoCard">
              <Box display="flex" p="5px">
                <img src={infoVector} alt="vector" />
                <Typography sx={{ ml: 2, color: '#0050C8' }}>
                  Assignment should take into account the language spoken in
                  this region
                </Typography>
              </Box>
            </Card>
            <Box>
              <Box p="14px" position="absolute">
                <Typography
                  variant="body1"
                  color="#6B6C7E"
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '19px',
                  }}
                >
                  {location.state.name}{' '}
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    mt: 2,
                    fontSize: '24px',
                    fontWeight: 500,
                    lineHeight: '32px',
                  }}
                >
                  {location.state.poll_instruction}{' '}
                </Typography>
                <Box sx={{ mt: 3, width: '80%' }}>
                  <Typography
                    variant="body1"
                    color="#6B6C7E"
                    sx={{
                      fontSize: '14px',
                      fontWeight: 600,
                      lineHeight: '21px',
                    }}
                  >
                    Location:
                  </Typography>
                  <Grid container spacing={2} md={12} sx={{ mt: 1 }}>
                    {[].map((LOCATION) => (
                      <Grid item>
                        <Card className="titleCard">
                          <Typography variant="caption">
                            {LOCATION.name}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Card className="bottomCard">
                  <Stack
                    display="flex"
                    direction="row"
                    spacing={3}
                    sx={{ mt: 1, width: '100%' }}
                  >
                    <Typography color="#FFFFFF">
                      Campaign Type:{' '}
                      <Box component="span" ml={1}>
                        {location.state.type.split(_).join('')}
                      </Box>
                    </Typography>
                    <Typography color="#FFFFFF">
                      •
                      <Box component="span" ml={2}>
                        Poll Type:{' '}
                      </Box>
                      <Box component="span" ml={1}>
                        Candidate Popularity
                      </Box>
                    </Typography>
                    <Typography color="#FFFFFF">
                      •
                      <Box component="span" ml={2}>
                        Start Date:{' '}
                      </Box>
                      <Box component="span" ml={1}>
                        {location.state.start_date}
                      </Box>
                      <Box component="span" ml={2}>
                        -
                      </Box>
                      <Box component="span" ml={2}>
                        End Date:
                      </Box>
                      <Box component="span" ml={1}>
                        {location.state.end_date}
                      </Box>
                    </Typography>
                  </Stack>
                </Card>
              </Box>
              <img src={Group4} alt="group" style={{ width: '100%' }} />
            </Box>
          </Box>
          <Spinner loading={isloadingAllAgents && data === undefined}>
            <Box className="assignment">
              <Typography>Agent Assignment</Typography>
              <Card elevation={0} className="candidateCard">
                <Grid container spacing={6}>
                  {data?.map((CANDIDATE) => (
                    <Grid item display="flex">
                      <Avatar
                        sx={{
                          background: CANDIDATE.bg,
                          height: 40,
                          width: 40,
                        }}
                      >
                        <Typography variant="h5">
                          {nameInitial(CANDIDATE.candidate_name)}
                        </Typography>
                      </Avatar>
                      <Grid item sx={{ ml: 2 }}>
                        <Typography variant="body1">
                          {CANDIDATE.candidate_name}
                        </Typography>
                        <Typography variant="body1">
                          No of Agents:
                          <Box component="span" ml={2}>
                            {CANDIDATE.agents.length}
                          </Box>
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Card>
              {data?.map((item) => (
                <Box className="agentAssigned">
                  <Card elevation={0} className="headerCard">
                    <img src={numbering1} alt="number" />
                    <Typography variant="h5" sx={{ ml: 1 }}>
                      {item.candidate_name} {item.is_primary ? '(Primary)' : ''}
                    </Typography>
                  </Card>
                  <Box p="16px" sx={{ mt: 3 }}>
                    <MultiSelect
                      name={item.id}
                      onChange={(value) =>
                        setAgents({
                          ...agents,
                          [item.id]: {
                            value,
                          },
                        })
                      }
                      value={agents?.[item.id]?.value || []}
                      options={options || []}
                      labelledBy="Assign agents to this candidate"
                      isCreatable
                    />
                    <Card
                      className={clsx({
                        [classes.agentsCard]: true,
                        [classes.agentsCardColor]:
                          !agents?.[item.id]?.value?.length,
                      })}
                      sx={{ mt: 3 }}
                    >
                      {agents?.[item?.id]?.value?.length === undefined ? (
                        <Box
                          display="flex"
                          position="relative"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <img src={hoverAnimation} alt="animation" />
                          <Typography variant="h5" color="#9DA0A7">
                            See assigned agents here
                          </Typography>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns:
                              'repeat(auto-fit, minmax(120px,         max-content))',
                            gridGap: '16px',
                            justifyContent: 'center',
                            padding: 'initial',
                          }}
                        >
                          {agents?.[item.id]?.value?.map((agent) => (
                            <Box
                              sx={{
                                listStyleType: 'none',
                              }}
                            >
                              <AvatarChips
                                // handleDelete={handleDelete(id)}
                                bgColor="blue"
                                name={agent?.label}
                                label={nameInitial(agent?.label)}
                              />
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Card>
                  </Box>
                </Box>
              ))}
            </Box>
          </Spinner>
        </Box>
        <SaveModal />
        <SuccessModal />
      </Box>
    </form>
  );
}

export default AssignPoll;
