import axios from 'axios';
import { env } from '../config';

const create = async ({
  email,
  name,
  preferredName,
  company,
  phone,
  country,
  state,
  password,
  language,
}) => {
  const response = await axios.post(`${env.HOST_ADDRESS}/v1/public/user`, {
    email,
    name,
    preferredName,
    company,
    phone,
    country,
    state,
    password,
    language,
  });
  return response.data;
};

const update = async ({
  name,
  preferredName,
  email,
  company,
  phone,
  country,
  state,
  language,
}) => {
  const response = await axios.patch(`${env.HOST_ADDRESS}/v1/user`, {
    name,
    preferredName,
    email,
    company,
    phone,
    country,
    state,
    language,
  });
  return response.data;
};

const updateLanguage = async ({ language }) => {
  const response = await axios.patch(`${env.HOST_ADDRESS}/v1/user/language`, {
    language,
  });
  return response.data;
};

const changePassword = async ({ token, password }) => {
  const response = await axios.post(
    `${env.HOST_ADDRESS}/v1/user/password`,
    {
      password,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

const purge = async () => {
  const response = await axios.delete(`${env.HOST_ADDRESS}/v1/user`);
  return response.data;
};

const fetchRecentViewed = async () => {
  const response = await axios.get(`${env.HOST_ADDRESS}/v1/user/models`);
  return response.data;
};

const fetchFavorites = async () => {
  const response = await axios.get(`${env.HOST_ADDRESS}/v1/user/favorites`);
  return response.data;
};

const addFavorite = async ({ modelId }) => {
  const response = await axios.post(`${env.HOST_ADDRESS}/v1/user/favorites`, {
    modelId,
  });
  return response.data;
};

const removeFavorite = async ({ modelId }) => {
  const response = await axios.delete(`${env.HOST_ADDRESS}/v1/user/favorites`, {
    data: {
      modelId,
    },
  });
  return response.data;
};

export default {
  create,
  update,
  updateLanguage,
  changePassword,
  purge,
  fetchRecentViewed,
  fetchFavorites,
  addFavorite,
  removeFavorite,
};
