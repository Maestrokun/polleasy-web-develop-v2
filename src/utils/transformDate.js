/* eslint-disable import/prefer-default-export */
import { differenceInCalendarDays } from 'date-fns';

export const getTimeline = (startDate, endDate) => {
  const dateRange = differenceInCalendarDays(
    new Date(endDate),
    new Date(startDate)
  );
  const startDateFromNow = differenceInCalendarDays(
    new Date(),
    new Date(startDate)
  );
  const timeline =
    startDateFromNow >= dateRange ? 100 : (startDateFromNow / dateRange) * 100;
  return timeline.toFixed(2);
};
