import { PhoneNumberUtil } from 'google-libphonenumber';

export const validateEmail = (email: string) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

export const validatePassword = (password: string) => {
  if (!password || password.length < 8) return false;
  return true;
}

export const validatePhone = (number: string) => {
  const phoneUtil = PhoneNumberUtil.getInstance();
  try {
    const parseNumber = phoneUtil.parseAndKeepRawInput(number, 'US');
    
    return phoneUtil.isValidNumber(parseNumber);
  } catch (err) {
    return false;
  }
}
