//Parse date from time dd/mm/yyyy hh:mm
const parseDate = time => {
  const date = new Date(time);

  function addLeadingZero(num) {
    return ("0" + num).slice(-2);
  }

  const day = addLeadingZero(date.getDay());
  const month = addLeadingZero(date.getMonth() + 1);
  const year = addLeadingZero(date.getFullYear());
  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());

  const dateString = `${day}/${month}/${year} ${hours}:${minutes}`;

  return dateString;
};

export default parseDate;
