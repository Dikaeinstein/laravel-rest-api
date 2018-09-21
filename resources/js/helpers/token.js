/* eslint consistent-return: 0 */

/**
 * Save user object to localStorage
 *
 * @param {object} user Signed in user
 */
export const saveToken = (token) => {
  if (window.localStorage) {
    try {
      localStorage.setItem('laravelCurrentUserToken', token);
    } catch (error) {
      return undefined;
    }
  } else {
    throw Error('localStorage not available');
  }
};

/**
 * Retrieve user object from localStorage
 */
export const getToken = () => {
  if (window.localStorage) {
    try {
      const currentUserToken = localStorage.getItem('laravelCurrentUserToken');
      if (!currentUserToken) {
        return undefined;
      }
      return currentUserToken;
    } catch (error) {
      return undefined;
    }
  }
  throw Error('localStorage not available');
};
