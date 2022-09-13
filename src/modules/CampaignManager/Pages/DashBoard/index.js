/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import upperCase from 'lodash/upperCase';
import Box from '@mui/material/Box';
import useAuth from 'hooks/useAuth';
import { Button, HorizontalBar, LineChart, Menu, PieChart } from 'shared';
import {
  apathyRatioData,
  candidateList,
  data,
  horizontalData,
  // popularityData,
  popularityRatioData,
  sentimenCandidate,
} from 'modules/CampaignManager/mock/dashboardData';
import WordCloud from 'react-d3-cloud';
// import wordCloud from 'modules/CampaignManager/mock/wordCloud';
import { numberWithCommas, timeDayFormat } from 'utils/numberformat';
import useMenu from 'hooks/useMenu';
import {
  useAnalyticStats,
  useWordCloud,
} from 'hooks/queries/useCampaignAnalytic';
import useWindowDimensions from 'hooks/useLayoutDimension';

const fontSize = (word) => word.value / 20;
// const rotate = (word) => (word.value % 90) - 45;
const rotate = (word) => (word.value % 360) - 180;

export default function DASHBOARD() {
  const { auth } = useAuth();
  const { anchorEl, handleClose, toggleMenu } = useMenu();
  const [candidate, setCandidate] = React.useState('Candidate');
  const [sentiment, setSetiment] = React.useState('Bola Ahmed Tinubu');
  const { width } = useWindowDimensions();
  const lineChart = width * 0.75;
  const [sentimentPie, setSentimentPie] = React.useState([]);
  const [wordCloud, setWordCloud] = React.useState([]);
  const {
    anchorEl: anchorELP,
    handleClose: handleCloeP,
    toggleMenu: toggleMenuP,
  } = useMenu();
  const theme = useTheme();
  const lineChartKey = Object.keys(data[0]);
  const [period, setPeriod] = React.useState('1Y');
  const color = ['#0A3E94', '#287D3C', '#E7E7ED', '#0A3E94', '#1E0A3C'];
  const periodArr = ['Today', '1W', '1M', '3M', '6M', '1Y'];
  const { analyticData, isSuccess: sentimentPieSuccess } = useAnalyticStats({
    keyword: sentiment,
  });
  const {
    wordCloud: wordCloudData,
    gettingWordCloud,
    isSuccess: wordSuccess,
  } = useWordCloud({ keyword: sentiment });

  React.useEffect(() => {
    if (wordSuccess && wordCloudData.length) {
      const wdValue = wordCloudData?.map((v) => ({
        text: v?.name,
        value: v.value * 3,
      }));
      setWordCloud(wdValue);
    }
  }, [wordSuccess, wordCloudData]);

  React.useEffect(() => {
    if (sentimentPieSuccess && analyticData) {
      let pieState = [];
      Object.keys(analyticData)?.forEach((field) => {
        if (field === 'negative') {
          pieState = [
            ...pieState,
            {
              name: field,
              value: analyticData?.[field],
            },
          ];
        }
        if (field === 'positive') {
          pieState = [
            ...pieState,
            {
              name: field,
              value: analyticData?.[field],
            },
          ];
        }
        if (field === 'neutral') {
          pieState = [
            ...pieState,
            {
              name: field,
              value: analyticData?.[field],
            },
          ];
        }
      });
      setSentimentPie(pieState);
    }
  }, [sentimentPieSuccess, analyticData]);

  const formatPopularitydata = popularityRatioData?.map((v) => {
    const field = {};
    field.options = [
      {
        value: v.value,
        name: v.name,
      },
      {
        value: v.negative,
        name: 'Negative',
      },
    ];
    field.name = v.name;

    field.label = `${v.name} (${upperCase(v.party)})`;
    field.value = v.value;
    field.percentage =
      v.value && v.negative
        ? ((v.value / (v.negative + v.value)) * 100).toFixed(2)
        : 0;
    return field;
  });
  const handlePopularityMenu = (text) => {
    setCandidate(text);
    handleClose();
  };
  // eslint-disable-next-line no-unused-vars
  const formatApathyratioData = apathyRatioData?.map((v) => {
    const reduceApathSUm = apathyRatioData.reduce(
      (prev, curr) => prev + curr.value,
      0
    );

    const field = {};
    field.value = ((v.value / reduceApathSUm) * 100).toFixed(2);
    field.name = v.name;

    return field;
  });

  const handleSentimentMenu = (text) => {
    setSetiment(text);
    handleCloeP();
  };
  // const newData = wordCloud.map((item) => ({
  //   text: item.text,
  //   value: Math.random() * 1000,
  // }));
  const sentimentPieColor = ['#287D3C', '#9F1F17', '#B98900'];
  const formatCadidate = candidateList?.map((v) => ({
    name: v,
    action: () => handlePopularityMenu(v),
  }));
  const formatSentiment = sentimenCandidate?.map((v) => ({
    name: v,
    action: () => handleSentimentMenu(v),
  }));

  return (
    <div>
      <Typography
        color="text.secondary"
        fontSize={14}
        lineHeight={1.5}
        fontWeight={500}
      >
        Dashboard
      </Typography>
      <Typography
        color="text.primary"
        fontSize={23}
        lineHeight={1.33}
        fontWeight={500}
      >
        {timeDayFormat()}, {auth.userObj.FirstName}!
      </Typography>
      <Box
        sx={{
          backgroundColor: 'common.white',
          borderRadius: 8,
          border: `1px solid ${theme.palette.border.default}`,
          px: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            color="text.primary"
            fontWeight={500}
            fontSize={18}
            lineHeight={1.5}
            sx={{
              px: 5,
              mx: 6,
            }}
          >
            Popularity Over Time
          </Typography>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Box sx={{ flex: 1 }}>Legened</Box>,
            <Box>
              <Button children={candidate} onClick={toggleMenu} />
              <Menu
                handlePopeverClose={handleClose}
                anchorEl={anchorEl}
                menuItems={formatCadidate}
              />
            </Box>
          </Box>
        </Box>
        <LineChart
          data={data}
          width={lineChart}
          height={340}
          keyArray={lineChartKey}
          color={color}
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 16%)',
            backgroundColor: '#F7F8F9',
            borderRadius: '8px',
            width: '750px',
            p: 1,
            mb: 2,
            mx: 6,
          }}
        >
          {periodArr.map((v, i) => (
            <StyledSpan
              onClick={() => setPeriod(v)}
              key={`period-${i}`}
              isActive={period === v}
            >
              {v}
            </StyledSpan>
          ))}
        </Box>
      </Box>
      <Box
        mt={6}
        sx={{ display: 'grid', gridTemplateColumns: '76% 20%', gap: '32px' }}
      >
        <Box
          sx={{
            border: `1px solid ${theme.palette.border.default}`,
            borderRadius: '8px',
            p: 4,
          }}
        >
          <Typography
            color="text.primary"
            fontWeight={600}
            fontSize={16}
            lineHeight={1.5}
          >
            Popularity Ratio
          </Typography>
          <Stack
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              px: 4,
            }}
          >
            {formatPopularitydata?.map((v, i) => (
              <Box
                sx={{
                  border: `1px solid ${theme.palette.border.default}`,
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: theme.palette.border.secondary,
                }}
                key={`popular-${i}`}
              >
                <PieChart
                  width={100}
                  height={100}
                  data={v.options}
                  color={color}
                />
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateRows: 'repeat(2, 30px)',
                    flex: 1,
                    mx: 3,
                    gap: '3px',
                  }}
                >
                  <Typography
                    color="text.secondary"
                    fontSize={14}
                    lineHeight={1.5}
                    fontWeight={600}
                  >
                    {v?.label}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      '& .MuiTypography-root': {
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: 1.5,
                      },
                    }}
                  >
                    <Typography>{numberWithCommas(v.value)}</Typography>
                    <Typography>{`${v?.percentage}%`}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box
          sx={{
            border: `1px solid ${theme.palette.border.default}`,
            borderRadius: '8px',
            p: 2,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <PieChart
              width={210}
              height={210}
              data={apathyRatioData}
              color={['#287D3C', '#9F1F17']}
              radius={90}
              cx={90}
              cy={90}
              content={<CustomTooltip label2 title="Apathy Ratio" />}
            />
            <Box sx={{ flex: 1 }}>
              {formatApathyratioData?.map((v) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}
                >
                  <div>
                    <StyledBox bgColor={v.name === 'Yes' && 'green'} /> {v.name}
                  </div>
                  <div>{`${v.value}%`}</div>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        mt={6}
        sx={{
          border: `1px solid ${theme.palette.border.default}`,
          borderRadius: '8px',
        }}
      >
        <Box sx={{ p: 4 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
            <Typography
              color="text.primary"
              fontWeight={600}
              fontSize={16}
              lineHeight={1.5}
            >
              Sentimental Analysis
            </Typography>
            <Box>
              <Button children={sentiment} onClick={toggleMenuP} />
              <Menu
                handlePopeverClose={handleCloeP}
                anchorEl={anchorELP}
                menuItems={formatSentiment}
              />
            </Box>
          </Box>
          <Box
            mt={1}
            sx={{
              borderRadius: '8px',
              display: 'grid',
              gridTemplateColumns: '75% 20%',
              gap: '32px',
            }}
          >
            <Box
              sx={{ border: `1px solid ${theme.palette.border.default}` }}
              mt={6}
            >
              {!gettingWordCloud && wordCloud.length && (
                <WordCloud
                  width={1000}
                  height={350}
                  data={wordCloud}
                  fontSize={fontSize}
                  rotate={rotate}
                  padding={2}
                />
              )}
            </Box>
            {sentimentPie && sentimentPie?.length && (
              <Box
                sx={{
                  border: `1px solid ${theme.palette.border.default}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  borderRadius: '4px',
                  p: 2,
                }}
                mt={6}
              >
                <PieChart
                  width={210}
                  height={210}
                  data={sentimentPie}
                  color={sentimentPieColor}
                  radius={90}
                  cx={90}
                  cy={90}
                />
                <Box sx={{ width: '100%' }}>
                  {sentimentPie?.map((v, i) => {
                    const totalSentimentPie =
                      sentimentPie?.length &&
                      sentimentPie.reduce((orig, curr) => orig + curr.value, 0);

                    return (
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: 'auto 1fr',
                          placeItems: 'center',
                        }}
                      >
                        <Box sx={{ fontSize: '10.6px', lineHeight: 1.33 }}>
                          <StyledBox
                            bgColor={sentimentPieColor[i % sentimentPie.length]}
                          />{' '}
                          {v?.name || ''}
                        </Box>
                        <Box
                          sx={{
                            fontSize: '14px',
                            lineHeight: 1.33,
                            color: '#393A4A',
                          }}
                        >
                          {`${v.value} (${(
                            (v.value / totalSentimentPie) *
                            100
                          ).toFixed(2)})`}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          p: 4,
          border: `1px solid ${theme.palette.border.default}`,
          borderRadius: '8px',
          mt: 4,
        }}
      >
        <Typography
          color="text.secondary"
          fontSize={14}
          lineHeight={1.33}
          fontWeight={600}
          mx={5}
        >
          Need Assessement
        </Typography>
        <HorizontalBar data={horizontalData} />
      </Box>
    </div>
  );
}

const StyledSpan = styled('span', {
  shouldForwardProp: (prop) => prop !== 'isActive',
})(({ theme, isActive }) => ({
  display: 'block',
  width: '125px',
  textAlign: 'center',
  borderRadius: '8px',
  ...(isActive && {
    backgroundColor: theme.palette.misc.darkSurface,
    color: theme.palette.common.white,
    boxShadow: `0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)`,
  }),
  '&:hover': {
    cursor: 'pointer',
  },
}));

const StyledBox = styled('span', {
  shouldForwardProp: (prop) => prop !== 'bgColor',
})(({ bgColor }) => ({
  display: 'inline-block',
  height: 12,
  width: 17,
  backgroundColor: 'red',
  ...(bgColor && {
    backgroundColor: bgColor || 'green',
  }),
}));

const StyledTooltip = styled('div')(() => ({
  backgroundColor: '#272833',
  opacity: 0.8,
  color: '#fff',
  borderRadius: '8px',
  width: '170px',
  p: 2,
  '& .title': {
    fontSize: '8.8px',
    color: '#fff',
    lineHeight: 1.5,
    textAlign: 'center',
  },
  '& .label': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    fontSize: '12px',
  },
}));

function CustomTooltip({ active, payload, label, title, label2, label3 }) {
  if (active && payload && payload.length) {
    return (
      <StyledTooltip>
        <p className="title">{title}</p>
        {label2 && (
          <div className="label">
            <p>{`${label}`}</p> <p>{`${payload[0].value}`}</p>
          </div>
        )}
        {label3 && <p className="intro">{label}</p>}
      </StyledTooltip>
    );
  }

  return null;
}

CustomTooltip.propTypes = {
  active: PropTypes.bool.isRequired,
  payload: PropTypes.array,
  label: PropTypes.string,
  title: PropTypes.string.isRequired,
  label2: PropTypes.bool,
  label3: PropTypes.bool,
};

CustomTooltip.defaultProps = {
  payload: [],
  label: '',
  label2: false,
  label3: false,
};
