import { User } from '../../../domain/entity';
import fetchMostPopularStatesService from './fetch-most-popular-states';
import fetchMostViewedProductsService from './fetch-most-viewed-products';
import fetchMostViewedFamiliesService from './fetch-most-viewed-families';
import fetchMostViewedModelsService from './fetch-most-viewed-models';

const emptyOverviewSection = { label: 'N/A', value: 0 };

const getMostPopularState = async () => {
  const popularStates = await fetchMostPopularStatesService();
  const userCount = await User.countDocuments();

  const { label: title, value } =
    popularStates && popularStates.length
      ? popularStates[0]
      : emptyOverviewSection;

  const percentage = `${
    userCount ? Math.round((value * 100) / userCount) : 0
  }%`;

  return {
    mostPopularState: {
      title,
      value: percentage,
    },
  };
};

const getMonthlyMostViewedProduct = async () => {
  const mostViewedProduct = await fetchMostViewedProductsService({
    period: 'monthly',
    date: new Date(),
  });
  const { label: title, value } =
    mostViewedProduct && mostViewedProduct.length
      ? mostViewedProduct[0]
      : emptyOverviewSection;

  return {
    monthlyMostViewedProduct: {
      title,
      value,
    },
  };
};

const getMonthlyMostViewedFamily = async () => {
  const mostViewedFamily = await fetchMostViewedFamiliesService({
    period: 'monthly',
    date: new Date(),
  });
  const { label: title, value } =
    mostViewedFamily && mostViewedFamily.length
      ? mostViewedFamily[0]
      : emptyOverviewSection;

  return {
    monthlyMostViewedFamily: {
      title,
      value,
    },
  };
};

const getMonthlyMostViewedModel = async () => {
  const mostViewedModel = await fetchMostViewedModelsService({
    period: 'monthly',
    date: new Date(),
  });
  const { label: title, value } =
    mostViewedModel && mostViewedModel.length
      ? mostViewedModel[0]
      : emptyOverviewSection;

  return {
    monthlyMostViewedModel: {
      title,
      value,
    },
  };
};

export default async () => {
  return {
    ...(await getMonthlyMostViewedProduct()),
    ...(await getMonthlyMostViewedFamily()),
    ...(await getMonthlyMostViewedModel()),
    ...(await getMostPopularState()),
  };
};
