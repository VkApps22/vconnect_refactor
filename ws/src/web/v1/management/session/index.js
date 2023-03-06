import Router from '@koa/router';
import create from './create';
import revoke from './revoke';

export default new Router()
  .post('/public/session', create)
  .delete('/session', revoke);
