export const validation = (phoneNo) => {

  const phoneRegex = /^[6-9][0-9]{9}$/;

  return phoneRegex.test(phoneNo);

};