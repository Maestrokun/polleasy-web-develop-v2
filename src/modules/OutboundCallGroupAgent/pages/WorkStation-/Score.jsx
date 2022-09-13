import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CircularProgressbar } from 'react-circular-progressbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const scoreColors = {
  0: '#DA1414',
  50: '#B98900',
  80: '#287D3C',
};

function Score({ counts }) {
  const [counter, setCounter] = useState(1);
  // const [checkCount, setCheckCount] = useState()

  function progressLevel(all, covered) {
    if (covered > 0) {
      const result = Math.round((covered / all) * 100);
      return result;
    }
    return covered;
  }

  useEffect(() => {
    // eslint-disable-next-line react/destructuring-assignment
    setCounter(progressLevel(counts?.all, counts?.covered));
  }, []);

  return (
    <Stack direction="row" alignItems="center" sx={{ mt: -4 }}>
      <div
        style={{
          width: 40,
          // height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgressbar
          // eslint-disable-next-line no-nested-ternary
          value={counter}
          // eslint-disable-next-line no-nested-ternary
          text={counter}
          styles={{
            root: {},
            path: {
              // Path color
              stroke:
                // eslint-disable-next-line no-nested-ternary
                counter <= 39
                  ? scoreColors[0]
                  : counter > 39 && counter < 80
                  ? scoreColors[50]
                  : scoreColors[80],
              strokeLinecap: 'butt',
              transition: 'stroke-dashoffset 0.5s ease 0s',
              transform: 'rotate(0.25turn)',
              transformOrigin: 'center center',
            },
            trail: {
              stroke: '4px solid red',
              strokeLinecap: 'butt',
              transform: 'rotate(0.25turn)',
              transformOrigin: 'center center',
            },
            text: {
              // Text color
              fill:
                // eslint-disable-next-line no-nested-ternary
                counter <= 39
                  ? scoreColors[0]
                  : counter > 39 && counter < 80
                  ? scoreColors[50]
                  : scoreColors[80],
              fontSize: '1.5rem',
              fontWeight: 600,
            },
            background: {
              // fill: '#3e98c7',
              fill: 'red !important',
            },
          }}
        />
      </div>
      <Stack direction="column" alignItems="flex-start" justifyContent="center">
        <Typography
          variant="title1"
          sx={{ color: '#393A4A', fontSize: '16px', ml: 3 }}
        >
          Your Progress: {counts?.covered}/{counts?.all}
        </Typography>
        <Typography
          variant="h2"
          sx={{ color: '#393A4A', fontSize: '16px', ml: 3 }}
        >
          {
            // eslint-disable-next-line no-nested-ternary
            counter === 0
              ? 'Start Now!'
              : // eslint-disable-next-line no-nested-ternary
              counter <= 39
              ? 'Brace Up!'
              : counter > 39 && counter < 80
              ? 'Keep Pushing!'
              : 'Awesome!'
          }
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Score;

Score.propTypes = {
  counts: PropTypes.number.isRequired,
};
