import axios from 'axios';
import { env } from '../config';

let interceptor;

const clearInterceptor = () => {
  if (interceptor) axios.interceptors.response.eject(interceptor);
  interceptor = null;
};

const setInterceptor = () => {
  clearInterceptor();
  interceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const isUnauthorized = error.response && error.response.status === 401;
      const isForbidden = error.response && error.response.status === 403;

      if (isUnauthorized || isForbidden) {
        clearInterceptor();

        window.localStorage.setItem('session', undefined);
        window.location.href = '/';
      }

      return Promise.reject(error);
    }
  );
};

const create = async ({ email, password }) => {
  const response = await axios.post(
    `${env.HOST_ADDRESS}/v1/management/public/session`,
    {
      email,
      password,
    }
  );
  window.localStorage.setItem(
    'session',
    JSON.stringify({ token: response.data.token })
  );
  axios.defaults.headers.common = {
    Authorization: `Bearer ${response.data.token}`,
  };
  setInterceptor();
  return response.data;
};

const revoke = async () => {
  await axios.delete(`${env.HOST_ADDRESS}/v1/management/session`);
  axios.defaults.headers.common = {};
  window.localStorage.setItem('session', undefined);
};

const restore = async () => {
  const session = JSON.parse(window.localStorage.getItem('session'));
  if (!session || !session.token) throw new Error();

  axios.defaults.headers.common = {
    Authorization: `Bearer ${session.token}`,
  };
  try {
    const response = await axios.get(`${env.HOST_ADDRESS}/v1/session`);
    setInterceptor();
    return response.data;
  } catch (error) {
    axios.defaults.headers.common = {};
    window.localStorage.setItem('session', undefined);

    throw error;
  }
};

export default { create, revoke, restore };
