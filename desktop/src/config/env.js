const HOST_ADDRESS =
  process.env.REACT_APP_HOST_ADDRESS || 'http://localhost:3000';

const NATIVE_REDIRECT_LINK =
  process.env.REACT_APP_NATIVE_REDIRECT_LINK || 'vconnect://authorize';

export default {
  HOST_ADDRESS,
  NATIVE_REDIRECT_LINK,
};
