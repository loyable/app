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

  //Calculate distance between two coordinates (in km)
  static distanceBetweenTwoCoords(lat1, lon1, lat2, lon2) {
    if (lat2 !== 0 && lon2 !== 0) {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var radlon1 = (Math.PI * lon1) / 180;
      var radlon2 = (Math.PI * lon2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      dist = Math.round(dist * 10) / 10;
      dist = dist.toString().replace(".", ",");
      return `${dist} km`;
    } else {
      return;
    }
  }

  static truncateString(string, length) {
    const stringLength = string.length;

    let newString = string.substring(0, length);
    if (stringLength > length) {
      newString += "...";
    }
    return newString;
  }
}
