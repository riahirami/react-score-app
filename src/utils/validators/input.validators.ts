import { GlobalVariables } from 'config/constant';

/**
 * check is valid email
 * @param email
 * @returns
 */
export const isEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Check if a value type is a string
export const isString = (word: unknown) => {
  return typeof word === GlobalVariables.STRING || word instanceof String;
};

export const isScore = (score: string): boolean => {
  const re = /^[0-9]*$/;
  return re.test(score);
};

export const isNumber = (value: unknown): boolean => {
  return !isNaN(Number(value));
};

export const isPositiveNumber = (value: unknown): boolean => {
  return isNumber(value) && Number(value) > 0;
};
