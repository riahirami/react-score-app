import { GlobalVariables } from 'config/constant';
import { isString } from 'utils/validators/input.validators';

/**
 * Save a data to local storage by a key
 * @param key, @param data
 */
export const persistData = (key: string, data: unknown) => {
  const dataString: string = isString(data) ? (data as string) : JSON.stringify(data);
  localStorage.setItem(key, dataString);
};

// Extract data from local storage buy a key
export const getPersistData = (key: string, parse: boolean) => {
  return parse
    ? JSON.parse(localStorage.getItem(key) || GlobalVariables.EmptyJsonString)
    : localStorage.getItem(key);
};

// Remove data from the local storage buy a key
export const removePersistData = (key: string) => {
  localStorage.removeItem(key);
};
