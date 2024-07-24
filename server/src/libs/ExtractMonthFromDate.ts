const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Extracting from DD-MM-YYYY
const extractMonthFromDate = (date: string) => {
  const splitted = date.split("-");

  if (splitted[1].length === 2 && date[1].charAt(0) === "0") {
    splitted[1] = splitted[1].charAt(1);
  }

  return `${months[Number.parseInt(splitted[1]) - 1]} - ${splitted[2]}`;
};

export default extractMonthFromDate;
