import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { AvatarGroup } from '@mui/material';

// .MuiAvatarGroup-avatar

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function BackgroundLetterAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <AvatarGroup max={5} sx={{ fontSize: '12px' }}>
        <Avatar
          {...stringAvatar('Kent Dodds')}
          sx={{
            backgroundColor: '#4F6BED !important',
            width: 30,
            height: 30,
            fontSize: '12px',
          }}
        />
        <Avatar
          {...stringAvatar('Jed Watson')}
          sx={{
            backgroundColor: '#038387 !important',
            width: 30,
            height: 30,
            fontSize: '12px',
          }}
        />
        <Avatar
          {...stringAvatar('Tim Neutkens')}
          sx={{
            backgroundColor: '#0050C8 !important',
            width: 30,
            height: 30,
            fontSize: '12px',
          }}
        />
        <Avatar
          {...stringAvatar('Tim Neutkens')}
          sx={{
            backgroundColor: '#D13438!important',
            width: 30,
            height: 30,
            fontSize: '12px',
          }}
        />
        <Avatar
          {...stringAvatar('Tim Neutkens')}
          sx={{
            backgroundColor: '#F3F2F1!important',
            width: 30,
            height: 30,
            fontSize: '12px',
          }}
        />
        <Avatar
          {...stringAvatar('Tim Neutkens')}
          sx={{
            backgroundColor: '#F3F2F1!important',
            width: 30,
            height: 30,
            fontSize: '12px',
          }}
        />
        <Avatar
          {...stringAvatar('Tim Neutkens')}
          sx={{
            backgroundColor: '#F3F2F1!important',
            width: 30,
            height: 30,
            fontSize: '12px',
          }}
        />
        <Avatar
          {...stringAvatar('Tim Neutkens')}
          sx={{
            backgroundColor: '#F3F2F1!important',
            width: 30,
            height: 30,
            fontSize: '12px',
          }}
        />
      </AvatarGroup>
    </Stack>
  );
}
