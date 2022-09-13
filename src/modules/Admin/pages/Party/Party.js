import React, { useState } from 'react';

import useStyles from 'modules/Admin/pages/UserManagement/styled.index';
import { Chip, Divider, Skeleton, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';

import { ReactComponent as Info } from 'assets/infoRedIcon.svg';
import { ReactComponent as Pin } from 'assets/location_pin.svg';
import { AdminPaths } from 'constant/paths';
import { useQuery } from 'react-query';
import frame from 'assets/box_top_frame.svg';
import nameInitial from 'utils/nameInitial';
import handleApiError from 'utils/handleApiError';
import useAlert from 'hooks/useAlert';
import Breadcrumbs from 'shared/BreadCrumb';
import { mockVoters } from '../voters360/mock';
import { getVoter360ById } from '../voters360/service/query';
import { partyTopStat } from './utils';

function SingleElectorate() {
  const classes = useStyles();
  const [data, setData] = useState(mockVoters?.results?.[0]);
  const { id } = useParams();
  const { showNotification } = useAlert();

  const { isFetching } = useQuery(
    ['voter360-single', { id }],
    getVoter360ById,
    {
      enabled: !!id,
      onSuccess: (res) => {
        setData(res);
      },
      onError: (err) => {
        showNotification(handleApiError(err), { type: 'error' });
      },
    }
  );

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
                Voter&apos;s ID: {data?.voter_ref}
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
                Polling Code: {data?.polling_unit?.code}
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
    <Box className={classes.root}>
      <Box my={7}>
        <Breadcrumbs
          links={[
            { path: 'Party', to: AdminPaths.ADMIN_PARTY },
            { path: `${data?.firstname} ${data?.lastname}`, to: '/' },
          ]}
        />
      </Box>
      <Box>{renderTopCard()}</Box>
      <Box mb={10} mt={6}>
        <Box border="1px solid #E5E5EA" borderRadius="4px" p={6}>
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
              {renderLabelValue('Party ID', data?.party_id || '--')}
              {renderLabelValue('Title', data?.title || '--')}
              {renderLabelValue('First Name', data?.firstname || '--')}
              {renderLabelValue('Middle Name', data?.middlename || '--')}
              {renderLabelValue('Last Name', data?.lastname || '--')}
              {renderLabelValue('Email Address', data?.email || '--')}
              {renderLabelValue('Gender', data?.gender || '--')}
              {renderLabelValue('Date of Birth', data?.date_of_birth || '--')}
            </Box>
          </Box>
          <Box borderRadius="4px" color="#F4F4F4" mt={6}>
            <Box bgcolor="#F0F5FF" color="#393A4A" p={2} mt={3}>
              <Typography
                variant="subtitle2"
                sx={{ color: '#393A4A !important' }}
              >
                CONTACT INFORMATION
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
              {renderLabelValue('Primary Phone Number', data?.phone || '--')}
              {renderLabelValue(
                'Alternative Phone Number',
                data?.alternative_phone || '--'
              )}
              {renderLabelValue('Email Address', data?.email || '--')}
              {renderLabelValue(
                'Permanent Home Address',
                data?.address || '--'
              )}
            </Box>
          </Box>
          <Box borderRadius="4px" color="#F4F4F4">
            <Box bgcolor="#F0F5FF" color="#393A4A" p={2} mt={3}>
              <Typography
                variant="subtitle2"
                sx={{ color: '#393A4A !important' }}
              >
                LOCATION INFORMATION
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
              {renderLabelValue('State of Residence', data?.state || '--')}
              {renderLabelValue('LocalGovernment Area', data?.lga || '--')}
              {renderLabelValue('Ward', data?.ward || '--')}
              {renderLabelValue(
                'Polling Unit',
                data?.polling_unit?.name || '--'
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
                data?.registered_area || '--',
                undefined,
                true,
                'positive'
              )}
              {renderLabelValue(
                'Plan to vote Voter',
                data?.occupation || '--',
                undefined,
                true,
                'negative'
              )}
              {renderLabelValue(
                'Party Affiliation Voter',
                data?.occupation || '--',
                undefined,
                true
              )}
              {renderLabelValue(
                'Party Inclination',
                data?.occupation || '--',
                undefined,
                true
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SingleElectorate;
