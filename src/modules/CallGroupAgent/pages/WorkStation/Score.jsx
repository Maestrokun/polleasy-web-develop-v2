import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import nameInitial from 'utils/nameInitial';
import Avatar from '@mui/material/Avatar';
import { stringToColor } from 'utils/avatarColor';
import { Box } from '@mui/material';

const scoreColors = {
  0: '#DA1414',
  50: '#B98900',
  80: '#287D3C',
};

function Score(counts) {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line react/destructuring-assignment
    setCounter(counts.counts);
  }, []);

  return (
    <Stack direction="row" alignItems="center" sx={{ mt: -4 }}>
      <Box sx={{ width: '60%' }} display="flex">
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
            variant="subtitle2"
            sx={{ color: '#393A4A', fontSize: '12px', ml: 3 }}
          >
            Overall Progress:
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: '#393A4A', fontSize: '12px', ml: 3 }}
          >
            12,000,000/15,000,000
          </Typography>
        </Stack>
      </Box>
      <Divider sx={{ m: 2 }} orientation="vertical" flexItem />

      <Stack>
        <Typography
          variant="subtitle2"
          sx={{
            color: '#393A4A',
            fontSize: '12px',
            ml: 3,
          }}
        >
          Call Group Agent(s){' '}
        </Typography>
        <Stack direction="row" item>
          {['Mona Kane', 'OLawale Afuye', 'o p', ' c k', 'j p'].map((name) => (
            <Avatar
              key={name}
              sx={{
                width: 30,
                height: 30,
                marginRight: '-.5rem',
                background: `${stringToColor(name)} important!`,
              }}
            >
              <Typography variant="body2">{nameInitial(name)}</Typography>
            </Avatar>
          ))}
          <Avatar
            sx={{
              width: 30,
              height: 30,
              marginRight: '-.5rem',
              ml: 5,
            }}
          >
            <Typography variant="body2">+9</Typography>
          </Avatar>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Score;
