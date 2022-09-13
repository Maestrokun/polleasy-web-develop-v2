/* eslint-disable react/no-array-index-key */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import React, { useCallback, useState } from 'react';
import { Drawer, SearchAndFilters } from 'shared';
import useDrawer from 'hooks/useDrawer';
import { pollHistoryMock } from '../mock';
import VoterResponse from './VoterResponse';

function PollsDrawer() {
  const [setFilterValue] = useState([]);
  const [setSearch] = useState('');
  const [state, setState] = useDrawer();
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(pollHistoryMock);

  const handleOpenDrawer = useCallback(
    (id) => {
      setState({ ...state, drawerName: 'polls_popularity', id });
    },
    [state]
  );

  const renderSearch = () => {
    return (
      <Box>
        <SearchAndFilters
          grid={{ t: { xs: 7 }, f: { xs: 5 } }}
          getSearchValue={setSearch}
          showFilters
          getFilterValue={setFilterValue}
          filters={[{ label: 'Poll Type', value: [] }]}
        />
      </Box>
    );
  };

  const pollBox = (header, body, id) => {
    return (
      <Box bgcolor="rgba(244, 244, 244, 0.6)" p={3} borderRadius="4px" mb={3}>
        <Typography variant="body1" color="#0050C8" sx={{ fontWeight: 'bold' }}>
          {header}
        </Typography>
        <Typography
          sx={{ fontSize: '16px', fontWeight: 'bold', my: 3 }}
          color="textPrimary"
        >
          {body}
        </Typography>
        <Chip
          onClick={() => handleOpenDrawer(id)}
          label="Party Popularity"
          size="small"
          variant="outlined"
          sx={{
            color: '#0047BD',
            background: '#F0F5FF',
            cursor: 'pointer',
            border: '1px solid #F0F5FF',
            '&.MuiChip-root': {
              borderRadius: '4px',
            },
          }}
        />
      </Box>
    );
  };

  return (
    <div>
      <Drawer
        drawerName="polls_info_history"
        titleText="Poll History"
        isSubmitting={false}
        additionalNode={renderSearch()}
      >
        <Box p={4}>
          {data?.map((ph, inx) => {
            return (
              <React.Fragment key={inx}>
                {pollBox(ph.title, ph.label, inx)}
              </React.Fragment>
            );
          })}
        </Box>
      </Drawer>
      <VoterResponse />
    </div>
  );
}

export default PollsDrawer;
