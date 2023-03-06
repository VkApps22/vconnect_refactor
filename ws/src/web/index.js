import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import respond from 'koa-respond';
import mount from 'koa-mount';
import logger from 'koa-logger';
import errorHandler from './error-handler';
import router from './router';

const app = new Koa();

app
  .use(errorHandler)
  .use(logger())
  .use(cors({ credentials: true }))
  .use(bodyParser({ urlencoded: { extended: true } }))
  .use(respond({ autoMessage: false }))
  .use(mount('/', router));

export default app;
