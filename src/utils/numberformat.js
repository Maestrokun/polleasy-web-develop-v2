export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const hig = [];

export const timeDayFormat = (date = new Date()) => {
  let value;
  if (date instanceof Date) {
    const hour = date.getHours();
    if (hour === 12 && hour < 16) {
      value = 'Good Afternoon';
    } else if (hour < 12) {
      value = 'Good Morning';
    } else {
      value = 'Good Evening';
    }
  }

  return value;
};
