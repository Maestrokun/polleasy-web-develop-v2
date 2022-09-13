import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import apathyIcon from 'assets/apathy.svg';

import { Card } from 'shared';

const scoreColors = {
  0: '#DA1414',
  50: '#B98900',
  80: '#287D3C',
};

function Score() {
  const [counter, setCounter] = useState(1);

  const handleScore = () => {
    setCounter((prev) => prev + 1);
    if (counter === 3) {
      setCounter(1);
    }
  };

  return (
    <Card style={{ height: '100vh' }}>
      <Stack direction="row" spacing={2}>
        <img src={apathyIcon} alt="icon" style={{ width: '30px' }} />
        <Typography>Loyalty Score</Typography>
      </Stack>
      <Stack
        onClick={handleScore}
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mt: 4 }}
      >
        <div style={{ width: 40, height: 40 }}>
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
                transform: 'rotate(-0.10turn)',
                transformOrigin: 'center center',
              },
              trail: {
                stroke: '4px solid red',
                strokeLinecap: 'butt',
                transform: 'rotate(-0.50turn)',
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

        <Typography variant="h2" sx={{ color: '#393A4A', fontSize: '16px' }}>
          {
            // eslint-disable-next-line no-nested-ternary
            counter === 1
              ? 'Not Supporting!'
              : counter === 2
              ? 'Undecided!'
              : 'Supporting!'
          }
        </Typography>
      </Stack>
    </Card>
  );
}

export default Score;
