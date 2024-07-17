// Function to add zero to a singal digit date/month
const addZero = (num: number) => {
  return num.toString().length === 1 ? `0${num}` : num;
};

export default addZero;
