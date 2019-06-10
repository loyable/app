import settings from "../config/settings";

export default class Utils {
  //Traverse safely nested objects
  static getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce(
      (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
      nestedObj
    );
  };

  //Parse date from time dd/mm/yyyy hh:mm
  static parseDate(time) {
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
  }
}
