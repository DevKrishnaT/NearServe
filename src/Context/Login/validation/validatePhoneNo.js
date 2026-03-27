export const usePhoneValidation = (phoneNo) => {

  const phoneRegex = /^[6-9][0-9]{9}$/;

  return phoneRegex.test(phoneNo);

};