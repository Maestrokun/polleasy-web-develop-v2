import { Box, Typography, Menu } from '@mui/material';
import React, { useState } from 'react';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import DatePicker from './DatePicker';
// type IProps = {
//   date: any;
//   onChange: any;
//   showSelectedDate?: boolean;
// };
function DateRangePicker({ date, onChange, showSelectedDate }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const [date, setDate] = React.useState("");
  const onPickedDateRange = (pickedRange) => {
    const startData = new Date(pickedRange[0].startDate);
    const startYear = startData.getFullYear();
    const startMonth = `${startData.getMonth() + 1}`.padStart(2, '0');
    const startDay = `${startData.getDate()}`.padStart(2, '0');
    const startDate = `${startYear}-${startMonth}-${startDay}`;

    const endData = new Date(pickedRange[0].endDate);
    const endYear = endData.getFullYear();
    const endMonth = `${endData.getMonth() + 1}`.padStart(2, '0');
    const endDay = `${endData.getDate()}`.padStart(2, '0');
    const endDate = `${endYear}-${endMonth}-${endDay}`;

    onChange([{ created_at_before: endDate, created_at_after: startDate }]);
  };

  function renderDateFeedBackText(dateSel) {
    if (!showSelectedDate) return 'Date';
    if (dateSel[0]?.created_at_after && dateSel[0]?.created_at_before) {
      return `${format(new Date(date[0]?.created_at_after), 'MMM dd, yyyy')}
          -
          ${format(new Date(date[0]?.created_at_before), 'MMM dd, yyyy')}`;
    }
    return 'Date';
  }

  return (
    <Box position="relative">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        width="max-content"
        height="100%"
        onClick={() => setShowDatePicker(true)}
        sx={{
          background: (theme) =>
            // @ts-ignore
            theme.palette.background.blueShadeLight,
          cursor: 'pointer',
        }}
        p={2}
        borderRadius="4px"
        mr={2}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          {renderDateFeedBackText(date)}
        </Typography>
        {showDatePicker ? (
          <KeyboardArrowUp />
        ) : (
          <KeyboardArrowDown sx={{ marginLeft: 1 }} />
        )}
      </Box>
      {/* <Box maxWidth={300} position="absolute" top={0} style={{ zIndex: 100 }}> */}
      <Menu
        open={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        sx={{
          left: '30%',
          padding: '0px',
          width: '100%',
          top: -185,
        }}
      >
        <DatePicker
          setShowDatePicker={setShowDatePicker}
          onPickedDateRange={onPickedDateRange}
          onClear={onChange}
        />
      </Menu>
      {/* </Box> */}
    </Box>
  );
}

export default DateRangePicker;

DateRangePicker.propTypes = {
  date: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  showSelectedDate: PropTypes.bool.isRequired,
};

// renderDateFeedBackText.propTypes = {
//   dateSel: PropTypes.number.isRequired,
// };
