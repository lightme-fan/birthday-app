// Get age of a person
export const getAge = (date1, date2) => {
  // This is a condition like if statement
  date2 = date2 || new Date();
  //Calculation
  const diff = date2.getTime() - date1.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}
