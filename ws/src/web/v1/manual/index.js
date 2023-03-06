import Router from '@koa/router';
import fetch from './fetch';
import download from './download';
import addReview from './add-review';

export default new Router()
  .get('/manual', fetch)
  .post('/manual/review', addReview)
  .get('/public/manual-file', download);
