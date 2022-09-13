import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import LoadingButton from '@mui/lab/LoadingButton';

function DatePicker({ setShowDatePicker, onPickedDateRange, onClear }) {
  const theme = useTheme();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const onSelectedDateRange = () => {
    onPickedDateRange(dateRange);
  };

  const onClearFilter = () => {
    onClear([{ created_at_before: '', created_at_after: '' }]);
    setShowDatePicker(false);
  };

  return (
    <Box>
      <DateRangePicker
        editableDateInputs
        dateDisplayFormat="MMM dd yyyy"
        onChange={(item) => setDateRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        color={theme.palette.primary.main}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box m={2}>
          <Button
            variant="contained"
            color="error"
            sx={{ marginRight: '24px' }}
            onClick={() => setShowDatePicker(false)}
            size="small"
          >
            Close
          </Button>
        </Box>

        <Box m={2}>
          <Button
            variant="outlined"
            sx={{ marginRight: '24px', color: '#389af0' }}
            onClick={onClearFilter}
            size="small"
          >
            Clear Filter
          </Button>
        </Box>
        <Box m={2}>
          <LoadingButton
            variant="outlined"
            sx={{ color: '#389af0' }}
            onClick={() => {
              setShowDatePicker(false);
              onSelectedDateRange();
            }}
            size="small"
          >
            Select
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
}
export default DatePicker;

DatePicker.propTypes = {
  setShowDatePicker: PropTypes.func.isRequired,
  onPickedDateRange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};
