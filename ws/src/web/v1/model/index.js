import Router from '@koa/router';
import fetch from './fetch';
import fetchDetails from './fetch-details';
import fetchImages from './fetch-images';
import fetchProducts from './fetch-products';
import fetchFilterOptions from './fetch-filter-options';

export default new Router()
  .get('/models/filter-options', fetchFilterOptions)
  .get('/models/products', fetchProducts)
  .get('/model', fetchDetails)
  .get('/model/images', fetchImages)
  .post('/models', fetch);
