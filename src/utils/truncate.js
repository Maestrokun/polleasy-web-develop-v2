const truncate = (str, len, end) => {
  return str.length > len ? `${str.slice(0, end)}...` : str;
};

export default truncate;
