/* eslint-disable */
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { LinearProgress } from '@mui/material';
import { format } from 'date-fns';
import { Loader } from 'shared';


import useStyles from 'modules/Admin/pages/Campaign/AddPoll/FormSteps/Preview/styled.preview';

import { ReactComponent as CallIcon } from 'assets/call_center.svg';
import { ReactComponent as TargetIcon } from 'assets/svg/targetIcon.svg';
import { ReactComponent as TimelineIcon } from 'assets/timelinePreview.svg';
import BGDesign from 'assets/pollPreviewHeaderBG.svg';
import { getTimeline } from 'utils/transformDate';

const pollTypeLookUp = {
  GENERIC: 'Generic',
  PARTY_POPULARITY: 'Party Popularity',
  CANDIDATE_POPULARITY: 'Candidate Popularity',
};

function Summary({ data, loading }) {
  const classes = useStyles();

  if (loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Header>
        <Box py="16px" px="20px">
          <Typography
            component="span"
            color="primary"
            variant="subtitle1"
            className={classes.post}
          >
            {pollTypeLookUp[data?.type]}
          </Typography>
          <Typography variant="h4" className={classes.header}>
            {data?.name}
          </Typography>
        </Box>
      </Header>
      <Box py="32px" px="16px">
        <Box display="flex" alignItems="center">
          <CallIcon />
          <Typography ml="8px" className={classes.description} variant="body2">
            CALL CENTER
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          {data?.call_center?.map((center) => (
            <RoundedPill>{center}</RoundedPill>
          ))}
        </Box>
        <Box mt="32px">
          <Box display="flex" alignItems="center">
            <TargetIcon />
            <Typography color="#6B6C7E" ml="8px" variant="body1">
              TARGET COUNT : {`${data?.targets?.toLocaleString('en-US')}`}
            </Typography>
          </Box>
          <Box mt="16px" display="flex" alignItems="center">
            {data?.poll_criteria?.has_age && (
              <WhiteBox>
                <div className="title">Age</div>
                <RoundedPill big>
                  <b>Range : </b>
                  {data?.poll_criteria?.min_age} -{' '}
                  {data?.poll_criteria?.max_age} years
                </RoundedPill>
              </WhiteBox>
            )}
            {data?.poll_criteria?.has_gender ? (
              <WhiteBox>
                <div className="title">Gender</div>
                <Box display="flex" alignItems="center">
                  <RoundedPill big>{data?.poll_criteria?.gender?.toLowerCase()}</RoundedPill>
                </Box>
              </WhiteBox>
            ) : (
              <WhiteBox>
                <div className="title">Gender</div>
                <Box display="flex" alignItems="center">
                  <RoundedPill big>Male</RoundedPill>
                  <RoundedPill big>Female</RoundedPill>
                </Box>
              </WhiteBox>
            )}
          </Box>
          {data?.poll_criteria?.locations?.length && (
            <WhiteBox mt="16px">
              <div className="title">location</div>
              <RoundedPill big>
                <b>Zone : </b>
                {data?.poll_criteria?.locations?.map(({ name }, index, arr) => (
                  <>{`${name} ${index !== arr.length - 1 ? `• ` : ''}`}</>
                ))}
              </RoundedPill>
            </WhiteBox>
          )}
        </Box>
        <Box mt="32px">
          <Box display="flex" alignItems="center">
            <TimelineIcon />
            <Typography color="#6B6C7E" ml="8px" variant="body1">
              TIMELINE
            </Typography>
          </Box>
          <LinearProgress
            value={getTimeline(data?.start_date, data?.end_date)}
            colour="primary"
            variant="determinate"
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontSize={12} fontWeight={400} variant="body1">
              {data?.start_date && format(new Date(data?.start_date), 'dd MMM, yyyy')}
            </Typography>
            <Typography fontSize={12} fontWeight={400} variant="body1">
              {data?.end_date && format(new Date(data?.end_date ), 'dd MMM, yyyy')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
}

const Header = styled(Box)(() => ({
  backgroundImage: `url(${BGDesign})`,
  backgroundPosition: 'top',
  backgroundSize: 'cover',
}));

const Wrapper = styled(Box)(() => ({
  border: '1px solid #E5E5EA',
  borderRadius: '8px',
  backgroundColor: '#F9F9F9',
  marginBottom: 40,
}));

const WhiteBox = styled(Box)(() => ({
  padding: 16,
  background: '#fff',
  borderRadius: 8,
  height: 87,
  marginRight: 16,
  boxShadow: `inset -1px 0px 0px #E5E5EA, inset 1px 0px 0px #E5E5EA, inset 0px -1px 0px #E5E5EA, inset 0px 1px 0px #E5E5EA`,
  '& .title': {
    fontSize: 12,
    fontWeight: 550,
    color: '#393A4A',
  },
}));

const RoundedPill = styled(Box)(({ big = false }) => ({
  padding: '4px 8px',
  border: '1px solid #0050C8',
  background: '#E5EDFF',
  borderRadius: 25,
  fontSize: big ? '14px' : '12px',
  color: '#272833',
  marginRight: 8,
  marginTop: 8,
  textTransform: 'capitalize'
}));

export default Summary;
