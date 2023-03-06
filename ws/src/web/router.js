import Koa from 'koa';
import koaJwt from 'koa-jwt';
import mount from 'koa-mount';
import v1 from './v1';
import { env } from '../config';
import authMiddleware from './auth-middleware';

const app = new Koa();

app.use(
  koaJwt({
    secret: env.JWT_SHARED_KEY,
    passthrough: env.NODE_ENV === 'test',
  }).unless({ path: /\/public(\/|$)/ })
);
app.use(authMiddleware);
app.use(mount('/v1', v1));

export default app;
