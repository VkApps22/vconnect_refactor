import { Session } from '../domain/entity';

export default async (ctx, next) => {
  if (!ctx.state.user) return next();

  const { sessionId } = ctx.state.user;
  const session = await Session.findById(sessionId).lean();

  if (!session || session.revoked || session.expiresIn <= new Date())
    return ctx.unauthorized();

  ctx.state.user.session = session;
  ctx.state.user.userId = session.userId;

  return next();
};
