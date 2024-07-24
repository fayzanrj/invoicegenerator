import addZero from "./AddZero";

const getCurrentDate = () => {
  const currentDate = `${addZero(new Date().getDate())}-${addZero(
    new Date().getMonth() + 1
  )}-${new Date().getFullYear()}`;

  return currentDate;
};

export default getCurrentDate;
