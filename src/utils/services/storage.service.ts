import { GlobalVariables } from 'config/constant';

/**
 * Confirms if there is a connected user or not
 *
 * @returns {boolean}
 */
export const isLoggedIn = () => !!localStorage.getItem(GlobalVariables.TOKEN);
