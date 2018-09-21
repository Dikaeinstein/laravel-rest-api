import { getToken } from './token';

const setAuthorizationToken = () => {
  const token = getToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};

export default setAuthorizationToken;