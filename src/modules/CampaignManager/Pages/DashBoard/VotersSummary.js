import { Box, styled, Typography, Avatar, Grid } from '@mui/material';
import React from 'react';
import ProgressBar from 'react-customizable-progressbar';
import { pxToRem } from 'utils/formatFont';
import { ReactComponent as MiniCrown } from 'assets/svg/MiniCrown.svg';
import PropTypes from 'prop-types';
import { numberWithCommas } from 'utils/numberformat';

function VotersSummary({ data, colors }) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Box>
          <ProgressBar
            radius={150}
            progress={data[0].percentage}
            strokeColor={colors[0]}
            pointerRadius={0}
            pointerStrokeWidth={0}
            strokeWidth={8}
            trackStrokeWidth={8}
            trackStrokeColor="#F5F7FA"
            pointerStrokeColor="#7bcd5c"
            initialAnimationDelay={1000}
            initialAnimation
            trackTransition=".1s ease"
            transition="1s ease"
          >
            <BarWrapperStyle>
              <ProgressBar
                radius={130}
                progress={data[1].percentage}
                strokeColor={colors[1]}
                strokeWidth={8}
                trackStrokeWidth={8}
                trackStrokeColor="#F5F7FA"
                pointerRadius={0}
                pointerStrokeWidth={0}
                pointerStrokeColor="#7bcd5c"
                initialAnimationDelay={1000}
                initialAnimation
                trackTransition=".1s ease"
                transition="1s ease"
              >
                <BarWrapperStyle>
                  <ProgressBar
                    radius={110}
                    progress={data[2].percentage}
                    strokeColor={colors[2]}
                    strokeWidth={8}
                    trackStrokeWidth={8}
                    trackStrokeColor="#F5F7FA"
                    pointerRadius={0}
                    pointerStrokeWidth={0}
                    pointerStrokeColor="#7bcd5c"
                    initialAnimationDelay={1000}
                    initialAnimation
                    trackTransition=".1s ease"
                    transition="1s ease"
                  >
                    <BarWrapperStyle>
                      <ProgressBar
                        radius={90}
                        progress={data[3].percentage}
                        strokeColor={colors[3]}
                        strokeWidth={8}
                        trackStrokeWidth={8}
                        trackStrokeColor="#F5F7FA"
                        pointerRadius={0}
                        pointerStrokeWidth={0}
                        pointerStrokeColor="#7bcd5c"
                        initialAnimationDelay={1000}
                        initialAnimation
                        trackTransition=".1s ease"
                        transition="1s ease"
                      >
                        <BarWrapperStyle
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Avatar
                            sx={{
                              height: 39.59,
                              width: 39.59,
                              background: '#F0F5FF !important',
                            }}
                          >
                            <MiniCrown />
                          </Avatar>
                          <Typography
                            variant="button"
                            fontWeight={700}
                            fontSize={pxToRem(13.0578)}
                            lineHeight="150%"
                            textAlign="center"
                            color="#A7A9BC"
                          >
                            TOTAL VOTERS
                          </Typography>
                          <Typography
                            variant="h2"
                            fontWeight={400}
                            fontSize={pxToRem(28.2919)}
                            lineHeight="133%"
                            textAlign="center"
                            textTransform="capitalize"
                            color="#6B6C7E"
                          >
                            189.3M
                          </Typography>
                        </BarWrapperStyle>
                      </ProgressBar>
                    </BarWrapperStyle>
                  </ProgressBar>
                </BarWrapperStyle>
              </ProgressBar>
            </BarWrapperStyle>
          </ProgressBar>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {data.map((value, idx) => (
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={6} display="flex" alignItems="center">
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  border: `2px solid ${colors[idx]}`,
                  borderRadius: '50%',
                  fontWeight: 400,
                  fontSize: pxToRem(16),
                  lineHeight: '150%',
                  color: '#6B6C7E',
                }}
              />
              <Typography
                marginLeft={2}
                fontWeight={400}
                fontSize={pxToRem(16)}
                lineHeight="150%"
                color="#6B6C7E"
              >
                {value.title}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                marginLeft={2}
                fontWeight={400}
                fontSize={pxToRem(16)}
                lineHeight="150%"
                color="#6B6C7E"
              >
                {value.percentage}%
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                marginLeft={2}
                fontWeight={400}
                fontSize={pxToRem(16)}
                lineHeight="150%"
                color="#6B6C7E"
              >
                {numberWithCommas(value.count)}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

VotersSummary.propTypes = {
  data: PropTypes.arrayOf({
    title: PropTypes.string,
    percentage: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,

  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const BarWrapperStyle = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));

export default VotersSummary;
