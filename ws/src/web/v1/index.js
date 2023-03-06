import Koa from 'koa';
import mount from 'koa-mount';
import session from './session';
import verificationCode from './verification-code';
import user from './user';
import model from './model';
import contact from './contact';
import manual from './manual';
import management from './management';

const app = new Koa();

app
  .use(session.routes())
  .use(verificationCode.routes())
  .use(model.routes())
  .use(contact.routes())
  .use(manual.routes())
  .use(user.routes())
  .use(mount('/management', management));

export default app;
