export const Months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
export const Days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
export const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
export const monthStartOn = (month, year) =>
  Days[new Date(year, month - 1, 1).getDay()];
export const tMonth = () => new Date().getMonth() + 1;
export const tYear = () => new Date().getFullYear();
export const msToDays = ms => (ms / 1000) / 86400