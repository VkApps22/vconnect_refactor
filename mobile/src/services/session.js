import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { env } from '../config';

const fetchHasAlreadyLogged = async () => {
  return JSON.parse(await AsyncStorage.getItem('fetchHasAlreadyLogged'));
};

const setHasAlreadyLogged = async (value) => {
  return AsyncStorage.setItem('fetchHasAlreadyLogged', JSON.stringify(value));
};

const fetchSession = async () => {
  return JSON.parse(await AsyncStorage.getItem('session'));
};

const fetchHasSession = async () => {
  const session = await fetchSession();

  return session && session.token;
};

const setSession = async (value) => {
  return AsyncStorage.setItem(
    'session',
    JSON.stringify({ token: value.token })
  );
};

const create = async ({
  method,
  email,
  password,
  authorizationCode,
  redirectUri,
  data,
}) => {
  const response = await axios.post(`${env.HOST_ADDRESS}/v1/public/session`, {
    method,
    email,
    password,
    authorizationCode,
    redirectUri,
    data,
  });

  axios.defaults.headers.common = {
    Authorization: `Bearer ${response.data.token}`,
  };
  await setSession(
    response.data.email !== env.DEFAULT_USER_EMAIL ? response.data : false
  );

  await setHasAlreadyLogged(response.data.email !== env.DEFAULT_USER_EMAIL);

  return response.data;
};

const restore = async () => {
  const session = await fetchSession();
  if (!session || !session.token) throw new Error();

  axios.defaults.headers.common = {
    Authorization: `Bearer ${session.token}`,
  };
  try {
    const response = await axios.get(`${env.HOST_ADDRESS}/v1/session`);
    return response.data;
  } catch (error) {
    axios.defaults.headers.common = {};
    await setSession({});

    throw error;
  }
};

const revoke = async () => {
  await setSession({});
  await axios.delete(`${env.HOST_ADDRESS}/v1/session`);
  axios.defaults.headers.common = {};
};

export default {
  create,
  restore,
  revoke,
  fetchHasAlreadyLogged,
  fetchHasSession,
};
