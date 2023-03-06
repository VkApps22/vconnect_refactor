import axios from 'axios';
import { env } from '../config';

const fetch = async ({ language, text, filter, pagination }) => {
  const response = await axios.post(`${env.HOST_ADDRESS}/v1/models`, {
    language,
    text,
    filter,
    pagination,
  });

  return response.data;
};

const fetchDetails = async ({ modelId, incognito }) => {
  const response = await axios.get(`${env.HOST_ADDRESS}/v1/model`, {
    params: {
      modelId,
      incognito,
    },
  });

  return response.data;
};

const fetchImages = async ({ modelId }) => {
  const response = await axios.get(`${env.HOST_ADDRESS}/v1/model/images`, {
    params: {
      modelId,
    },
  });

  return response.data;
};

const fetchProducts = async () => {
  const response = await axios.get(`${env.HOST_ADDRESS}/v1/models/products`);
  return response.data;
};

const fetchFilterOptions = async () => {
  const response = await axios.get(
    `${env.HOST_ADDRESS}/v1/models/filter-options`
  );
  return response.data;
};

export default {
  fetch,
  fetchDetails,
  fetchImages,
  fetchProducts,
  fetchFilterOptions,
};
