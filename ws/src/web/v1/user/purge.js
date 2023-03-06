import { purgeUserService } from '../../../service/user';

export default async (ctx) => {
  const { userId } = ctx.state.user;
  await purgeUserService({ id: userId });

  return ctx.ok();
};
