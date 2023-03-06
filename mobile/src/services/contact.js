import axios from 'axios';
import { env } from '../config';

const fetch = async ({ language, country, state }) => {
  const response = await axios.get(`${env.HOST_ADDRESS}/v1/contacts`, {
    params: {
      language: language || '',
      country: country || '',
      state: state || '',
    },
  });
  return response.data;
};

export default {
  fetch,
};
