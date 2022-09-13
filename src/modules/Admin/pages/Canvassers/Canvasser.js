import React, { useState } from 'react';

import useStyles from 'modules/Admin/pages/UserManagement/styled.index';
import { Button, Chip, Divider, Skeleton, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';

import { ReactComponent as Info } from 'assets/infoRedIcon.svg';
import { ReactComponent as Pin } from 'assets/location_pin.svg';
import { AdminPaths } from 'constant/paths';
import { useMutation, useQuery } from 'react-query';
import frame from 'assets/box_top_frame.svg';
import nameInitial from 'utils/nameInitial';
import Breadcrumbs from 'shared/BreadCrumb';
import { capitalize } from 'utils/helperFunc';
import { ReactComponent as Cancel } from 'assets/cancel.svg';
import handleApiError from 'utils/handleApiError';
import useAlert from 'hooks/useAlert';
import { mockCanversser } from '../voters360/mock';
import { partyTopStat } from './utils';
import { getCanvasser } from './service/query';
import { canvasserStatusToggle } from './service/mutations';

const btnBaseStyle = { height: '30px', mt: 1, width: 'max-content' };
function Canvasser() {
  const classes = useStyles();
  const { showNotification } = useAlert();
  const [data, setData] = useState(mockCanversser?.results?.[0]);
  const { id } = useParams();

  const { isFetching, refetch } = useQuery(
    ['convasser_id', { id }],
    getCanvasser,
    {
      enabled: !!id,
      onSuccess: (res) => {
        setData(res?.data);
      },
      onError: (err) => {
        showNotification(handleApiError(err), { type: 'error' });
      },
    }
  );

  const { mutate, isLoading } = useMutation(canvasserStatusToggle, {
    onSuccess: () => {
      refetch();
      showNotification('status update successful', { type: 'success' });
    },
    onError: (err) => {
      showNotification(handleApiError(err), { type: 'error' });
    },
  });

  const getChipColor = (status) => {
    switch (status) {
      case 'positive':
        return { color: '#107C10', backgroundColor: 'rgba(95, 210, 85, 0.2)' };
      case 'negative':
        return { color: '#D83B01', backgroundColor: 'rgba(250, 65, 0, 0.2)' };
      case 'neutral':
        return { color: '#0078D4', backgroundColor: '#DEECF9' };
      default:
        return { color: '#107C10', backgroundColor: 'rgba(95, 210, 85, 0.2)' };
    }
  };

  const renderTopCard = () => {
    const fullname = `${data?.firstname} ${data?.middlename || ''} ${
      data?.lastname
    }`;
    const cardStart = partyTopStat(data);
    return (
      <Box position="relative" border="1px solid #E7E7ED" borderRadius="4px">
        <Box bgcolor="#0A3E94" height="80px" position="relative">
          <img
            src={frame}
            alt="frame"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              maxWidth: '100%',
              objectFit: 'contain',
              height: '80px !important',
            }}
          />
          {data?.status === 'APPROVE' ? (
            <Box textAlign="right">
              <Button
                disabled={isLoading}
                onClick={() => mutate({ id, status: 'REJECT' })}
                sx={{
                  ...btnBaseStyle,
                  color: '#D83B01',
                  background: '#fff',
                  '&:hover': {
                    background: '#fff',
                  },
                }}
              >
                <Cancel style={{ marginRight: 8 }} /> Reject
              </Button>
            </Box>
          ) : (
            ''
          )}
        </Box>
        <Box p={4}>
          <Box
            bgcolor="#0A3E94"
            color="#FFF"
            borderRadius="100%"
            position="absolute"
            display="grid"
            height="100px"
            width="100px"
            border="4px solid #FFFFFF"
            sx={{ placeItems: 'center', left: '20px', top: '35px' }}
          >
            {nameInitial(fullname?.toUpperCase())}
          </Box>
          <Box pl="150px" display="flex" justifyContent="space-between">
            <Box py={2}>
              <Typography
                variant="h4"
                color="textPrimary"
                sx={{ py: 3, alignItems: 'center', display: 'flex' }}
              >
                {fullname} <Info style={{ marginLeft: '1rem' }} />
              </Typography>
              <Typography
                variant="subtitle1"
                color="#5ACA75"
                component="span"
                sx={{
                  backgroundColor: '#EDF9F0',
                  p: 2,
                  mr: 3,
                  borderRadius: '4px',
                  maxWidth: 'max-content',
                  whiteSpace: 'nowrap',
                }}
              >
                Voter&apos;s ID: {data?.voters_id}
              </Typography>
              <Typography
                variant="subtitle1"
                color="#6B6C7E"
                component="span"
                sx={{
                  backgroundColor: '#E7E7ED',
                  p: 2,
                  borderRadius: '4px',
                  maxWidth: 'max-content',
                  whiteSpace: 'nowrap',
                }}
              >
                Polling Code: {data?.voting_polling_unit?.code}
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              color="#6B6C7E"
              component="span"
              sx={{
                backgroundColor: '#E7E7ED',
                p: 2,
                maxHeight: '35px',
                borderRadius: '4px',
                maxWidth: 'max-content',
                whiteSpace: 'nowrap',
              }}
            >
              Source: Electorate Database
            </Typography>
          </Box>
          <Box
            display="flex"
            p={4}
            bgcolor="#F5F7FA"
            mt={4}
            sx={{ overflowX: 'auto' }}
          >
            {cardStart?.map(({ label, title }, index) => {
              return (
                <Box>
                  <Box key={label} display="flex" mx={12} py={3}>
                    <Pin style={{ marginRight: '0.8rem' }} />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="#0A3E94"
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        {label}
                      </Typography>
                    </Box>
                  </Box>
                  {index !== 4 ? (
                    <Divider orientation="vertical" sx={{ mt: -15 }} />
                  ) : (
                    ''
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  };

  const renderLabelValue = (
    label,
    value,
    minWidth = '45%',
    chip = false,
    status = 'neutral'
  ) => {
    return (
      <Box pt={3} minWidth={minWidth}>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          sx={{
            maxWidth: 'max-content',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </Typography>
        {!chip ? (
          <Typography
            variant="subtitle1"
            color="textPrimary"
            sx={{
              pt: 3,
              alignItems: 'center',
              display: 'flex',
              fontWeight: 'bold',
            }}
          >
            {value}
          </Typography>
        ) : (
          <Chip
            label={value}
            size="small"
            sx={{
              mt: 4,
              ...getChipColor(status),
              '&.MuiChip-root': {
                borderRadius: '4px',
              },
            }}
          />
        )}
      </Box>
    );
  };

  if (isFetching) {
    return (
      <Box>
        <Skeleton sx={{ height: '25vh !important' }} />
        <Box my={5} />
        <Skeleton sx={{ height: '25vh !important' }} />
        <Box mt={5} />
        <Skeleton sx={{ height: '25vh !important' }} />
      </Box>
    );
  }

  return (
    <Box pb={10} className={classes.root}>
      <Box
        my={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Breadcrumbs
          links={[
            { path: 'Canvassers', to: AdminPaths.ADMIN_CANVASSER },
            { path: `${data?.firstname} ${data?.lastname}`, to: '/' },
          ]}
        />
        {data?.status === 'PENDING' ? (
          <Box display="flex">
            <Button
              disabled={isLoading}
              onClick={() => mutate({ id, status: 'REJECT' })}
              sx={{
                ...btnBaseStyle,
                color: '#D83B01',
                background: 'rgba(250, 65, 0, 0.2)',
                '&:hover': {
                  background: 'rgba(250, 65, 0, 0.2)',
                },
              }}
            >
              Reject
            </Button>
            <Button
              disabled={isLoading}
              sx={{ ...btnBaseStyle }}
              onClick={() => mutate({ id, status: 'APPROVE' })}
            >
              Approve
            </Button>
          </Box>
        ) : (
          ''
        )}
      </Box>
      <Box>{renderTopCard()}</Box>

      <Box border="1px solid #E5E5EA" borderRadius="4px" p={6} mt={6}>
        <Box borderRadius="4px" color="#F4F4F4">
          <Box bgcolor="#F0F5FF" color="#393A4A" p={2} mt={3}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#393A4A !important' }}
            >
              PERSONAL DATA{' '}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            mb={10}
            p={4}
            bgcolor="#FAFAFA"
            borderRadius="4px"
          >
            {renderLabelValue('First Name', data?.firstname || '--')}
            {renderLabelValue('Middle Name', data?.middlename || '--')}
            {renderLabelValue('Last Name', data?.lastname || '--')}
            {renderLabelValue('Nick Name', data?.lastname || '--')}
            {renderLabelValue('Primary Phone Number', data?.phone || '--')}
            {renderLabelValue(
              'Alternative Phone Number',
              data?.alt_phone || '--'
            )}
            {renderLabelValue('Gender', capitalize(data?.gender) || '--')}
          </Box>
        </Box>
        <Box borderRadius="4px" color="#F4F4F4" mt={6}>
          <Box bgcolor="#F0F5FF" color="#393A4A" p={2} mt={3}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#393A4A !important' }}
            >
              RESIDENTIAL INFORMATION
            </Typography>
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            mb={10}
            p={4}
            bgcolor="#FAFAFA"
            borderRadius="4px"
          >
            {renderLabelValue('Nationality', data?.nationality || '--')}
            {renderLabelValue(
              'State of Residence',
              data?.state_of_residence?.name || '--'
            )}
            {renderLabelValue(
              'LGA of Residence',
              data?.residence_lga?.name || '--'
            )}
            {renderLabelValue(
              'Ward of Residence',
              data?.residence_ward?.name || '--'
            )}
            {renderLabelValue('Full Address', data?.residence_address || '--')}
          </Box>
        </Box>
        <Box borderRadius="4px" color="#F4F4F4">
          <Box bgcolor="#F0F5FF" color="#393A4A" p={2} mt={3}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#393A4A !important' }}
            >
              VOTING AREA INFORMATION
            </Typography>
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            mb={10}
            p={4}
            bgcolor="#FAFAFA"
            borderRadius="4px"
          >
            {renderLabelValue(
              'State of Residence',
              data?.voting_state?.name || '--'
            )}
            {renderLabelValue('LGA', data?.voting_lga?.name || '--')}
            {renderLabelValue('Ward', data?.voting_ward?.name || '--')}
            {renderLabelValue(
              'Polling Unit',
              data?.voting_polling_unit?.name || '--'
            )}
          </Box>
        </Box>
        <Box borderRadius="4px" color="#F4F4F4">
          <Box bgcolor="#F0F5FF" color="#393A4A" p={2} mt={3}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#393A4A !important' }}
            >
              OTHER INFORMATION
            </Typography>
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            mb={10}
            p={4}
            bgcolor="#FAFAFA"
            borderRadius="4px"
          >
            {renderLabelValue('Date of Birth', data?.date_of_birth || '--')}
            {renderLabelValue('Age', data?.age || '--')}
            {renderLabelValue('Occupation', data?.occupation || '--')}
            {renderLabelValue(
              'Highest Education Qualification',
              data?.highest_qualification || '--'
            )}
          </Box>
        </Box>
        <Box borderRadius="4px" color="#F4F4F4">
          <Box bgcolor="#F0F5FF" color="#393A4A" p={2} mt={3}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#393A4A !important' }}
            >
              ADDITIONAL INFORMATION
            </Typography>
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            p={4}
            bgcolor="#FAFAFA"
            borderRadius="4px"
          >
            {renderLabelValue(
              'Registered Voter',
              data?.is_registered_voter?.toString() || '--',
              undefined,
              true,
              data?.is_registered_voter ? 'positive' : 'negative'
            )}
            {renderLabelValue(
              'Plan to vote Voter',
              data?.plans_to_vote?.toString() || '--',
              undefined,
              true,
              data?.plans_to_vote ? 'positive' : 'negative'
            )}
            {renderLabelValue(
              'Party Affiliation Voter',
              data?.party_affiliated?.name || '--',
              undefined,
              true
            )}
            {renderLabelValue(
              'Party Inclination',
              data?.party_to_vote?.name || '--',
              undefined,
              true
            )}
          </Box>
        </Box>
        <Box borderRadius="4px" color="#F4F4F4">
          <Box bgcolor="#F0F5FF" color="#393A4A" p={2} mt={6}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#393A4A !important' }}
            >
              PVC SNAPSHOT
            </Typography>
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            p={4}
            bgcolor="#FAFAFA"
            borderRadius="4px"
          >
            <img src={data?.pvc} alt="pvc_snapshot" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Canvasser;
