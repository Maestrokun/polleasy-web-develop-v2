const renderGreetingTime = () => {
  const time = new Date().getHours();
  let greeting;
  if (time < 12) {
    // eslint-disable-next-line no-return-assign
    return (greeting = 'Good morning');
  }
  if (time > 12 && time < 17) {
    // eslint-disable-next-line no-return-assign
    return (greeting = 'Good Afternoon');
  }
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-return-assign
  return greeting || 'Good evening';
};

export default renderGreetingTime;
