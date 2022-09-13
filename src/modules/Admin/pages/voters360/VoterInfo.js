/* eslint-disable no-unsafe-optional-chaining */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { AdminPaths } from 'constant/paths';
import React, { useCallback, useState } from 'react';
import Breadcrumbs from 'shared/BreadCrumb';
import frame from 'assets/box_top_frame.svg';
import { ReactComponent as Info } from 'assets/info_icon.svg';
import { ReactComponent as Pin } from 'assets/location_pin.svg';
import padlock from 'assets/padlock.svg';
import lock from 'assets/lock.svg';
import nameInitial from 'utils/nameInitial';
import { Button } from 'shared';
import { Chip, Skeleton } from '@mui/material';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import useDrawer from 'hooks/useDrawer';
import handleApiError from 'utils/handleApiError';
import useAlert from 'hooks/useAlert';
import { mockVoters } from './mock';
import { voterTopStat } from './utils';
import { getVoter360ById } from './service/query';
import PollsDrawer from './components/PollsDrawer';

const styleLabel = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

function VoterInfo() {
  const [state, setState] = useDrawer();
  const [data, setData] = useState(mockVoters?.results?.[0]);
  const { id } = useParams();
  const { showNotification } = useAlert();

  const handleOpenDrawer = useCallback(() => {
    setState({ ...state, drawerName: 'polls_info_history' });
  }, [state]);

  const { isFetching } = useQuery(
    ['voter360-single', { id }],
    getVoter360ById,
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

  const renderPhoneNumber = (label, value) => {
    return (
      <Typography
        variant="subtitle1"
        color="#6B6C7E"
        component="span"
        sx={{
          backgroundColor: '#E7E7ED',
          p: 2,
          mr: 3,
          mb: 3,
          borderRadius: '4px',
          maxWidth: 'max-content',
          whiteSpace: 'nowrap',
        }}
      >
        {label}: {value}
      </Typography>
    );
  };

  const renderLabelValue = (label, value, hasPin = false, minWidth = '45%') => {
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
          {value} {hasPin ? <Info style={{ marginLeft: '1rem' }} /> : ''}
        </Typography>
      </Box>
    );
  };

  const renderTopCard = () => {
    const fullname = `${data?.firstname} ${data?.middlename || ''} ${
      data?.lastname
    }`;
    const cardStart = voterTopStat(data);
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
                Polling Code: {data?.voting_pu?.code}
              </Typography>
            </Box>
            <Button
              sx={{ maxWidth: 'max-content', height: 'max-content', mt: 3 }}
            >
              Edit
            </Button>
          </Box>
          <Box
            display="flex"
            p={4}
            bgcolor="#F5F7FA"
            mt={4}
            sx={{ overflowX: 'auto' }}
          >
            {cardStart?.map(({ label, value }, index) => {
              return (
                <Box>
                  <Box key={label} display="flex" mx={16} py={3}>
                    <Pin style={{ marginRight: '0.8rem' }} />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        {label}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="#0A3E94"
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        {value}
                      </Typography>
                    </Box>
                  </Box>
                  {index !== 3 ? (
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
    <Box>
      <Breadcrumbs
        links={[
          { path: 'Voters 360', to: AdminPaths.ADMIN_VOTERS_360 },
          { path: `${data?.firstname} ${data?.lastname}`, to: '/' },
        ]}
      />
      <Box>{renderTopCard()}</Box>
      <Grid container sx={{ my: '1.5rem' }} spacing={4}>
        <Grid item xs={12} md={8}>
          <Box border="1px solid #E5E5EA" borderRadius="4px" p={4} mb={6}>
            <Typography variant="subtitle2">ADDITIONAL INFORMATION</Typography>
            <Box borderRadius="4px" color="#F4F4F4">
              <Box bgcolor="#F0F5FF" color="#393A4A" p={2} mt={3}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#393A4A !important' }}
                >
                  PERSONAL DATA{' '}
                </Typography>
              </Box>
              <Typography color="#6B6C7E" variant="subtitle1" sx={{ pt: 3 }}>
                Phone Number
              </Typography>
              <Box
                display="flex"
                flexWrap="wrap"
                mt={4}
                justifyContent="flex-start"
                alignItems="center"
              >
                {renderPhoneNumber('INEC DB', '08073884938')}
                {renderPhoneNumber('Party DB', '08073884938')}
                {renderPhoneNumber('Canvassers DB', '08073884938')}
              </Box>
              <Box
                display="flex"
                flexWrap="wrap"
                p={4}
                bgcolor="#FAFAFA"
                borderRadius="4px"
              >
                {renderLabelValue('Occupation', data?.occupation || '--')}
                {renderLabelValue('Date of birth', data?.date_of_birth)}
                {renderLabelValue(
                  'Maiden Name',
                  data?.maiden_name || '--',
                  true
                )}
                {renderLabelValue('Nick Name', data?.nickname || '--', true)}
                {renderLabelValue('Email Address', data?.email || '--')}
                {renderLabelValue('Gender', data?.gender || '--')}
                {renderLabelValue(
                  'State of Origin',
                  data?.state_of_residence?.name || '--',
                  true
                )}
                {renderLabelValue(
                  'Residence LGA',
                  data?.lga_of_residence?.name || '--'
                )}
                {renderLabelValue('Residence City', data?.city || '--')}
                {renderLabelValue(
                  'State of Registration',
                  data?.voting_state?.name || '--'
                )}
              </Box>
            </Box>
            <Box borderRadius="4px" color="#F4F4F4" mt={6}>
              <Box bgcolor="#F0F5FF" color="#393A4A" p={2} mt={3}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#393A4A !important' }}
                >
                  RESIDENTIAL DATA{' '}
                </Typography>
              </Box>
              <Box
                display="flex"
                flexWrap="wrap"
                p={4}
                bgcolor="#FAFAFA"
                borderRadius="4px"
              >
                {renderLabelValue('State', data?.state_of_residence?.name)}
                {renderLabelValue(
                  'Local Government Area',
                  data?.lga_of_residence?.name,
                  true
                )}
                {renderLabelValue(
                  'Ward',
                  data?.ward_of_residence?.name || '--'
                )}
                {renderLabelValue('Address', data?.address || '--')}
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            borderRadius="4px"
            color="#F4F4F4"
            p={4}
            height="auto"
            border="1px solid #E5E5EA"
          >
            <Typography
              variant="subtitle1"
              color="textSecondary"
              sx={{ fontWeight: 'bold', pb: '1rem' }}
            >
              Voter’s Tag
            </Typography>
            <Box sx={styleLabel}>
              <Typography variant="subtitle1" color="textSecondary">
                Party Affiliation:{' '}
              </Typography>
              <Chip
                label="Unknown"
                size="small"
                sx={{
                  color: '#0078D4',
                  background: '#DEECF9',
                  '&.MuiChip-root': {
                    borderRadius: '4px',
                  },
                }}
              />
            </Box>
            <Box sx={styleLabel} my={3}>
              <Typography variant="subtitle1" color="textSecondary">
                Registered Voter:
              </Typography>
              <Chip
                label="Yes"
                size="small"
                sx={{
                  color: '#107C10',
                  background: 'rgba(95, 210, 85, 0.2)',
                  '&.MuiChip-root': {
                    borderRadius: '4px',
                  },
                }}
              />
            </Box>
            <Box sx={styleLabel}>
              <Typography variant="subtitle1" color="textSecondary">
                Plan to vote:
              </Typography>
              <Chip
                label="No"
                size="small"
                sx={{
                  color: '#D83B01',
                  background: 'rgba(250, 65, 0, 0.2)',
                  '&.MuiChip-root': {
                    borderRadius: '4px',
                  },
                }}
              />
            </Box>
          </Box>
          <Box
            borderRadius="4px"
            p={4}
            height="auto"
            my={4}
            position="relative"
            border="1px solid #E5E5EA"
          >
            <Typography
              variant="subtitle1"
              color="textSecondary"
              sx={{ fontWeight: 'bold', pb: '1rem' }}
            >
              Candidate Affinity Score
            </Typography>
            <Typography variant="h4" color="textPrimary">
              47%
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              * Calculated based on all call engagement with voter
            </Typography>
            <img
              src={padlock}
              alt="frame"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            />
          </Box>
          <Box
            borderRadius="4px"
            p={4}
            position="relative"
            height="auto"
            border="1px solid #E5E5EA"
          >
            <Typography
              variant="subtitle1"
              color="textSecondary"
              sx={{ fontWeight: 'bold', pb: '1rem' }}
            >
              Party Affinity Score
            </Typography>
            <Typography variant="h4" color="textPrimary">
              17%
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              * Not a core member
            </Typography>
            <img
              src={lock}
              alt="frame"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            />
          </Box>
          <Box
            mt={4}
            borderRadius="4px"
            p={4}
            position="relative"
            height="auto"
            border="1px solid #E5E5EA"
          >
            <Typography
              variant="subtitle1"
              color="textSecondary"
              sx={{ fontWeight: 'bold', pb: '1rem' }}
            >
              Polls
            </Typography>
            <Typography variant="h4" color="textPrimary">
              12
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ cursor: 'pointer' }}
              color="#0050C8"
              onClick={handleOpenDrawer}
            >
              Click here to view
            </Typography>
            <img
              src={lock}
              alt="frame"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <PollsDrawer />
    </Box>
  );
}

export default VoterInfo;
