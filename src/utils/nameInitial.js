const nameInitial = (str) => {
  return str
    ?.split(' ')
    .map((name) => name.charAt(0))
    .join('')
    ?.toUpperCase();
};

export default nameInitial;
