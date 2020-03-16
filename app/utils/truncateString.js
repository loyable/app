// Truncate string to specified length
const truncateString = (string, length) => {
  const stringLength = string.length;

  let newString = string.substring(0, length);
  if (stringLength > length) {
    newString += "...";
  }
  return newString;
};

export default truncateString;
