import { User } from '../../../domain/entity';

export default async (ctx, next) => {
  if (!ctx.state.user) return next();

  const { userId } = ctx.state.user;
  const user = await User.findById(userId).lean();

  if (!user) return ctx.unauthorized();

  if (!user.accessLevel) return ctx.forbidden();

  return next();
};
