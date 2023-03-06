import Router from '@koa/router';
import create from './create';
import revoke from './revoke';
import validate from './validate';

export default new Router()
  .post('/public/session', create)
  .get('/session', validate)
  .delete('/session', revoke);
