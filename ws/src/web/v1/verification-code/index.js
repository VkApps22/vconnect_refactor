import Router from '@koa/router';
import check from './check';
import send from './send';

export default new Router()
  .post('/public/verification-code', send)
  .put('/public/verification-code', check);
