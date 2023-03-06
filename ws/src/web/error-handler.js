import { ValidationError } from 'yup';
import { ServiceError } from '../domain/error';

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ServiceError) {
      ctx.status = err.code;
      ctx.body = { messageCode: err.message };
      return;
    }

    if (err instanceof ValidationError) {
      ctx.status = 400;
      ctx.body = { errors: err.errors };
      return;
    }

    ctx.body = err.message;
    ctx.status = err.statusCode || err.status || 500;
    ctx.app.emit('error', err, ctx);
    if (ctx.status === 500) console.error(err);
  }
};
