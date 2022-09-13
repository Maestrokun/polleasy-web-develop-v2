const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function getDate(date) {
  if (!date) return '';
  const month = date?.split('-');
  return `${month[2]} ${months[month[1] - 1]}, ${month[0]}`;
}

export default getDate;
