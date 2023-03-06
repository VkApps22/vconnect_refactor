import axios from 'axios';
import { env } from '../config';

const fetchOverview = async () => {
  const response = await axios.get(
    `${env.HOST_ADDRESS}/v1/management/analytics`
  );

  return response.data;
};

const fetchMostViewedProducts = async ({ period, date }) => {
  const response = await axios.get(
    `${env.HOST_ADDRESS}/v1/management/analytics/products`,
    {
      params: {
        period,
        date: date.toISOString(),
      },
    }
  );

  return response.data;
};

const fetchMostViewedFamilies = async ({ product, period, date }) => {
  const response = await axios.get(
    `${env.HOST_ADDRESS}/v1/management/analytics/families`,
    {
      params: {
        product,
        period,
        date: date.toISOString(),
      },
    }
  );
  return response.data;
};

const fetchMostViewedModels = async ({ family, period, date }) => {
  const response = await axios.get(
    `${env.HOST_ADDRESS}/v1/management/analytics/models`,
    {
      params: {
        family,
        period,
        date: date.toISOString(),
      },
    }
  );

  return response.data;
};

const fetchMostPopularStates = async () => {
  const response = await axios.get(
    `${env.HOST_ADDRESS}/v1/management/analytics/states`
  );

  return response.data;
};

export default {
  fetchOverview,
  fetchMostViewedProducts,
  fetchMostViewedFamilies,
  fetchMostViewedModels,
  fetchMostPopularStates,
};
