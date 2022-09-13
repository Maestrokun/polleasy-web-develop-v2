import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const scoreColors = {
  0: '#DA1414',
  50: '#B98900',
  80: '#287D3C',
};

function Score() {
  const counter = 3;
  return (
    <Stack direction="row" alignItems="center" sx={{ mt: 4 }}>
      <div style={{ width: 70, height: 70 }}>
        <CircularProgressbar
          // eslint-disable-next-line no-nested-ternary
          value={counter === 1 ? '23' : counter === 2 ? '51' : '80'}
          // eslint-disable-next-line no-nested-ternary
          text={counter === 1 ? '23%' : counter === 2 ? '51%' : '80%'}
          styles={{
            root: {},
            path: {
              // Path color
              stroke:
                // eslint-disable-next-line no-nested-ternary
                counter === 1
                  ? scoreColors[0]
                  : counter === 2
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
                counter === 1
                  ? scoreColors[0]
                  : counter === 2
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
      <Stack
        direction="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{ paddingBottom: '.8em' }}
      >
        <Typography
          variant="title1"
          sx={{ color: '#393A4A', fontSize: '16px', ml: 3 }}
        >
          Your Performance
        </Typography>
        <Typography
          variant="h2"
          sx={{ color: '#393A4A', fontSize: '16px', ml: 3 }}
        >
          {
            // eslint-disable-next-line no-nested-ternary
            counter === 1
              ? 'Brace Up!'
              : counter === 2
              ? 'Keep Pushing!'
              : 'Awesome!'
          }
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Score;
