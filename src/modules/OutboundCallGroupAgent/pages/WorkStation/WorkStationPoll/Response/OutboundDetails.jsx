/* eslint-disable import/order */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Menu from '@mui/material/Menu';
import { useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
// import useModal from 'hooks/useModal';
import Avatar from '@mui/material/Avatar';

import { ReactComponent as CallButtonLightIcon } from 'assets/callButtonLight.svg';
import { ReactComponent as Dropdown } from 'assets/Dropdown.svg';
import PhoneIcon from 'assets/PhoneIcon.svg';
import { Card } from 'shared';
import CallModal from 'modules/OutboundCallGroupAgent/CallModal/CallModal';
import useMenu from 'hooks/useMenu';
import VotersQuest from './VotersQuest';
import { QuestionContext } from 'context/questionContext';
import { savePollResponse } from 'services/workstation';
import useAlert from 'hooks/useAlert';
import { useMutation, useQueryClient } from 'react-query';
import handleApiError from 'utils/handleApiError';
import { useForm } from 'react-hook-form';
import { getAdditionalDefaultValue } from 'modules/OutboundCallGroupAgent/validator';
import useModal from 'hooks/useModal';

// eslint-disable-next-line no-unused-vars
function DetailsOutbound({ params, data = [], isLoading }) {
  const [state, setState] = useModal();
  const [open, setOpen] = useState(true);
  const { id } = useParams();
  const { showNotification } = useAlert();
  // const [start, setStartTime] = React.useState(null)
  // const [end, setEndTime] = React.useState(null)
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [openQuest, setOpenQuest] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const { openMenu, anchorEl, toggleMenu, handleClose } = useMenu();
  const { question, setQuestion } = React.useContext(QuestionContext);
  const defaultValues = getAdditionalDefaultValue(question?.map((v, i) => i));
  const {
    watch,
    control,
    formState: { errors },
    handleSubmit,
    reset: formReset,
  } = useForm({
    defaultValues,
  });
  const {
    mutate,
    isLoading: saving,
    reset,
  } = useMutation(({ payload }) => savePollResponse({ pollId: id, payload }), {
    onSuccess: () => {
      queryClient.refetchQueries([`useFetchPollQuestions-${id}`, id]);
      queryClient.refetchQueries([`getAgentCalls`]);
      showNotification('question response successfully saved', {
        type: 'success',
      });
      setIsContinue(false);
      setOpenModal(false);
      setOpenQuest(false);
      setState({
        ...state,
        modalName: 'successModal',
        message: 'Call Center Created Successfully',
        redirect: 'Redirecting in 0:6 seconds',
      });
      formReset({
        ...defaultValues,
      });
    },
    onError: (err) => {
      reset();
      showNotification(handleApiError(err), { type: 'error' });
    },
  });

  React.useEffect(() => {
    if (data) {
      setQuestion(data);
    }
  }, [isLoading]);

  // eslint-disable-next-line no-unused-vars
  const handleOpen = () => {
    setOpen(false);
    setOpenQuest(!openQuest);
  };

  const onSubmit = (values) => {
    const payload = {};
    let arr = [];
    const fields = Object.keys(defaultValues);
    fields.forEach((cal) => {
      if (values?.[cal] && Array.isArray(values[cal])) {
        arr = [...arr, ...values[cal]];
      }
      if (values?.[cal]) {
        arr = [...arr, values[cal]];
      }
    });
    payload.responses = arr;
    payload.voter = params?.voter?.id;

    mutate({ payload });
  };
  const handleEndCall = () => {
    setIsContinue(false);
    setOpenModal(false);
    setOpenQuest(false);
  };
  const handleCallContinue = () => {
    setIsContinue(true);
    setOpenQuest(true);
  };

  const handleStartCall = () => {
    setOpenModal(true);
  };
  const handleCallClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Card
        style={{
          height: '100%',
          border: '0',
          padding: '0px',
          borderRight: '1px solid #E5E5EA',
        }}
      >
        <Box sx={{ margin: '0' }}>
          <Box
            sx={{
              background: '#F0F5FF',
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Box display="flex" alignItems="center">
                <Avatar>
                  {params?.voter?.lastname?.slice(0, 1)}
                  {params?.voter?.firstname?.slice(0, 1)}
                </Avatar>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ml: 2,
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      fontSize: '14px',
                      cursor: 'pointer',
                      color: '#0050C8',
                    }}
                    onClick={() => {
                      // handleOpen();
                      setOpenQuest(true);
                      setIsContinue(true);
                    }}
                  >
                    {' '}
                    {params?.voter?.lastname} {params?.voter?.firstname}{' '}
                    {params?.voter?.middlename}{' '}
                  </Box>
                  <Box sx={{ color: '#6B6C7E' }}>00:00:00</Box>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                pading: '4px 8px ',
                cursor: 'pointer',
                display: 'flex',
                borderRadius: '4px',
                transition: '50s',
              }}
            >
              <Box
                sx={{
                  width: '90px',
                  height: '51px',
                  backgroundColor: isContinue ? '#DA1414' : '#287D3C',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  ...(open && {
                    borderRadius: '6px 0px 0px 6px',
                  }),
                }}
                onClick={
                  isContinue
                    ? handleSubmit(onSubmit)
                    : () => {
                        handleStartCall();
                        // setOpenModal(true);
                        // handleOpen();
                      }
                }
              >
                <CallButtonLightIcon />
                <Box sx={{ fontSize: '10px', mt: 1, color: '#FFF' }}>
                  {saving ? 'ending call ...' : `Start call`}
                </Box>
              </Box>
              <Box>
                <Box
                  onClick={toggleMenu}
                  sx={{
                    // p: '8px 4px',
                    backgroundColor: '#287D3C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '0 6px 6px 0',
                    ml: 1,
                    color: '#fff',
                    width: '0px',
                    cursor: 'pointer',
                    transition:
                      'width 0.4s ease-out 0.5s, padding 0.5s ease-out 1s',
                    height: '100%',
                    ...(open && {
                      width: '32px',
                      p: '8px 4px',
                      transition:
                        'width 0.4s ease-out 0.5s, padding 0.5s ease-out 1s',
                    }),
                  }}
                >
                  <Dropdown />
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleClose}
                  anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'bottom',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <MenuItem
                    id="demo-positioned-menu"
                    cursor="pointer"
                    aria-labelledby="demo-positioned-button"
                    onClick={() => {
                      handleClose();
                    }}
                    key={params?.voter?.id}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontSize: '10px' }}>
                        {params?.voter?.lastname} {params?.voter?.firstname}{' '}
                        {params?.voter?.middlename}
                      </Typography>
                      <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>
                        {' '}
                        {params?.voter?.phone}
                      </Typography>
                    </Box>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>

          <Box sx={{ width: '100%', height: '100%', margin: '0' }}>
            {openQuest && (
              <VotersQuest control={control} errors={errors} watch={watch} />
            )}
          </Box>
        </Box>

        {openModal && (
          <Box
            sx={{
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <CallModal
              open={openModal}
              onClose={handleCallClose}
              onContinue={handleCallContinue}
              onAction={handleEndCall}
            />
          </Box>
        )}
      </Card>
      {!openQuest && !isContinue && (
        <Box
          sx={{
            // width: '100%',
            height: '70vh',
            display: 'flex',
            justifyContent: ' center',
            alignItems: 'center',
          }}
        >
          <img src={PhoneIcon} alt="phoneicon" width="88px" height="150px" />
        </Box>
      )}
    </>
  );
}

export default DetailsOutbound;

DetailsOutbound.propTypes = {
  params: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array, null]),
  isLoading: PropTypes.bool,
};

DetailsOutbound.defaultProps = {
  data: null,
  isLoading: false,
};
