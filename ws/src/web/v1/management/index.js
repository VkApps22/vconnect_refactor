import Koa from 'koa';
import analytics from './analytics';
import manual from './manual';
import model from './model';
import session from './session';
import user from './user';
import managementMiddleware from './management-middleware';

const app = new Koa();

app
  .use(managementMiddleware)
  .use(analytics.routes())
  .use(manual.routes())
  .use(model.routes())
  .use(session.routes())
  .use(user.routes());

export default app;
