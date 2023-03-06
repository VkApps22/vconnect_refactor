import Router from '@koa/router';
import fetchMostPopularStates from './fetch-most-popular-states';
import fetchMostViewedModels from './fetch-most-viewed-models';
import fetchMostViewedProducts from './fetch-most-viewed-products';
import fetchMostViewedFamilies from './fetch-most-viewed-families';
import fetchOverview from './fetch-overview';

export default new Router()
  .get('/analytics/products', fetchMostViewedProducts)
  .get('/analytics/families', fetchMostViewedFamilies)
  .get('/analytics/models', fetchMostViewedModels)
  .get('/analytics/states', fetchMostPopularStates)
  .get('/analytics', fetchOverview);
